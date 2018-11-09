module.exports= function (sequelize, DataTypes) {
    return sequelize.define('sample', {
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
      remarks: {
        type: DataTypes.STRING,
        allowNull: true,
        primaryKey: false,
        
      },
      
    }, {
      tableName: 'sample',
      createdAt: false, //去掉默认字段
      updatedAt: false  //去掉默认字段
    });
  };
