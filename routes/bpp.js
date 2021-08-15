const express = require("express");
const router = express.Router();
const { bpp } = require('../controllers/index');

router.post('/search', bpp.search);
router.post('/select', bpp.select);
router.post('/init', bpp.init);
router.post('/confirm', bpp.confirm);
router.post('/status', bpp.status);
router.post('/track', bpp.track);
router.post('/cancel', bpp.cancel);
router.post('/update', bpp.update);
router.post('/rate', bpp.rate);
router.post('/support', bpp.support);
router.post('/get_cancellation_reasons', bpp.getCancellationReasons);
module.exports = router;