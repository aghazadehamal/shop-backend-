const pool = require('../db');

exports.createOrder = async (req, res) => {
  const { items, total_amount } = req.body;
  const userId = req.user.userId;

  const orderResult = await pool.query(
    'INSERT INTO orders (user_id, total_amount) VALUES ($1, $2) RETURNING *',
    [userId, total_amount]
  );

  const orderId = orderResult.rows[0].id;

  for (const item of items) {
    await pool.query(
      'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ($1, $2, $3, $4)',
      [orderId, item.product_id, item.quantity, item.price]
    );
  }

  res.status(201).json({ message: 'Order created', order_id: orderId });
};

exports.getOrderDetails = async (req, res) => {
  const { id } = req.params;

  const orderResult = await pool.query('SELECT * FROM orders WHERE id = $1', [id]);
  const itemsResult = await pool.query(
    'SELECT * FROM order_items WHERE order_id = $1',
    [id]
  );

  if (orderResult.rowCount === 0) {
    return res.status(404).json({ message: 'Order not found' });
  }

  res.json({
    ...orderResult.rows[0],
    items: itemsResult.rows
  });
};
