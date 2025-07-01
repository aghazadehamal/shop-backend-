const express = require("express");
const router = express.Router();
const {
  createCar,
  getAllCars,
  getCarById,
  deleteCar,
  updateCar,
  getMyCars
} = require("../controllers/carController");

const { verifyToken } = require("../middleware/authMiddleware");
const upload = require("../middleware/upload"); 



// GET: Bütün elanlar
router.get("/", getAllCars);

// GET: İstifadəçinin elanları
router.get("/my", verifyToken, getMyCars);

// GET: ID-yə görə elan
router.get("/:id", getCarById);

// POST: Yeni elan əlavə et (çoxlu şəkil ilə)
router.post("/", verifyToken, upload.array("images", 10), createCar);

// DELETE: Elanı sil
router.delete("/:id", verifyToken, deleteCar);

// PUT: Elanı yenilə (çoxlu şəkil ilə)
router.put("/:id", verifyToken, upload.array("images", 10), updateCar);

module.exports = router;