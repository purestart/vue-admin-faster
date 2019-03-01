module.exports= function (sequelize, DataTypes) {
    return sequelize.define('customs', {
      id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        field: "id",
        
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: false,
        field: "name",
        
      },
      createDate: {
        type: DataTypes.DATE,
        allowNull: true,
        primaryKey: false,
        field: "create_date",
        
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: false,
        field: "age",
        
      },
      mytext: {
        type: DataTypes.STRING,
        allowNull: true,
        primaryKey: false,
        field: "mytext",
        
      },
      blog: {
        type: DataTypes.STRING,
        allowNull: true,
        primaryKey: false,
        field: "blog",
        
      },
      fl: {
        type: DataTypes.FLOAT,
        allowNull: true,
        primaryKey: false,
        field: "fl",
        
      },
      db: {
        type: DataTypes.DOUBLE,
        allowNull: true,
        primaryKey: false,
        field: "db",
        
      },
      remarks: {
        type: DataTypes.STRING,
        allowNull: true,
        primaryKey: false,
        field: "remarks",
        
      },
      updateDate: {
        type: DataTypes.DATE,
        allowNull: true,
        primaryKey: false,
        field: "update_date",
        
      },
      
    }, {
      tableName: 'customs',
      createdAt: false, //去掉默认字段
      updatedAt: false  //去掉默认字段
    });
  };
