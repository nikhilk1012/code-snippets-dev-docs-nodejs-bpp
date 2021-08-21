const express = require("express");
const router = express.Router();
const { mobility } = require("../controllers/index");
const auth = (req, res, next) => {
  next();
};
router.post("/search", auth, mobility.search);
router.post("/select", auth, mobility.select);
router.post("/init", auth, mobility.init);
router.post("/confirm", auth, mobility.confirm);
router.post("/status", auth, mobility.status);
router.post("/track", auth, mobility.track);
router.post("/cancel", auth, mobility.cancel);
router.post("/update", auth, mobility.update);
router.post("/rate", auth, mobility.rate);
router.post("/support", auth, mobility.support);
router.post("/get_cancellation_reasons", auth, mobility.getCancellationReasons);
module.exports = router;
