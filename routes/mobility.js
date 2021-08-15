const express = require("express");
const router = express.Router();
const { mobility } = require('../controllers/index');

router.post('/search', mobility.search);
router.post('/select', mobility.select);
router.post('/init', mobility.init);
router.post('/confirm', mobility.confirm);
router.post('/status', mobility.status);
router.post('/track', mobility.track);
router.post('/cancel', mobility.cancel);
router.post('/update', mobility.update);
router.post('/rate', mobility.rate);
router.post('/support', mobility.support);
router.post('/get_cancellation_reasons', mobility.getCancellationReasons);
module.exports = router;