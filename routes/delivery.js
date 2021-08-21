const express = require("express");
const router = express.Router();
const { delivery } = require('../controllers/index');

const auth = (req, res, next) => {
    next();
};
router.post('/search', auth, delivery.search);
router.post('/select', auth, delivery.select);
router.post('/init', auth, delivery.init);
router.post('/confirm', auth, delivery.confirm);
router.post('/status', auth, delivery.status);
router.post('/track', auth, delivery.track);
router.post('/cancel', auth, delivery.cancel);
router.post('/update', auth, delivery.update);
router.post('/rate', auth, delivery.rate);
router.post('/support', auth, delivery.support);
router.post('/get_cancellation_reasons', auth, delivery.getCancellationReasons);
module.exports = router;