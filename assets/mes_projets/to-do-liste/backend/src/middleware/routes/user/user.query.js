const db = require('../../../config/db')

async function getALLUser() {
    const [rows] = await db.query('SELECT id, name, email, firstname, passworld FROM users');
    return rows;
     
}

async function getALLUserTodos() {
    const [rows] = await db.query('SELECT id, title, description, created_at, due_time, user_id, status, created_at FROM todo');
    return rows;

}

async function getUserById() {
    const [rows] = await db.query('SELECT id, name, email FROM users WHERE id=? or email=?', [id,email]);
    return rows;
     
}
async function UpdateUser() {
    const [rows] = await db.query('UPDATE user SET name = ?, email = ? WHERE id = ?', [name, email, id]);
    return rows;
     
}
async function deleteUser(id) {
   const [rows] = await db.query('DELETE FROM user WHERE id = ?', [id]);
    
}
module.exports = {
    getALLUser,
    getALLUserTodos,
    getUserById,
    UpdateUser,
    deleteUser
}