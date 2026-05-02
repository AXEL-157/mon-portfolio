import React, {useState} from "react";
import "./css/style2.css";

function App() {
  const [tasks, setTasks] = useState([]);  
  const[Popup, modifyPopup] = useState(false);
  const [formData, setFormData] = useState({
      title: "",
      description: "",
      due_time:"",
      status: "todo"
    });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    
    const res = await fetch("http://localhost:3002/api/todos/newtodo", {
      method: "POST",
      headers: { "Content-Type": "application/json" ,
        "Authorization": `Bearer ${token}`},
        body: JSON.stringify({
        title: formData.title,
        description: formData.description, 
        due_time: formData.due_time,
        status: "todo"
  }),
});;
    const data = await res.json();
    if (res.status === 401 || res.status === 403) {
    alert(data.error); 
    localStorage.removeItem("token"); 
    window.location.href = "/login";
  } else {
    setTasks(data);
    alert("Task Created");
}
}

  return (
    <>
    <div className="corps">
      <div id="myDIV" className="header">
        <h2 className="title">My To Do List</h2>
        <button id="myInput" onClick={() => modifyPopup(true)}>Create A Task</button>
        <button className="logoutBtn" onClick={() => window.location.href = "/"}>Logout</button>
        <button className="logoutBtn" onClick={() => window.location.href = "/profile"}>Profile</button>

      </div>

      <div id="myUL" className="liste">
        {
        Popup &&
        <div>
          <form onSubmit={handleSubmit}>
            <h2>Your New Task</h2>
            <button onClick={() => modifyPopup(false)}>Cancel</button>
            <input name="title" placeholder="Task Title" onChange={handleChange} />
            <textarea name="description" placeholder="Your Description" onChange={handleChange} />
            <input type="date" name="due_time" onChange={handleChange} />
            <button type="submit">Submit</button>
          </form>
        </div>
        }
      </div>
    </div>
    </>
  );
}

export default App;
