const { Pool } = require('pg');
require('dotenv').config();

const isRender = process.env.DB_URL?.includes('render.com');

const pool = new Pool({
  connectionString: process.env.DB_URL,
  ssl: isRender
    ? {
        rejectUnauthorized: false,
      }
    : false, // lokal işləsin deyə
});

module.exports = pool;
