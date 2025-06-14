const pool = require('../db');

// Elan əlavə et
exports.createCar = async (req, res) => {
  const { marka, model, il, yürüş, price, description, image_url } = req.body;
  const userId = req.user.userId;

  try {
    const result = await pool.query(
      `INSERT INTO cars (marka, model, il, yürüş, price, description, image_url, user_id)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [marka, model, il, yürüş, price, description, image_url, userId]
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
    console.log("DB-dən gələn nəticə:", result.rows);
    res.json(result.rows);
  } catch (err) {
    console.error("Xəta:", err.message); // bu hissəni əlavə et
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
