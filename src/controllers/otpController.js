const randomNumber = require('../utility/randomNumber');
const { check, validationResult } = require('express-validator');
const thirdPartySmsService = require('../services/thaiBulkSmsService');
const smsMessageTemplateDAL = require('../services/smsMessageTemplateDAL');
const smsOtpDAL = require('../services/smsOtpDAL');
const smsMessageTransDAL = require('../services/smsMessageTransDAL');

module.exports.otpValidate = (method)=>{
    switch(method){
        case 'sendOtp': return [
            check('mobileNo').not().isEmpty().withMessage('mobileNo is required')
            .isMobilePhone().withMessage('mobileNo must be mobile phone'),            
            check('otpTemplate').isLength({max:50}).withMessage('invalid length : 50'),
        ];
        case 'confirmOtp': return [
            check('mobileNo').not().isEmpty().withMessage('mobileNo is required')
            .isMobilePhone().withMessage('mobileNo must be mobile phone'),
            check('refOtp').isInt().withMessage('refOtp must be number').isLength({min:5 , max: 5}).withMessage('invalid length : 6'),
            check('confirmOtp').isInt().withMessage('confirmOtp must be number').isLength({ min:6 , max: 6 }).withMessage('invalid length : 5'),
        ];
        default: return [];
    }
}

module.exports.sendOtp = async (req,res)=> {

    try {

        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.json({result:false,message:result.array() });
        }

        const otpGen = randomNumber.generateRandomNumber(6);
        const otpRefGen = randomNumber.generateRandomNumber(5);

        const getTemplate = await smsMessageTemplateDAL.findSmsTemplateByCode(req.otpTemplate || 'OTP_01');

        if(!getTemplate) return res.json({result:false,message:'not found template'});

        let messageOtp = getTemplate.template_body_message.replace("{OTP_NO}", otpGen);
        messageOtp = messageOtp.replace("{OTP_REF}", otpRefGen);

        //change third party sms service here
        const sendOtp = await thirdPartySmsService.sendSms({
            mobileNo : req.body.mobileNo,
            message: messageOtp
        });

        //check the result before next
        //if(sendOtp.status == false) return res.json({status:false,message:sendOtp});

        const insertDb = await smsOtpDAL.insertNewOtp({
            otpRef : otpRefGen,
            otpNumber : otpGen,
            bodyMessage:messageOtp,
            senderName: process.env.THAI_BULK_SMS_SENDER || 'TESTER',
            mobileNo : req.body.mobileNo ,
            sendingStatus : 'success'
        });

        if(!insertDb) return res.json({status:false,message:'error save db'});

        return res.json({status:true,message:'success',data:{
            otpRef : otpRefGen
        }});

    } catch (error) {
        return res.json({status:false , message:error.message});
    }


}


module.exports.confirmOtp = async (req,res)=> {

    try {
        
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.json({result:false,message:result.array() });
        }

        const check = await smsOtpDAL.confirmOtp(req.body.mobileNo
            ,req.body.confirmOtp
            ,req.body.refOtp);

        if(!check) return res.json({status:false,message:'invalid OTP number'});

        return res.json({status:true,message:'success'});

    } catch (error) {
        return res.json({status:false , message:error.message});
    }

}