const express = require("express");
const router = express.Router();
const { mobility } = require('../controllers/index');

router.post('/search', mobility.search);
router.post('/select', mobility.select);
router.post('/init', mobility.init);
router.post('/confirm');
router.post('/status');
router.post('/track');
router.post('/cancel');
router.post('/update');
router.post('/rating');
router.post('/support');

module.exports = router;