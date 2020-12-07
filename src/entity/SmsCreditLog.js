module.exports = (sequelize,DataTypes)=>{
    const model = sequelize.define(
        'SmsCreditLog',{
            id:{
                type:DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey : true
            },
            credit_trans_date:{
                type:DataTypes.DATE
            },
            credit_type:{
                type:DataTypes.STRING(25)
            },
            credit_amount:{
                type:DataTypes.DECIMAL(4,2)
            },
            is_active:{
                type:DataTypes.BOOLEAN,
                defaultValue : true
            }
        },
        {
            tableName : 'sms_credit_log',
            indexes:[
                {
                  fields:['credit_trans_date']
                },
                {
                    fields:['credit_type']
                },
                {
                    fields:['is_active']
                }
            ]
        }
    );

    model.associate = models =>{
        model.belongsTo(models.SmsMessageTrans,{foreignKey : 'trans_id'});
    };

    return model;

};