const mysql = require('mysql');

const connection = mysql.createConnection({
  host: process.env.HOST,
  port: process.env.PORT,
  user: process.env.USER || 'root',
  password: process.env.PASSWORD || '',
  database: process.env.DATABASE || 'bookreview'
});

connection.connect((err) => {
  if (err) {
    console.error(' Error connecting to MySQL:', err.message);
  } else {
    console.log(' MySQL connection established');
  }
});

module.exports = { connection };



