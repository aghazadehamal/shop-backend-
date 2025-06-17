const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log("🔐 Gələn auth header:", authHeader); // 🧪 log əlavə etdik

  if (!authHeader) return res.status(401).json({ message: "Token tapılmadı" });

  const token = authHeader.split(" ")[1];
  console.log("🔑 Token:", token); // 🧪 tokenin özü

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.log("❌ JWT decode error:", err); // 🧪 xəta çıxarsa baxmaq üçün
      return res.status(403).json({ message: "Token etibarsızdır" });
    }

    console.log("✅ Token decode edildi:", user); // 🧪 token içindəki payload
    req.user = user;
    next();
  });
};
