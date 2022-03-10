const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  user: 'tristenu',
  password: 'sdcstee1ix',
  database: 'products'
});


module.exports = pool;