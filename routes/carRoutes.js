const express = require("express");
const router = express.Router();
const {
  createCar,
  getAllCars,
  getCarById,
  deleteCar
} = require("../controllers/carController");
const { verifyToken } = require("../server/middleware/authMiddleware");

router.get("/", getAllCars);
router.get("/:id", getCarById);
router.post("/", verifyToken, createCar);
router.delete("/:id", verifyToken, deleteCar);

module.exports = router;
