const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const authenticate = require('../../middleware/authenticate'); // Token yoxlayan middleware

router.post('/orders', authenticate, orderController.createOrder);

module.exports = router;
