const smsMessageTemplateDAL = require('../services/smsMessageTemplateDAL');
const { check , validationResult } = require('express-validator');


module.exports.smsTemplateValidate = (method)=>{
    switch(method){
        case 'insertSmsTemplate':return [
            check('templateCode','templateCode is required field').not().isEmpty().isLength({max:50}),
            check('templateType','templateType is required field').not().isEmpty().isLength({max:50}),
            check('templateTitle','templateTitle is required field').isLength({max:50}),
            check('templateBodyMessage','templateBodyMessage is required field').not().isEmpty().isLength({max:250})
        ];
        default : return [];
    }
}



module.exports.insertSmsTemplate = async (req,res)=>{
    try {
        
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.json({result:false,message:result.array() });
        }

        const save = await smsMessageTemplateDAL.insertSmsTemplate(req.body);

        if(save) return res.json({result:true,message:'success',data:save});

        res.json({result:false,message:'error insert db'});

    } catch (error) {
        res.json({result:false,message: process.env.NODE_ENV  == "production" ? error.message : error});
    }
}

module.exports.findSmsTemplateByCode = async (req,res)=>{

    try {
        const query = await smsMessageTemplateDAL.findSmsTemplateByCode(req.params.templateCode);
        return res.json({status:true , message : 'success' , data: query});
    } catch (error) {
        return res.json({status:false , message:error});
    }
}