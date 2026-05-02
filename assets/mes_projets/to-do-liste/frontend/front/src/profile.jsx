import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
function Profile() {
  const navigate = useNavigate();
  
  const [user, setUser] = useState(null);
 
  const handleDelete = () => {
    const confirmDelete = window.confirm("Do you really want to delete your account ?");
    if (!confirmDelete) return;
 
 
    setUser(null);
    alert("Account Deleted");
    navigate("/");
  };
 
  
 
  return (
    <div>
      <h1>Profile</h1>
      <p>Name : {user.name}</p>
      <p>Email : {user.email}</p>
 
      <button onClick={handleDelete} style={{ backgroundColor: "red", color: "white" }}>
        Delete the account
      </button>
    </div>
  );
}
 
export default Profile;