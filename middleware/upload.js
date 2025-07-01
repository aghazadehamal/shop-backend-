const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

// 🔧 BURADA limitləri ARTIR
const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // hər şəkil üçün 10MB
    files: 10                   // maksimum 10 şəkil
  }
});

module.exports = upload;
