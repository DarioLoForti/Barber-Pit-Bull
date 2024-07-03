const express = require("express");
const router = express.Router();
const {
  store,
  index,
  show,
  update,
  destroy,
} = require("../controllers/servicesController");
const validator = require("../middlewares/validator");
const { paramID } = require("../validations/id");
const { bodyData } = require("../validations/services");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: "public/imageService",
  filename: (req, file, cb) => {
    const fileType = path.extname(file.originalname);
    cb(null, String(Date.now()) + fileType);
  },
});

const upload = multer({ storage });

router.post("/", [upload.single("imageService"), validator(bodyData)], store);

router.get("/", index);

router.use("/:id", validator(paramID));

router.get("/:id", show);

router.put(
  "/:id",
  [upload.single("imageService"), validator(bodyData)],
  update
);

router.delete("/:id", destroy);

module.exports = router;
