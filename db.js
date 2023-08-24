const Pool = require('pg').Pool

const pool = new Pool({
  user:"postgres",  
  localhost:"localhost",
  database:'Uber_DB',
  password:"Khan@1705",
  port:5433,
});

module.exports = pool