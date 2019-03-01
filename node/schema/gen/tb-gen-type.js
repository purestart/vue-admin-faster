module.exports= function (sequelize, DataTypes) {
    return sequelize.define('tb_gen_type', {
      id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: false,
        
      },
      create_date: {
        type: DataTypes.DATE,
        allowNull: true,
        primaryKey: false,
        
      },
      update_date: {
        type: DataTypes.DATE,
        allowNull: true,
        primaryKey: false,
        
      },
      template: {
        type: DataTypes.STRING,
        allowNull: true,
        primaryKey: false,
        
      },
      remarks: {
        type: DataTypes.STRING,
        allowNull: true,
        primaryKey: false,
        
      },
      order_num:{
        type: DataTypes.INTEGER,
        allowNull: true,
        primaryKey: false,
      }
      
    }, {
      tableName: 'tb_gen_type',
      createdAt: false, //去掉默认字段
      updatedAt: false  //去掉默认字段
    });
  };
