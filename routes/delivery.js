const express = require("express");
const router = express.Router();
const { delivery } = require('../controllers/index');

router.post('/search', delivery.search);
router.post('/select', delivery.select);
router.post('/init', delivery.init);
router.post('/confirm', delivery.confirm);
router.post('/status', delivery.status);
router.post('/track', delivery.track);
router.post('/cancel', delivery.cancel);
router.post('/update', delivery.update);
router.post('/rate', delivery.rate);
router.post('/support', delivery.support);
router.post('/get_cancellation_reasons', delivery.getCancellationReasons);
module.exports = router;