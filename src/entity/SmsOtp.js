module.exports = (sequelize,DataTypes)=>{
    
    const model = sequelize.define(
        'SmsOtp',{
            id:{
                type:DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey : true
            },
            target_mobile_number:{
                type:DataTypes.STRING(15),
                allowNull: false 
            },
            otp_ref_number:{
                type:DataTypes.STRING(10),
                allowNull: false 
            },
            otp_number:{
                type:DataTypes.STRING(10),
                allowNull: false 
            },
            otp_expired_date:{
                type:DataTypes.DATE
            }
        },{
            tableName : 'sms_otp',
            indexes:[
                {
                  fields:['target_mobile_number']
                },
                {
                    fields:['otp_ref_number']
                },
                {
                    fields:['otp_number']
                },
                {
                    unique: true,
                    fields:['otp_number','otp_ref_number']
                },
                {
                    fields:['otp_expired_date']
                }
            ]
        }
    );

    model.associate = models =>{
        model.belongsTo(models.SmsMessageTrans,{foreignKey : {name : 'trans_id' , allowNull: false}} );
    };

    return model;

}