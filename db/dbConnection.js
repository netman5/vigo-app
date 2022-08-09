import 'dotenv/config'
import mysql from 'mysql';

const db_connect
 = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db_connect
.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Database is connected successfully...');
});

export default db_connect
;
