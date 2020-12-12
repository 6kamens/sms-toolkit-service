const express = require('express');
const router  = express.Router();
const templateController = require('../controllers/templateController');


router.post('/insert-sms-template',
templateController.smsTemplateValidate('insertSmsTemplate'),
templateController.insertSmsTemplate);

router.get('/find-template-by-code/:templateCode',
templateController.findSmsTemplateByCode);


module.exports = router ;