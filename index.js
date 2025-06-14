const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");

// CORS konfiqurasiya (əgər frontend Render-dədirsə, linki dəyiş)
app.use(cors({
  origin: "http://localhost:3000", // və ya Render frontend linkin
  credentials: true
}));

app.use(express.json()); // JSON body parse üçün vacibdir

// 🔁 Route-lar
app.use("/api/auth", require("./routes/auth"));      // Login/Register üçün
app.use("/api/cars", require("./routes/carRoutes")); // Yeni - avtomobil elanları
app.use("/api/orders", require("./routes/orderRoutes")); // əgər sifariş sistemini saxlayırsansa

// 🌐 Test endpoint
app.get("/", (req, res) => {
  res.send("Avtomobil Elanları Backend");
});

// 🔥 Server start
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
