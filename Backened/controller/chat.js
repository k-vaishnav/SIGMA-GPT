import getOpenAIResponse from "../utils/openai.js";
import Thread from "../models/thread.js";

const getAllThreads = async (req, res) => {
  try {
    // descending order of updatedAt... most recent data on top
    const threads = await Thread.find({userId: req.user._id}).sort({ updatedAt: -1 });
    return res.status(200).json({ threads });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getSpecificThread = async (req, res) => {
  try {
    const { threadId } = req.params;
    const thread = await Thread.findOne({ threadId, userId: req.user._id });
    if (!thread) {
      return res.status(404).json({ error: "Thread not found" });
    }
    return res.status(200).json(thread.messages);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Failed to Fetch conversations." });
  }
};

const deleteThread = async (req, res) => {
  const { threadId } = req.params;
  console.info("Deleting thread:", threadId);
  try {
    const deletedThread = await Thread.findOneAndDelete({ threadId,userId: req.user._id });
    if (!deletedThread) {
      return res.status(404).json({ message: "Thread not found" });
    }

    return res.status(200).json({ message: "Thread deleted successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Failed to delete Thread" });
  }
};

const postChatToThread = async (req, res) => {
  const { threadId, message } = req.body;
  const userId = req.user._id;
  if (!threadId || !message.trim()) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    let thread = await Thread.findOne({ threadId,userId });
    let title ="";
    if(message.length > 20) {
      title = message.slice(0, 20) + "...";
    } 
    else {
     title = message;
    }
    if (!thread) {
      thread = new Thread({
        threadId,
        title: title,
        userId,
        messages: [{ role: "user", content: message }],
      });
    } else {
      thread.messages.push({ role: "user", content: message });
      thread.updatedAt = Date.now();
    }
    const assistantReply = await getOpenAIResponse(message);
    thread.messages.push({ role: "assistant", content: assistantReply });
    thread.updatedAt = Date.now();
    await thread.save();
    // return res.status(200).json({
    //   threadId: thread.threadId,
    //   messages: thread.messages,
    // });
    return res.status(200).json({ reply: assistantReply });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong!!" });
  }
};
const deleteAllThreads = async (req,res) => {
  try{
    await Thread.deleteMany({userId: req.user._id});
    return res.status(200).json({message: 'All threads deleted'});
  }
  catch(err){
    console.log(err);
    return res.status(500).json({message: 'Internal server error' });
  }
}
export { getAllThreads, getSpecificThread, deleteThread, postChatToThread,deleteAllThreads };
