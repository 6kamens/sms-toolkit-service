const express = require('express');
const router = express.Router();
const smsController = require('../controllers/smsController');

router.post('/send-sms',smsController.sendSmsValidate('sendSms'), smsController.sendSms);


module.exports = router;