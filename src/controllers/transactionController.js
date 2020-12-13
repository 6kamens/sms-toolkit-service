const smsMessageTransDAL = require('../services/smsMessageTransDAL');
const { check, validationResult } = require('express-validator');


module.exports.smsTransactionValidate =(method)=>{
    switch(method){
        case 'searchSmsTrans' : return [
            check('size').isInt({ min: 0, max: 100}).withMessage('invalid size'),
            check('index').isInt({ min: 0 }).withMessage('invalid index')
        ];
        default : return [];
    }

}


module.exports.searchSmsTrans = async (req,res)=>{
    try {
        const error = validationResult(req);
        if(!error.isEmpty()) return res.json({status : false , message:error.array()});

        const query =  await smsMessageTransDAL.searchSmsTrans(req.body);

        return res.json({status:true,message:'success','data':{totalRecord:query.totalRecord , listData:query.listData }});

    }catch(error) {
        return res.json({status:false,message: error.message});
    }
}
