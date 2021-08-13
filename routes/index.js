const express = require("express");
const router = express.Router();
const mobilty = require("./mobility");
const auth = (req, res, next) => {
    // Authentication Verification
    next();
}
// Middleware to add Auth
router.use("/", auth, mobilty); // Beckn Provider Platform

module.exports = router;
