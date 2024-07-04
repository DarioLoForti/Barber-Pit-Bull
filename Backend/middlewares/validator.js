const { checkSchema, validationResult } = require("express-validator");
const deleteImage = require("../utils/deleteImage");

module.exports = (schema) => {
  return [
    checkSchema(schema || {}), // Assicura che schema non sia undefined
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        // Determine the folder based on the request URL
        let folder;
        if (req.url.includes("users")) {
          folder = "imageUrl";
        } else if (req.url.includes("admin")) {
          folder = "imageAdmin";
        } else if (req.url.includes("services")) {
          folder = "imageService";
        } else if (req.url.includes("works")) {
          folder = "imageWork";
        } else if (req.url.includes("certificates")) {
          folder = "imageCert";
        }

        // Delete the uploaded image if validation fails
        if (req.file) {
          deleteImage(folder, req.file.filename);
        }

        return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
  ];
};
