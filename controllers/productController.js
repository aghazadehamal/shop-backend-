const pool = require('../../db');

exports.getAllProducts = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM products');
    res.json(result.rows);
  } catch (err) {
    console.error("Məhsulları çəkərkən xəta:", err.message);  // Xətanı göstər
    res.status(500).json({ message: 'Server xətası' });
  }
};


exports.getProductById = async (req, res) => {
  const { id } = req.params;
  const result = await pool.query('SELECT * FROM products WHERE id = $1', [id]);

  if (result.rowCount === 0) {
    return res.status(404).json({ message: 'Product not found' });
  }

  res.json(result.rows[0]);
};

exports.createProduct = async (req, res) => {
  const { name, price, description, stock } = req.body;
  const result = await pool.query(
    'INSERT INTO products (name, price, description, stock) VALUES ($1, $2, $3, $4) RETURNING *',
    [name, price, description, stock]
  );
  res.status(201).json(result.rows[0]);
};

exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price, description, stock } = req.body;

  const result = await pool.query(
    'UPDATE products SET name=$1, price=$2, description=$3, stock=$4 WHERE id=$5 RETURNING *',
    [name, price, description, stock, id]
  );

  if (result.rowCount === 0) {
    return res.status(404).json({ message: 'Product not found' });
  }

  res.json(result.rows[0]);
};

exports.deleteProduct = async (req, res) => {
  const { id } = req.params;

  const result = await pool.query('DELETE FROM products WHERE id = $1 RETURNING *', [id]);

  if (result.rowCount === 0) {
    return res.status(404).json({ message: 'Product not found' });
  }

  res.json({ message: 'Product deleted', product: result.rows[0] });
};
