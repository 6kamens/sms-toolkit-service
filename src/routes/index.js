const express = require('express');
const router = express.Router();
const smsRoute = require('./smsRoute');
const otpRoute = require('./otpRoute');
const templateRoute = require('./templateRoute');
const smsTransactionRoute = require('./smsTransRoute');

router.use('/sms',smsRoute);
router.use('/otp',otpRoute);
router.use('/template',templateRoute);
router.use('/smsTrans',smsTransactionRoute);

module.exports = router;