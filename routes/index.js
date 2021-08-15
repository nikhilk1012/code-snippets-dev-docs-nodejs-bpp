const express = require("express");
const router = express.Router();
const bpp = require("./bpp");
const auth = (req, res, next) => {
    // Authentication Verification
    // do the lookup and pass the header
    // returns the public key and url
    next();

}
// Middleware to add Auth
router.use("/", auth, bpp); // Beckn Provider Platform

module.exports = router;
