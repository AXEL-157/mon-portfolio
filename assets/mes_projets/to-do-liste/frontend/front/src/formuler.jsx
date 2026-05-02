import React from "react";
import './css/style1.css';
import { useState } from "react";
import { useNavigate } from "react-router-dom";


function RegisterForm() {
  const [formData, setFormData] = useState({
    firstname: "",
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    const res = await fetch("http://localhost:3002/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstname: formData.firstname,
        name: formData.name, 
        email: formData.email,
        password: formData.password,
  }),
});;

    const data = await res.json();
    alert(data.message);

    if (res.ok) { 
    navigate("/login");
  }};

  return (
    <form onSubmit={handleSubmit}>
      <input name="firstname" placeholder="First Name" onChange={handleChange} />
      <input name="name" placeholder="Name" onChange={handleChange} />
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input name="password" placeholder="Password" type="password" onChange={handleChange} />
      <button type="submit">Submit</button>
    </form>
  );
}

export default RegisterForm;
