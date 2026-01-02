import { useState, useEffect } from "react";
import { useAuth } from "./context/AuthContextProvider";
import { registerUser } from "./services/authApi";
import { Link,useNavigate } from "react-router-dom";
import "./login.css";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await registerUser(form.name, form.email, form.password);
    console.log(data);
    login(data.token, data.user);
    if(localStorage.getItem("token")){
      
    }
    setMessage(data.message);
  };
  return (
    <div className="outer-box">
      {message && <p className="message">{message}</p>}
      <h2>Create Sigma GPT Account</h2>
      <form onSubmit={handleSubmit} className="credentials-form">
        <input
          placeholder="Name"
          name="name"
          value={form.name}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          value={form.password}
          placeholder="Password"
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          value={form.email}
          placeholder="Email"
          onChange={handleChange}
        />
        <span>
          Already have an account?
          <Link
            to="/login"
            style={{ cursor: "pointer", textDecoration: "none" }}
          >
            Login
          </Link>
        </span>
        <button type="submit">Register</button>
        
      </form>
    </div>
  );
}
