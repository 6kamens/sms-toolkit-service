const express= require('express');
const router = express.Router();
const otpController = require('../controllers/otpController');




router.use('/send-otp',otpController.sendOtpValidate('sendOtp'),otpController.sendOtp);


router.use('/confirm-otp',otpController.sendOtpValidate('confirmOtp'),otpController.confirmOtp);


module.exports = router;