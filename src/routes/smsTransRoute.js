const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');

router.post('/searchSmsTrans',
transactionController.smsTransactionValidate('searchSmsTrans'),
transactionController.searchSmsTrans);


module.exports = router;