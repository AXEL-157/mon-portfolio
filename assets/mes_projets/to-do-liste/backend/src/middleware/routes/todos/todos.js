const express = require("express");
const authenticateToken = require("../auth/token");
const {
  getAllTodos,
  getTodo,
  createTodo,
  updateTodo,
  deleteTodo,
} = require("./todos.query");

const router = express.Router();

let db;
function init(database) {
  db = database;
}

router.get("/alltodos", authenticateToken, async (req, res) => {
  try {
    const todos = await getAllTodos(db, req.user.userId);
    res.json(todos);
  } catch (err) {
    console.error("Couldn't get tasks:", err);
    res.status(500).send("Error");
  }
});

router.get("/todo", authenticateToken, async (req, res) => {
    try {
        const todos = await getTodo (db, req.params.id, req.user.userId);
        if (!todos) return res.status(404).send("Task not found");
        res.json(todos);
  } catch (err) {
    console.error("Error fetching task:", err);
    res.status(500).send("Error fetching task");
  }
});

router.post("/newtodo", authenticateToken, async (req, res) => {
  try {
    const { title, description, due_time, status } = req.body;
    if (!title || !description || !due_time) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const id = await createTodo(
      db,
      req.user.userId,
      title,
      description,
      due_time,
      status || "todo"
    );
    res.status(201).json({ message: "Task created", id });
  } catch (err) {
    console.error("Error creating task:", err);
    res.status(500).json({ error: "Error creating task" });
  }
});

router.put("/updatetodo", authenticateToken, async (req, res) => {
  try {
    const { title, not_started } = req.body;
    await updateTodo(db, req.params.id, title, not_started, req.user.userId);
    res.json({ message: "Task updated" });
  } catch (err) {
    console.error("Error updating task:", err);
    res.status(500).send("Error updating task");
  }
});

router.delete("/deltodo", authenticateToken, async (req, res) => {
  try {
    await deleteTodo(db, req.params.id, req.user.userId);
    res.json({ message: "Task deleted" });
  } catch (err) {
    console.error("Error deleting task:", err);
    res.status(500).send("Error deleting task");
  }
});

module.exports = { router, init };

    

