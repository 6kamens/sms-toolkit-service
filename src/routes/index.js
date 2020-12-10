const express = require('express');
const router = express.Router();
const smsRoute = require('./smsRoute');
const otpRoute = require('./otpRoute');

router.use('/sms',smsRoute);
router.use('/otp',otpRoute);

module.exports = router;