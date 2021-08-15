const express = require("express");
const router = express.Router();
const { localRetail } = require('../controllers/index');

router.post('/search', localRetail.search);
router.post('/select', localRetail.select);
router.post('/init', localRetail.init);
router.post('/confirm', localRetail.confirm);
router.post('/status', localRetail.status);
router.post('/track', localRetail.track);
router.post('/cancel', localRetail.cancel);
router.post('/update', localRetail.update);
router.post('/rate', localRetail.rate);
router.post('/support', localRetail.support);
router.post('/get_cancellation_reasons', localRetail.getCancellationReasons);
module.exports = router;