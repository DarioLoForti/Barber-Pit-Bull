const path = require("path");
const fs = require("fs");

module.exports = (Folder, filename) => {
  try {
    const filePath = path.join(__dirname, `../public/${Folder}/` + filename);
    fs.unlinkSync(filePath);
  } catch (err) {
    console.log(`Non sono riuscito ad eliminare l'immagine ${filename}.`);
  }
};
