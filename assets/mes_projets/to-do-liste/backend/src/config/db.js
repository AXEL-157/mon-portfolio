const mysql = require("mysql2/promise");

async function connectDB() {
  try {
    const connection = await mysql.createConnection({
      host: "db",
      user: "todo_user",
      password: "pass",
      database: "etodo",
      port: "3306",
    });

    console.log("✅ Connecté à la base de données MySQL !");
    return connection;

  } catch (err) {
    console.error("❌ Erreur de connexion MySQL :", err.message);
    process.exit(1);
  }
}

module.exports = { connectDB };