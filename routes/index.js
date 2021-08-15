const express = require("express");
const router = express.Router();
const mobility = require("./mobility");
const delivery = require("./delivery");
const localRetail = require("./localRetail");
const auth = (req, res, next) => {
    // Authentication Verification
    // do the lookup and pass the header
    // returns the public key and url
    next();

}
// Middleware to add Auth
router.use("/mobility", auth, mobility);
router.use("/delivery", auth, delivery);
router.use("/localRetail", auth, localRetail);

module.exports = router;
