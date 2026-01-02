import { useState } from "react";
import { useAuth } from "./context/AuthContextProvider";
import { loginUser } from "./services/authApi";
import { Link } from "react-router-dom";
import "./login.css";

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const data = await loginUser(email, password);
      console.log(data);
      if (!data.token) {
        setError(data.message || "Login failed");
        return;
      }
      login(data.token, data.user);
    } catch (err) {
      setError(err.message);
    }
  };
  return (
    <div className="outer-box">
      <h2>Login to Sigma GPT</h2>
      <form onSubmit={handleSubmit} className="credentials-form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <span>
          Don't have an account?
          <Link
            to="/register"
            style={{
              marginLeft: "10px",
              textDecoration: "none",
              fontSize: "20px",
              cursor: "pointer",
            }}
          >
            Sign up
          </Link>
        </span>

        <button type="submit">Login</button>
      </form>
    </div>
  );
}
