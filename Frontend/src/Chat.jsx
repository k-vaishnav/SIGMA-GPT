import "./Chat.css";
import { useState, useEffect } from "react";
import { useValues } from "./context/ContextProvider";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
const Chat = () => {
  const { newChat, prevChats, reply } = useValues();
  const [latestReply, setLatestReply] = useState("");
  useEffect(() => {
    if (!reply) {
      setLatestReply("");
      return;
    }
    setLatestReply("");
    const content = reply.split(" "); // individual words
    let idx = 0;
    const interval = setInterval(() => {
      if (idx === content.length) {
        clearInterval(interval);
        return;
      }
      setLatestReply(content.slice(0, idx + 1).join(" "));
      idx = idx + 1;
    }, 50);
    return () => clearInterval(interval);
  }, [reply]);
  return (
    <>
      {newChat && <h1>Start a New Chat</h1>}
      <div className="chats">
        {prevChats?.slice(0, -1).map((chat, idx) => (
          <div key={idx} className={chat.role == "user" ? "userDiv" : "gptDiv"}>
            {chat.role == "user" ? (
              <p className="userMessage">{chat.content}</p>
            ) : (
              <ReactMarkdown rehypePlugins={rehypeHighlight}>
                {chat.content}
              </ReactMarkdown>
            )}
          </div>
        ))}

        {prevChats.length > 0 && (
          <>
            {latestReply === "" ? (
              <div className="gptDiv" key="non-typing">
                <ReactMarkdown rehypePlugins={rehypeHighlight}>
                  {prevChats[prevChats.length - 1].content}
                </ReactMarkdown>
              </div>
            ) : (
              <div className="gptDiv" key="typing">
                <ReactMarkdown rehypePlugins={rehypeHighlight}>
                  {latestReply}
                </ReactMarkdown>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};
export default Chat;
