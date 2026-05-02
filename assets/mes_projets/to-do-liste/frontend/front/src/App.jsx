import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./login.jsx";
import Formuler from "./formuler.jsx";
import TodoList from "./todolist.jsx";
import Profile from "./profile.jsx";

 
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setIsLoggedIn(true);
  }, []);
 
 
  return (
    <Router>
      <Routes>
         <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
 
          <Route path="/formuler" element={<Formuler setIsLoggedIn={setIsLoggedIn} />} />
 
         <Route
          path="/todolist"
          element={isLoggedIn ? <TodoList /> : <Navigate to="/login" />}
        />
        <Route path="/profile" element={<Profile />} />
 
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}
 
export default App;

 
