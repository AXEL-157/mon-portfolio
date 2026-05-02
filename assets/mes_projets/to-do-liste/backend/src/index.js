const express = require("express");
const { connectDB } = require("./config/db.js");
const cors = require('cors')
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { router: authRoutes, init: initAuthRoutes } = require("./middleware/routes/auth/authentification.js");
const { router: userRoutes, init: initUserRoutes } = require("./middleware/routes/user/user.js");
const { router: todoRoutes, init: initTodoRoutes } = require("./middleware/routes/todos/todos.js");


const app = express();
const port = 3001;
const SECRET_KEY = "your_secret_key";  
app.use(express.json());
const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

(async () => {
  const db = await connectDB();
 
  initTodoRoutes(db);
  initUserRoutes(db);
  initAuthRoutes(db);

  app.use("/api/todos", todoRoutes);
  app.use("/api/user", userRoutes);
  app.use("/api/auth", authRoutes);



  app.listen(port, () => console.log(`🚀 Server running on port ${port}`));
})();
