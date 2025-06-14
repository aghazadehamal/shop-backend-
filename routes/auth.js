const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController"); // controller-i əlavə et

// Qeydiyyat və giriş
router.post("/register", authController.register);
router.post("/login", authController.login);

module.exports = router;
