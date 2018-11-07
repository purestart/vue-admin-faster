module.exports= function (sequelize, DataTypes) {
    return sequelize.define('tb_depts', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        
        autoIncrement: true
        
      },
      parent_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: false,
        
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: false,
        
      },
      order_num: {
        type: DataTypes.INTEGER,
        allowNull: true,
        primaryKey: false,
        
      },
      del_flag: {
        type: DataTypes.INTEGER,
        allowNull: true,
        primaryKey: false,
        
      },
      
    }, {
      tableName: 'tb_depts',
      createdAt: false, //去掉默认字段
      updatedAt: false  //去掉默认字段
    });
  };
