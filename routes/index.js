const express = require("express");
const router = express.Router();
const bpp = require("./bpp");

router.use("/bpp", bpp); // Beckn Provider Platform

module.exports = router;
