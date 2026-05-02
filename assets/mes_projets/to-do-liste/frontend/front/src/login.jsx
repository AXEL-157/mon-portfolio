import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import './css/style.css';

function Login({ setIsLoggedIn }) {
  const [formData, setFormData] = useState({
      email: "",
      password: ""
      });

  const navigate = useNavigate();

  const handleChange = async (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleSubmit = async(e) => {
    e.preventDefault();

    localStorage.removeItem("token");

  const res = await fetch("http://localhost:3002/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: formData.email,
        password: formData.password,
  }),
});;

    const data = await res.json();
    alert(data.message);
    
   if (res.ok) {   
    localStorage.setItem("token", data.token); 
    setIsLoggedIn(true);
    navigate("/todolist");
}
  };

  

  return (
    <div className="wrapper">
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>

        <div className="input-box">
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />
          <i className="bx bxs-user"></i>
        </div>

        <div className="input-box">
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />
          <i className="bx bxs-lock-alt"></i>
        </div>

        <div className="remember-forgot">
          <label>
            <input type="checkbox" /> Remember me
          </label>
          <a href="#">Forgot password?</a>
        </div>

        <button type="submit" className="btn">
          Login
        </button>

        <div className="register-link">
          <p>
            Don’t have an account? <a href="/formuler">Register</a>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login;