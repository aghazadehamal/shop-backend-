const express = require("express");
const router = express.Router();
const {
  createCar,
  getAllCars,
  getCarById,
  deleteCar,
  updateCar
} = require("../controllers/carController");
const { verifyToken } = require("../middleware/authMiddleware");
const upload = require("../config/cloudinaryStorage");


/**
 * @swagger
 * tags:
 *   name: Cars
 *   description: Avtomobil elanları API-ları
 */

/**
 * @swagger
 * /api/cars:
 *   get:
 *     summary: Bütün elanları gətir
 *     tags: [Cars]
 *     responses:
 *       200:
 *         description: Elanlar uğurla gətirildi
 */

/**
 * @swagger
 * /api/cars/{id}:
 *   get:
 *     summary: ID-yə görə bir elanı gətir
 *     tags: [Cars]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Elan ID-si
 *     responses:
 *       200:
 *         description: Elan tapıldı
 *       404:
 *         description: Elan tapılmadı
 */

/**
 * @swagger
 * /api/cars:
 *   post:
 *     summary: Yeni elan yarat
 *     tags: [Cars]
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - marka
 *               - model
 *               - il
 *               - yürüş
 *               - price
 *               - description
 *               - image
 *             properties:
 *               marka:
 *                 type: string
 *               model:
 *                 type: string
 *               il:
 *                 type: string
 *               yürüş:
 *                 type: string
 *               price:
 *                 type: number
 *               description:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Elan yaradıldı
 */

/**
 * @swagger
 * /api/cars/{id}:
 *   delete:
 *     summary: Elanı sil
 *     tags: [Cars]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Elan ID-si
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Elan silindi
 *       403:
 *         description: Silməyə icazə yoxdur
 */

/**
 * @swagger
 * /api/cars/{id}:
 *   put:
 *     summary: Elanı yenilə
 *     tags: [Cars]
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Elan ID-si
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               marka:
 *                 type: string
 *               model:
 *                 type: string
 *               il:
 *                 type: string
 *               yürüş:
 *                 type: string
 *               price:
 *                 type: number
 *               description:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Elan uğurla yeniləndi
 */

router.get("/", getAllCars);
router.get("/:id", getCarById);
router.post("/", verifyToken, upload.single("image"), createCar);
router.delete("/:id", verifyToken, deleteCar);
router.put("/:id", verifyToken, upload.single("image"), updateCar);

module.exports = router;
