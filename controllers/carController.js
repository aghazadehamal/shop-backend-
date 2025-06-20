const pool = require('../db');

// Elan əlavə et (şəkil ilə)
exports.createCar = async (req, res) => {
  const { marka, model, il, yurus, price, description } = req.body; // <-- yürüş → yurus
  const userId = req.user.userId;
const image_url = req.file ? req.file.path : null; // Cloudinary URL



  try {
    const result = await pool.query(
      `INSERT INTO cars (marka, model, il, yurus, price, description, image_url, user_id)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [marka, model, il, yurus, price, description, image_url, userId]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Elan əlavə xətası:", err.message);
    res.status(500).json({ message: "Server xətası" });
  }
};

// Bütün elanları gətir
exports.getAllCars = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM cars ORDER BY created_at DESC");
    console.log("result.rows:", result.rows);
    res.json(result.rows);
  } catch (err) {
    console.error("🔥 getAllCars Error:", err);
    res.status(500).json({ message: "Elanlar yüklənmədi" });
  }
};

// Bir elanı gətir
exports.getCarById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM cars WHERE id = $1", [id]);
    if (result.rows.length === 0) return res.status(404).json({ message: "Elan tapılmadı" });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: "Xəta baş verdi" });
  }
};

// Elanı sil
exports.deleteCar = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.userId;

  try {
    const result = await pool.query("DELETE FROM cars WHERE id = $1 AND user_id = $2", [id, userId]);
    if (result.rowCount === 0) return res.status(403).json({ message: "Silməyə icazə yoxdur" });
    res.json({ message: "Elan silindi" });
  } catch (err) {
    res.status(500).json({ message: "Silinmə zamanı xəta baş verdi" });
  }
};



// Elanı yenilə
exports.updateCar = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.userId;

  const { marka, model, il, yurus, price, description } = req.body; // <-- yürüş → yurus
 const image_url = req.file ? req.file.path : req.body.image_url;



  try {
    const result = await pool.query(
      `UPDATE cars 
       SET marka = $1, model = $2, il = $3, yurus = $4, price = $5, description = $6, image_url = $7
       WHERE id = $8 AND user_id = $9 RETURNING *`,
      [marka, model, il, yurus, price, description, image_url, id, userId]
    );

    if (result.rowCount === 0)
      return res.status(403).json({ message: "Yeniləməyə icazə yoxdur" });

    res.json(result.rows[0]);
  } catch (err) {
    console.error("🔥 updateCar Error:", err);
    res.status(500).json({ message: "Yeniləmə zamanı xəta baş verdi" });
  }
};







// Yalnız istifadəçinin öz elanlarını gətir
exports.getMyCars = async (req, res) => {
  const userId = req.user.userId;

  try {
    const result = await pool.query(
      "SELECT * FROM cars WHERE user_id = $1 ORDER BY created_at DESC",
      [userId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error("🔥 getMyCars Error:", err);
    res.status(500).json({ message: "Elanlar yüklənmədi" });
  }
};



