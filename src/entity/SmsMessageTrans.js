module.exports  = (sequelize,DataTypes)=>{
    const model = sequelize.define(
        'SmsMessageTrans',{
            trans_id:{
                type:DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey : true
            },
            message_type:{
                type:DataTypes.STRING(50)
            },
            title_message:{
                type:DataTypes.STRING(50)
            },
            body_message:{
                type:DataTypes.STRING(250)
            },
            sender_name:{
                type:DataTypes.STRING(50)
            },
            mobile_number:{
                type:DataTypes.STRING(15),
                allowNull : false
            },
            sending_status:{
                type:DataTypes.STRING(25),
                defaultValue: 'waiting'
            }
        },{
            tableName : 'sms_message_trans',
            indexes:[
                {
                  fields:['message_type']
                },
                {
                    fields:['sender_name']
                },
                {
                    fields:['mobile_number']
                },
                {
                    fields:['sending_status']
                }
               ]
        }
    );

    model.associate = models=>{
        model.hasOne(models.SmsOtp,{foreignKey : {name : 'trans_id' , allowNull: false}});
        model.hasOne(models.SmsCreditLog,{foreignKey : 'trans_id'});
    };

    return model;
}