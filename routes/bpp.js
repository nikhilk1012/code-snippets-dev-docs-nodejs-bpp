const express = require("express");
const router = express.Router();
const { bpp } = require('../controllers/index');

router.post('/search', bpp.searchMobilty);
router.post('/select');
router.post('/init');
router.post('/confirm');
router.post('/status');
router.post('/track');
router.post('/cancel');
router.post('/update');
router.post('/rating');
router.post('/support');

module.exports = router;