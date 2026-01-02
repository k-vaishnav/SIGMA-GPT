import "./ChatWindow.css";
import Chat from "./Chat";
import { useState, useEffect } from "react";
import { useValues } from "./context/ContextProvider";
import axios from "axios";
import { ScaleLoader } from "react-spinners";
import { useAuth } from "./context/AuthContextProvider";
import { useParams,useNavigate,useLocation } from "react-router-dom";
import { v1 as uuidv1 } from "uuid";
const API_URL = import.meta.env.VITE_API_URL;

const ChatWindow = () => {
  let { threadId: currThreadId } = useParams();
  const {
    prompt,
    setPrompt,
    reply,
    setReply,
    prevChats,
    setPrevChats,
    newChat,
    setNewChat,
  } = useValues();
  const { isAuthenticated, logout } = useAuth();
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!currThreadId) {
      setNewChat(true);
      setPrevChats([]);
      return
    }

    const fetchThread = async (threadId) => {
      try {
        const response = await fetch(`${API_URL}/thread/${threadId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const res = await response.json();
        console.log(res);
        setPrevChats(res);
        setReply(null);
        setNewChat(false);
      } catch (err) {}
    };
    fetchThread(currThreadId);
  }, [currThreadId]);

  const getReply = async () => {
    if (!prompt) return;
    setLoading(true);
    const threadId = newChat ? uuidv1() : currThreadId;
    const body = {
      message: prompt,
      threadId
    };
    try {
      const { data } = await axios.post(`${API_URL}/chat`, body, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setReply(data.reply);
      setNewChat(false);
      if(newChat){
        navigate(`/c/${threadId}`);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Append new chat to previous chats
  useEffect(() => {
    if (prompt && reply) {
      setPrevChats(prev =>[
        ...prev,
        { role: "user", content: prompt },
        { role: "assistant", content: reply },
      ]);
    }
    setPrompt("");
    setNewChat(false);
  }, [reply]);

  const handleSettings = () => {
    setIsOpen(false);
    navigate("/settings",{
      state:{background:location}
    });
  };

  return (
    <div className="chatWindow">
      <div className="navbar">
        <span>
          SigmaGPT <i className="fa-solid fa-chevron-down"></i>
        </span>
        <div className="userIcondiv" onClick={() => setIsOpen(!isOpen)}>
          <span className="userIcon">
            <i className="fa-solid fa-user"></i>
          </span>
        </div>
      </div>
      {isOpen && (
        <div className="dropdown">
          <div className="dropdownItem" onClick = {handleSettings}>
            <i className="fa-solid fa-gear" ></i>settings
          </div>
          <div className="dropdownItem">
            <i className="fa-solid fa-cloud-arrow-up"></i>Upgrade Plan
          </div>
          {isAuthenticated ? (
            <div className="dropdownItem" onClick={logout}>
              <i className="fa-solid fa-arrow-right-from-bracket"></i>logout
            </div>
          ) : (
            <div className="dropdownItem">
              <i className="fa-solid fa-arrow-right-from-bracket"></i>logout
            </div>
          )}
        </div>
      )}
      <Chat />
      <ScaleLoader color="#fff" loading={loading} size={10} />
      <div className="chatInput">
        <div className="inputBox">
          <input
            placeholder="Ask anything"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => {
              e.key == "Enter" ? getReply() : "";
            }}
          />
          <div id="submit" onClick={getReply}>
            <i className="fa-solid fa-paper-plane"></i>
          </div>
        </div>
        <p className="info">
          SigmaGPT can make mistakes.Check important info. See cookie
          preferences.
        </p>
      </div>
    </div>
  );
};
export default ChatWindow;
