const db = require('../entity');

module.exports.insertNewSmsTrans = async (request)=>{

    const save = await db.SmsMessageTrans.create({
        message_type: request.messageType,
        title_message:request.titleMessage,
        body_message : request.bodyMessage,
        sender_name : request.senderName,
        mobile_number : request.mobileNo
    });

    return save;

}