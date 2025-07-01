const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const path = require("path");
const setupSwagger = require("./swagger");

app.use(cors({ origin: "*" }));

// BUNLAR ƏLAVƏ OLUNDU 👇
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));



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
