const express = require("express");
const router = express.Router();
const mobilty = require("./mobility");

router.use("/mobility", mobilty); // Beckn Provider Platform

module.exports = router;
