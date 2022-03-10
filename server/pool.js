const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || 5432,
  user: 'postgres' || process.env.USER,
  password: process.env.PASSWORD || 'postgres',
  database: process.env.DATABASE || 'products'
});


module.exports = pool;