const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || 5432,
  user: process.env.USER || 'postgres',
  password: process.env.PASSWORD || '',
  database: process.env.DATABASE || 'products'
});


module.exports = pool;