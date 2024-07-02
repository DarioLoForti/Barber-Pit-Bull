const express = require("express");
const router = express.Router();
const {
  create,
  index,
  show,
  update,
  destroy,
} = require("../controllers/appointmentsController.js");

const validator = require("../middlewares/validator.js");
const { paramID } = require("../validations/id.js");
const bodyData = require("../validations/appointments.js");
const dateParser = require("../middlewares/dateParser.js");
const authenticateToken = require("../middlewares/auth.js");
router.use(authenticateToken);

router.get("/", index);

router.use("/:id", validator(paramID));

router.get("/:id", show);

router.post("/", dateParser, validator(bodyData), create);

router.put("/:id", dateParser, validator(bodyData), update);

router.delete("/:id", destroy);

module.exports = router;
