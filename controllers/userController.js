const pool = require('../db');

exports.getUserProfile = async (req, res) => {
  const userId = req.user.userId;

  const result = await pool.query('SELECT id, username, email FROM users WHERE id = $1', [userId]);
  res.json(result.rows[0]);
};
