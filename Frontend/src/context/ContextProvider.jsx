import { useContext } from "react";
import { myContext } from "./MyContext";
import { useState } from "react";
import { v1 as uuidv1 } from "uuid";

export const ContextProvider = ({ children }) => {
  const [prompt, setPrompt] = useState("");
  const [reply, setReply] = useState(null);
  const [currThreadId, setCurrThreadId] = useState(uuidv1());
  const [prevChats, setPrevChats] = useState([]); // store all previous chats of curr thread
  const [newChat, setNewChat] = useState(true);
  const [allThreads, setAllThreads] = useState([]);
  return (
    <myContext.Provider
      value={{
        prompt,
        setPrompt,
        reply,
        setReply,
        currThreadId,
        setCurrThreadId,
        newChat,
        setNewChat,
        prevChats,
        setPrevChats,
        allThreads,
        setAllThreads
      }}
    >
      {children}
    </myContext.Provider>
  );
};

export const useValues = () => useContext(myContext);
