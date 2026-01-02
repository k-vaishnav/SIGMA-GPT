import "./App.css";
import { AppLayout } from "./AppLayout";
import ChatWindow from "./ChatWindow";
import { ContextProvider } from "./context/ContextProvider";
import Login from "./Login";
import Register from "./Register";
import { useAuth } from "./context/AuthContextProvider";
import { Route, Routes, Navigate,useLocation } from "react-router-dom";
import Settings from "./Settings";

function App() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const background = location.state?.background;
  return (
    <div className="app">
      <Routes location={background || location}>
        
        {!isAuthenticated && (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="*" element={<Navigate to="/login" />} />
          </>
        )}
        {isAuthenticated && (
          <>
          <Route path ="/" element = {<AppLayout />} >
            <Route index element={<ChatWindow />} />
            <Route path="c/:threadId" element={<ChatWindow />} />
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
          </>
        )}
      </Routes>
      {background && (
        <Routes>
          <Route path="/settings" element={<Settings />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
