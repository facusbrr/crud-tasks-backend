const mysql = require('mysql2/promise');

const connectDB = async () => {
  return await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'tasks_db',
  });
};

module.exports = {
  connectDB,
};
