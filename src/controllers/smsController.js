const thirdPartySmsService = require('../services/thaiBulkSmsService');
const { body, validationResult } = require('express-validator');


module.exports.sendSmsValidate = (method)=>{
    switch(method){
        case "sendSms" : return [
            body('mobileNo').isLength({ min: 1 }),
            body('message').isLength({ min: 1 }),
        ] ; 
        default: return [];
    }
}

module.exports.sendSms = async (req,res) =>{

    try {
        const error = validationResult(req);
        if(!error.isEmpty()) return res.json({status : false , message:error.array()});
        
        const sendResult = await thirdPartySmsService.sendSms({mobileNo:req.body.mobileNo , message: req.body.message}) ;

        return res.json({status:true , message : sendResult}) ;

    } catch (error) {
        return res.json({status:false , message:error});
    }

}

