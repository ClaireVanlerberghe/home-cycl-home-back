const mysql2 = require('mysql2/promise');

const db = mysql2.createPool({
  host: 'localhost',
  user: 'root',
  password: 'azerty',
  database: 'home_cycl_home'
});

module.exports = db;
