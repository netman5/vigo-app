require("dotenv").config();
const mysql = require("mysql");

const db_connect = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: process.env.CONNECTION_LIMIT,
});

db_connect.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Database is connected successfully...");
});

let db = {};
db.createUser = (name, email, password) => {
    db_connect.query('INSERT INTO User (name, email, password) VALUES (?,  ?, ?)', [name, email, password], (error, result) => {
      if (error) {
        return error;
      }
      return result.insertId;
    });
};


module.exports = db;
