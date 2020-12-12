const thirdPartySmsService = require('../services/thaiBulkSmsService');
const { check, validationResult } = require('express-validator');
const smsMessageTransDAL = require('../services/smsMessageTransDAL');

module.exports.sendSmsValidate = (method)=>{
    switch(method){
        case "sendSms" : return [
            check('mobileNo').not().isEmpty().withMessage('mobileNo is required')
            .isMobilePhone().withMessage('mobileNo must be mobile phone'),         
            check('message').not().isEmpty().withMessage('message is required')
            .isLength({max:250}).withMessage('max length : 250'),         
            check('titleMessage').not().isEmpty().withMessage('titleMessage is required')
            .isLength({max:250}).withMessage('max length : 50'),   
        ] ; 
        default: return [];
    }
}

module.exports.sendSms = async (req,res) =>{

    try {
        const error = validationResult(req);
        if(!error.isEmpty()) return res.json({status : false , message:error.array()});
        
        const sendResult = await thirdPartySmsService.sendSms({mobileNo:req.body.mobileNo , message: req.body.message}) ;

        const saveTrans = await  smsMessageTransDAL.insertNewSmsTrans({
            messageType:  'MANUAL',
            titleMessage: req.body.titleMessage,
            bodyMessage:req.body.message,
            senderName: process.env.THAI_BULK_SMS_SENDER || 'TESTER',
            mobileNo : req.body.mobileNo
        });


        return res.json({status:true , message : sendResult}) ;

    } catch (error) {
        return res.json({status:false , message:error});
    }

}

