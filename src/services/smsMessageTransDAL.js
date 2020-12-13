const db = require('../entity');
const { Op } = require('sequelize');

module.exports.insertNewSmsTrans = async (request)=>{

    const save = await db.SmsMessageTrans.create({
        message_type: request.messageType,
        title_message:request.titleMessage,
        body_message : request.bodyMessage,
        sender_name : request.senderName,
        mobile_number : request.mobileNo,
        sending_status: request.sendingStatus
    });

    return save;
}

module.exports.searchSmsTrans = async (request)=>{

    const { count, rows } = await db.SmsMessageTrans.findAndCountAll({where:{
        [Op.and] : [
            {message_type: (request.messageType) ? request.messageType : {[Op.ne]: null}  },
            {mobile_number: (request.mobileNo) ? request.mobileNo : {[Op.ne]: null} },
            {sending_status: (request.sendingStatus) ? request.sendingStatus : {[Op.ne]: null} }
        ]
    },
        offset: request.size * request.index,
        limit: request.size    
    });

    return { totalRecord : count , listData : rows } ;

}