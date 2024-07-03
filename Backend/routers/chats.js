const express = require("express");
const router = express.Router();
const { getMessages, sendMessage } = require("../controllers/chatsController");

router.get("/messages/:appointmentId", getMessages);
router.post("/messages", sendMessage);

module.exports = router;
