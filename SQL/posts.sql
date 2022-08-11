-- create table for posts with image and text using mysql with a creator id and a post id
CREATE TABLE posts (
  id int NOT NULL AUTO_INCREMENT,
  user_id int NOT NULL,
  image_url varchar(255) NOT NULL,
  text varchar(255) NOT NULL,
  date datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES users(id)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
