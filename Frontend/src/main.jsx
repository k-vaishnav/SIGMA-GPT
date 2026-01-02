import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthContextProvider } from "./context/AuthContextProvider.jsx";
import { ContextProvider } from "./context/ContextProvider";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <ContextProvider>
        <App />
        </ContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </StrictMode>
);
