module.exports= function (sequelize, DataTypes) {
    return sequelize.define('tb_cate', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        
        autoIncrement: true
        
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: false,
        
      },
      parent_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: false,
        
      },
      order_num: {
        type: DataTypes.INTEGER,
        allowNull: true,
        primaryKey: false,
        
      },
      remarks: {
        type: DataTypes.STRING,
        allowNull: true,
        primaryKey: false,
        
      },
      
    }, {
      tableName: 'tb_cate',
      createdAt: false, //去掉默认字段
      updatedAt: false  //去掉默认字段
    });
  };
