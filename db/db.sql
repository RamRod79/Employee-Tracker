const mysql = require('mysql2');

const db = mysql.createConnection({
  host: "localhost",
  port: 3199,
  user: "root",
  password: "",
  database: "employeeTracker_db",
},
console.log ("connected to database")
);

module.exports = db;