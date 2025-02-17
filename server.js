const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

// Statik dosyaları sun
app.use(express.static("public"));

// Ana sayfa
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// Sunucuyu başlat
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
