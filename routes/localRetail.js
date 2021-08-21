const express = require("express");
const router = express.Router();
const { localRetail } = require('../controllers/index');
const auth = (req, res, next) => {
    next();
};
router.post('/search', auth, localRetail.search);
router.post('/select', auth, localRetail.select);
router.post('/init', auth, localRetail.init);
router.post('/confirm', auth, localRetail.confirm);
router.post('/status', auth, localRetail.status);
router.post('/track', auth, localRetail.track);
router.post('/cancel', auth, localRetail.cancel);
router.post('/update', auth, localRetail.update);
router.post('/rate', auth, localRetail.rate);
router.post('/support', auth, localRetail.support);
router.post('/get_cancellation_reasons', auth, localRetail.getCancellationReasons);
module.exports = router;