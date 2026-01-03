import "./Sidebar.css";
import { useValues } from "./context/ContextProvider";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import blackLogo from "./assets/blacklogo.png";
const API_URL = import.meta.env.VITE_API_URL;
const Sidebar = () => {
  const navigate = useNavigate();
  const { threadId } = useParams();
  const {
    allThreads,
    setAllThreads,
    reply,
    setNewChat,
    setPrompt,
    setReply,
    setPrevChats,
  } = useValues();

  const getAllThreads = async () => {
    try {
      const response = await fetch(`${API_URL}/api/threads`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      const filteredData = data.threads.map((thread) => ({
        threadId: thread.threadId,
        title: thread.title,
        updatedAt: thread.updatedAt,
      }));
      setAllThreads(filteredData);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getAllThreads();
  }, [threadId, reply]);

  const createNewChat = () => {
    setNewChat(true);
    setPrompt("");
    setReply(null);
    setPrevChats([]);
    navigate('/');
  };

  const changeThread = async (newThreadId) => {
    setNewChat(false);
    navigate(`/c/${newThreadId}`);
  };

  const deleteThread = async (threadtoDelete) => {
    try {
      const response = await fetch(`${API_URL}/api/thread/${threadtoDelete}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const res = await response.json();
      console.log(res);
      setAllThreads((prev) =>
        prev.filter((thread) => thread.threadId !== threadtoDelete)
      );
      if (threadId === threadtoDelete) {
        createNewChat();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="sidebar">
      <button onClick={createNewChat}>
        <img src={blackLogo} className="logo" alt="GPT logo" />
        <span>
          <i className="fa-solid fa-pen-to-square"></i>
        </span>
      </button>

      <ul className="history">
        {allThreads?.map((thread) => {
          return (
            <li
              key={thread.threadId}
              onClick={() => changeThread(thread.threadId)}
              className={thread.threadId === threadId ? "highlighted" : ""}
            >
              <span>{thread.title}</span>
              <i
                className="fa-solid fa-trash"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteThread(thread.threadId);
                }}
              ></i>
            </li>
          );
        })}
      </ul>

      <div className="sign">
        <p>By Vaishnav Komal &hearts;</p>
      </div>
    </section>
  );
};
export default Sidebar;
