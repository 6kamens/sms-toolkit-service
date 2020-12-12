const express= require('express');
const router = express.Router();
const otpController = require('../controllers/otpController');




router.post('/send-otp',otpController.otpValidate('sendOtp'),otpController.sendOtp);

router.post('/confirm-otp',otpController.otpValidate('confirmOtp'),otpController.confirmOtp);


module.exports = router;