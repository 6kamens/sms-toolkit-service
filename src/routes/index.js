const express = require('express');
const router = express.Router();
const smsRoute = require('./smsRoute');
const otpRoute = require('./otpRoute');
const templateRoute = require('./templateRoute');

router.use('/sms',smsRoute);
router.use('/otp',otpRoute);
router.use('/template',templateRoute);

module.exports = router;