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
            },
            created_date:{
                type:DataTypes.DATE,
                defaultValue: sequelize.fn('now')
            }
        },{
            tableName : 'sms_otp'
        }
    );

    model.associate = models =>{
        model.belongsTo(models.SmsMessageTrans,{foreignKey : 'trans_id'});
    };

    return model;

}