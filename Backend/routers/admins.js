const express = require("express");
const router = express.Router();
const {
  register,
  login,
  modify,
  deleteadmin,
} = require("../controllers/adminController.js");
const validator = require("../middlewares/validator.js");
const {
  registerBody,
  loginBody,
  modifyBody,
} = require("../validations/admin.js");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: "public/imageUrl",
  filename: (req, file, cf) => {
    const fileType = path.extname(file.originalname);
    cf(null, String(Date.now()) + fileType);
  },
});
const upload = multer({ storage });

router.post(
  "/register",
  [upload.single("imageUrl"), validator(registerBody)],
  register
);

router.post("/login", validator(loginBody), login);

router.put(
  "/modify",
  [upload.single("imageUrl"), validator(modifyBody)],
  modify
);

router.delete("/delete", deleteadmin);

module.exports = router;
