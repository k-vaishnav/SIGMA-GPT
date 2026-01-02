import { useNavigate } from "react-router-dom";
import { useValues } from "./context/ContextProvider";
import "./settings.css";
const API_URL = import.meta.env.VITE_API_URL;
const Settings = () => {
  const navigate = useNavigate();
  const { setNewChat, setPrevChats, setAllThreads } = useValues();
  const handleDelete = async () => {
    const response = await fetch(`${API_URL}/threads`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    const res = await response.json();
    console.log(res);
    setNewChat(true);
    setPrevChats([]);
    setAllThreads([]);
    navigate("/", { replace: true });
  };

  const closeModal = () => {
    navigate(-1);
  };
  return (
    <div className="settings" onClick={closeModal}>
      <div className="main" onClick={(e) => e.stopPropagation()}>
        <p>Delete All Chats</p>
        <button onClick={handleDelete}>Delete All</button>
      </div>
    </div>
  );
};
export default Settings;
