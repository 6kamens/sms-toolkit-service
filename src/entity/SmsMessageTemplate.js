module.exports = (sequelize,DataTypes)=>{
    const model = sequelize.define(
        'SmsMessageTemplate',{
            template_id:{
                type:DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey : true
            },
            template_code:{
                type:DataTypes.STRING(50)
            },
            template_type:{
                type:DataTypes.STRING(50)
            },
            template_title_message:{
                type:DataTypes.STRING(50)
            },
            template_body_message:{
                type:DataTypes.STRING(250)
            }
        },
        {
            tableName : 'sms_message_template'
        }
    );


    

    return model;
};