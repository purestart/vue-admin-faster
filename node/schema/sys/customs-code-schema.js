module.exports= function (sequelize, DataTypes) {
    return sequelize.define('customs', {
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
      age: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: false,
        
      },
      mytext: {
        type: DataTypes.STRING,
        allowNull: true,
        primaryKey: false,
        
      },
      blog: {
        type: DataTypes.STRING,
        allowNull: true,
        primaryKey: false,
        
      },
      fl: {
        type: DataTypes.FLOAT,
        allowNull: true,
        primaryKey: false,
        
      },
      db: {
        type: DataTypes.DOUBLE,
        allowNull: true,
        primaryKey: false,
        
      },
      remarks: {
        type: DataTypes.STRING,
        allowNull: true,
        primaryKey: false,
        
      },
      update_date: {
        type: DataTypes.DATE,
        allowNull: true,
        primaryKey: false,
        
      },
      
    }, {
      tableName: 'customs',
      createdAt: false, //去掉默认字段
      updatedAt: false  //去掉默认字段
    });
  };
