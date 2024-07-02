const express = require("express");
const router = express.Router();
const {
  store,
  index,
  show,
  destroy,
} = require("../controllers/reviewsController.js");
const validator = require("../middlewares/validator.js");
const { paramID } = require("../validations/id.js");
const { bodyData } = require("../validations/reviews.js");
const authenticateToken = require("../middlewares/auth.js");

router.get("/", index);

router.use("/:id", validator(paramID));

router.get("/:id", show);

router.use(authenticateToken);

router.post("/", validator(bodyData), store);

router.delete("/:id", destroy);

module.exports = router;
