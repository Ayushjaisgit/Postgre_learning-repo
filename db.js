const Pool = require('pg').Pool

const pool = new Pool({
  user:"postgres",  
  localhost:"localhost",
  database:'students',
  password:"Khan@1705",
  port:5433,
});

module.exports = pool