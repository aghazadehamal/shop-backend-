const express = require("express");
const router = express.Router();
const {
  createOrder,
  getOrderDetails,
} = require("../controllers/orderController");

const { authenticate } = require("../middleware/authMiddleware");

router.post("/", authenticate, createOrder); // qorunur
router.get("/:id", authenticate, getOrderDetails);

module.exports = router;
