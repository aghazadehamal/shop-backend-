const express = require("express");
const router = express.Router();
const {
  createCar,
  getAllCars,
  getCarById,
  deleteCar,
  updateCar // ⬅️ bunu əlavə et
} = require("../controllers/carController");
const { verifyToken } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware"); // ✅ multer middleware əlavə olundu

router.get("/", getAllCars);
router.get("/:id", getCarById);

// ✅ upload.single('image') — şəkil yükləmək üçün əlavə olundu
router.post("/", verifyToken, upload.single('image'), createCar);
router.delete("/:id", verifyToken, deleteCar);
router.put("/:id", verifyToken, upload.single('image'), updateCar);

module.exports = router;
