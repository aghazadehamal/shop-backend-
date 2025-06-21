const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log("🔐 Gələn auth header:", authHeader); 

  if (!authHeader) return res.status(401).json({ message: "Token tapılmadı" });

  const token = authHeader.split(" ")[1];
  console.log("🔑 Token:", token);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.log("❌ JWT decode error:", err); 
      return res.status(403).json({ message: "Token etibarsızdır" });
    }

    console.log("✅ Token decode edildi:", user); 
    req.user = user;
    next();
  });
};
