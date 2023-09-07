const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',     
  user: 'root',          
  password: 'password',  
  database: 'mydb' 
});

db.connect((error) => {
  if (error) {
    console.error('Error connecting to MySQL database:', error);
  } else {
    console.log('Connected to MySQL database');
  }
});

export default db;
