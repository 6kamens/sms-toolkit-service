const db = require('../entity');
const  { Op } = require("sequelize");
const moment = require('moment');

module.exports.confirmOtp = async (mobileNo,otp,otpRef) => {
   
    const query = db.SmsOtp.findOne({where:
        {
            [Op.and]: [{target_mobile_number:mobileNo},
                {otp_number:otp},
                {otp_ref_number:otpRef},
                {otp_expired_date : { [Op.gt]: Date.now() } }]
        },
        attributes:["id"]
    }
    );

    return query;
}

module.exports.insertNewOtp = async (request)=>{

    const t = await db.sequelize.transaction();

    const saveSms = await db.SmsMessageTrans.create({
        message_type: 'OTP',
        title_message: '',
        body_message : request.bodyMessage,
        sender_name : request.senderName,
        mobile_number : request.mobileNo,
        sending_status:request.sendingStatus
    },{transaction:t});

    const saveOtp = await db.SmsOtp.create({
        target_mobile_number : request.mobileNo,
        otp_ref_number : request.otpRef,
        otp_number : request.otpNumber,
        otp_expired_date: moment(Date.now()).add(5, 'm').toDate(),
        trans_id:saveSms.trans_id
    },{transaction:t});

    await t.commit();

    return t;
}