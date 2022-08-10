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
  return new Promise((resolve, reject) => {
    db_connect.query('INSERT INTO users (name, email, password) VALUES (?,  ?, ?)', [name, email, password], (error, result) => {
      if (error) {
        return reject(error);
      }
      return resolve(result.insertId);
    });
  });
};

db.getUserByEmail = (email) => {
    return new Promise((resolve, reject) => {
      db_connect.query('SELECT * FROM users WHERE email = ?', [email], (error, result) => {
        if (error) {
          return reject(error);
        }
        return resolve(result[0]);
      });
    }
  );
}

db.getVerifiedUser = (id) => {
  return new Promise((resolve, reject) => {
    db_connect.query('SELECT * FROM users WHERE id = ? ', [id], (error, result) => {
      if (error) {
        return reject(error);
      }
      return resolve(result[0]);
    }
  );
}
  );
}

module.exports = db;
