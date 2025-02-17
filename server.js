const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Statik dosyaları sun
app.use(express.static(__dirname));

// Ana sayfa yönlendirmesi
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "Anasayfa", "main.html"));
});

// Sunucuyu başlat
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
