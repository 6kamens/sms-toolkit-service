const { request } = require("express");
const fetchRequest = require('../utility/fetchRequest');

module.exports.sendSms = async (request)=> {

        const params = {
            username:  process.env.THAI_BULK_SMS_USERNAME,
            password: process.env.THAI_BULK_SMS_PASSWORD,
            msisdn: request.mobileNo,
            message: request.message,
            sender: process.env.THAI_BULK_SMS_SENDER || 'TESTER',
            force: process.env.THAI_BULK_SMS_FORCE || 'standard'
        };
    
        const url =  process.env.THAI_BULK_SMS_URL;
        const targetUrl = process.env.NODE_ENV  == "production" ? `${url}/sms_api.php` : `${url}/sms_api_test.php`;
    
        const result = await fetchRequest.postDataUrlEncodedXml(targetUrl,params);
    
       return result;
}
