const express = require('express');
const router = express.Router();
const userQueries = require('./user.query');
const authenticateToken = require("../auth/token");

let db;
function init(database) {
  db = database;
}

router.get("/user", authenticateToken, async (req, res) => {
    try {
        const users = await userQueries.getALLUser();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: 'Erreur serveur' });
    }
});

router.get("/user/todos", authenticateToken, async(req, res) => {
    try {
        const todos = await userQueries.getALLUserTodos();
        res.json(todos);
    } catch (err) {
        res.status(500).json({ message: 'Erreur serveur' });
    }
});


router.get("/user/:id?", authenticateToken, async(req, res) => {
    let identifier = req.params.id || req.query.email;
    if (!identifier) {
        return res.status(400).json({ message: "Veuillez fournir un ID ou un email" });
    }
    try {
        const user = await userQueries.getUser(identifier);
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: 'Erreur serveur' });
    }
});

router.put("/user", authenticateToken, async (req, res) => {
    try {
        const users = await userQueries.UpdateUser(req.params.id, req.body);
        res.json({ message: 'Utilisateur mis à jour' });
    } catch (err) {
        console.error("Erreur lors de la mise à jour de l'utilisateur :", err);
        res.status(500).json({ message: 'Erreur serveur' });
    }
});

router.delete("/user/:id", authenticateToken, async (req, res) => {
    try {
        const users = await userQueries.deleteUser(req.params.id);
        res.json({ message: 'Utilisateur supprimé' });
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: 'Erreur serveur' });
    }
});

module.exports = { router, init };