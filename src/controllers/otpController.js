const randomNumber = require('../utility/randomNumber');
const { body, validationResult } = require('express-validator');
const thirdPartySmsService = require('../services/thaiBulkSmsService');

module.exports.sendOtpValidate = (method)=>{
    switch(method){
        case 'sendOtp': return [
            body('mobileNo').isLength({ min: 1 })
        ];
        case 'confirmOtp': return [
            body('mobileNo').isLength({ min: 1 }),
            body('refOtp').isLength({ min: 1 }),
            body('confirmOtp').isLength({ min: 1 })
        ];
        default: return [];
    }
}

module.exports.sendOtp = (req,res)=> {

    try {

        const otpGen = randomNumber(6);
        const otpRefGen = randomNumber(5);
    
        return res.json({status:true,message:'success',data:{
            otpRef : otpRefGen
        }});

    } catch (error) {
        return res.json({status:false , message:error});
    }


}


module.exports.confirmOtp = (req,res)=> {

    try {
    
        return res.json({status:true,message:'success'});

    } catch (error) {
        return res.json({status:false , message:error});
    }


}