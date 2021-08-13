const express = require("express");
const router = express.Router();
const mobilty = require("./mobility");

// Middleware to add Auth
router.use("/", mobilty); // Beckn Provider Platform

module.exports = router;
