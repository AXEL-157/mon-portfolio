const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();
const SECRET_KEY = process.env.SECRET_KEY || "YourJwTSecretKeyHere";

let db;
function init(database) {
  db = database;
}

router.post("/login", async (req, res) => {

  const { email, password } = req.body;

  try {
    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    const user = rows[0];

     if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid email or password" });
     }


    const token = jwt.sign(
      { userId: user.id, email: user.email },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    return res.status(200).json({ 
    token, 
    message: `Welcome, ${user.name}!`
    });

  } catch (err) {
    console.error("Erreur SQL :", err);
    res.status(500).json({ message: "Server Error" });
  }

  });

router.post("/register", async (req, res) => {
    const { email, password, name, firstname } = req.body;
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const [result] = await db.query(
        "INSERT INTO users (email, password, name, firstname) VALUES (?, ?, ?, ?)",
        [email, hashedPassword, name, firstname]
      );
      res.status(201).json({ message: "Account created !", userId: result.insertId});
    } catch (err) {
      console.error("Erreur SQL :", err);
      res.status(500).json({ message: "Server Error" });
    }
  });

  module.exports = { router, init };
