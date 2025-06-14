const { Pool } = require('pg');
require('dotenv').config();

const isProduction = process.env.NODE_ENV === 'production';

const pool = new Pool({
  connectionString: isProduction ? process.env.DATABASE_URL : process.env.DB_URL,
  ...(isProduction && {
    ssl: {
      rejectUnauthorized: false
    }
  })
});

module.exports = pool;
