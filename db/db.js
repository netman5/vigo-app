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
    db_connect.query(
      "INSERT INTO users (name, email, password) VALUES (?,  ?, ?)",
      [name, email, password],
      (error, result) => {
        if (error) {
          return reject(error);
        }
        return resolve(result.insertId);
      }
    );
  });
};

db.getUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    db_connect.query(
      "SELECT * FROM users WHERE email = ?",
      [email],
      (error, result) => {
        if (error) {
          return reject(error);
        }
        return resolve(result[0]);
      }
    );
  });
};

// get all users
db.getAllUsers = () => {
  return new Promise((resolve, reject) => {
    db_connect.query(
      "SELECT * FROM users", (error, result) => {
        if (error) {
          return reject(error);
        }
        return resolve(result);
      }
    );
  }
  );
}

// get a single user by id
db.getUserById = (id) => {
  return new Promise((resolve, reject) => {
    db_connect.query(
      "SELECT * FROM users WHERE id = ?",
      [id],
      (error, result) => {
        if (error) {
          return reject(error);
        }
        return resolve(result[0]);
      }
    );
  });
}

db.getVerifiedUser = (id) => {
  return new Promise((resolve, reject) => {
    db_connect.query(
      "SELECT * FROM users WHERE id = ? ",
      [id],
      (error, result) => {
        if (error) {
          return reject(error);
        }
        return resolve(result[0]);
      }
    );
  });
};

// follow a user
db.followUser = (user_id, following_id) => {
  return new Promise((resolve, reject) => {
    db_connect.query(
      "INSERT INTO followers (user_id, following_id) VALUES (?, ?)", [user_id, following_id], (error, result) => {
        if (error) {
          return reject(error);
        }
        return resolve(result.insertId);
      }
    );
  }
  );
}

// get all followers of a user
db.getFollowers = (user_id) => {
  return new Promise((resolve, reject) => {
    db_connect.query(
      "SELECT * FROM followers WHERE user_id = ?", [user_id], (error, result) => {
        if (error) {
          return reject(error);
        }
        return resolve(result);
      }
    );
  }
  );
}

// unfollow a user
db.unfollowUser = (user_id, following_id) => {
  return new Promise((resolve, reject) => {
    db_connect.query(
      "DELETE FROM followers WHERE user_id = ? AND following_id = ?", [user_id, following_id], (error, result) => {
        if (error) {
          return reject(error);
        }
        return resolve(result.affectedRows);
      }
    );
  }
  );
}

// get all posts of a user
db.getPostsByUserId = (id) => {
  return new Promise((resolve, reject) => {
    db_connect.query(
      "SELECT * FROM posts WHERE user_id = ?", [id], (error, result) => {
        if (error) {
          return reject(error);
        }
        return resolve(result);
      }
    );
  }
  );
}

db.createPostWithImage = (user_id, content, image) => {
  return new Promise((resolve, reject) => {
    db_connect.query(
      "INSERT INTO posts (user_id, text, image_url) VALUES (?, ?, ?)", [user_id, content, image], (error, result) => {
        if (error) {
          console.log(error)
          return reject(error);
        }
        return resolve(result.insertId);
      }
    );
  }
  );
}

db.getPosts = () => {
  return new Promise((resolve, reject) => {
    db_connect.query(
      "SELECT * FROM posts", (error, result) => {
        if (error) {
          return reject(error);
        }
        return resolve(result);
      }
    );
  }
  );
}

// get a post by id
db.getPostById = (id) => {
  return new Promise((resolve, reject) => {
    db_connect.query( "SELECT * FROM posts WHERE id = ?", [id], (error, result) => {
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
