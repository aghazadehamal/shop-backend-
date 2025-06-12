const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");

app.use(express.json());
app.use(cors()); // bütün domain-lərə icazə verir


// Route-ları qoş
app.use("/api/auth", require("./routes/auth"));
app.use("/api/products", require("./routes/products"));
app.use("/api/orders", require("./routes/orders"));

// Server başlasın
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
