const pool = require('../db'); 

exports.createOrder = async (req, res) => {
  const { items, total_amount } = req.body;
  const userId = req.user.userId; 

  try {
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

    res.status(201).json({ message: 'Sifariş yaradıldı', order_id: orderId });
  } catch (err) {
    console.error('Sifariş xətası:', err.message);
    res.status(500).json({ message: 'Server xətası' });
  }
};
