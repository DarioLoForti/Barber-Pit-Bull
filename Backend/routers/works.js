const express = require("express");
const router = express.Router();
const { paramID } = require("../validations/id");
const { bodyData } = require("../validations/works");
const validator = require("../middlewares/validator");
const {
  store,
  index,
  show,
  update,
  destroy,
} = require("../controllers/worksController");

const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: "public/imageWork",
  filename: (req, file, cf) => {
    const fileType = path.extname(file.originalname);
    cf(null, String(Date.now()) + fileType);
  },
});

const upload = multer({ storage });

router.get("/", index);

router.post("/", [upload.single("imageWork"), validator(bodyData)], store);

router.use("/:id", validator(paramID));

router.get("/:id", show);

router.put("/:id", [upload.single("imageWork"), validator(bodyData)], update);

router.delete("/:id", destroy);

module.exports = router;
