const db = require('../entity');

module.exports.insertSmsTemplate = async (request)=> {

    const save = await db.SmsMessageTemplate.create({
        template_code: request.templateCode,
        template_type: request.templateType,
        template_title_message: request.templateTitleMessage,
        template_body_message: request.templateBodyMessage
    });

    return save;

}

module.exports.findSmsTemplateByCode = async (templateCode)=>{

    const query = await db.SmsMessageTemplate.findOne({where:{template_code: templateCode}});

    return query;

}