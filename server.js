const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const path = require("path");
const setupSwagger = require("./swagger"); // ✅ Əlavə et

app.use(cors({
  origin: "*"
}));

app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Swagger setup (MÜTLƏQ route-lardan ƏVVƏL yerləşdir)
setupSwagger(app);

app.use("/api/auth", require("./routes/auth"));
app.use("/api/cars", require("./routes/carRoutes"));

app.get("/", (req, res) => {
  res.send("Avtomobil Elanları Backend");
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
