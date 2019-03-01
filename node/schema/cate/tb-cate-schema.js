module.exports= function (sequelize, DataTypes) {
    return sequelize.define('tb_cate', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        field: "id",
        
        autoIncrement: true
        
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: false,
        field: "name",
        
      },
      parentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: false,
        field: "parent_id",
        
      },
      orderNum: {
        type: DataTypes.INTEGER,
        allowNull: true,
        primaryKey: false,
        field: "order_num",
        
      },
      remarks: {
        type: DataTypes.STRING,
        allowNull: true,
        primaryKey: false,
        field: "remarks",
        
      },
      
    }, {
      tableName: 'tb_cate',
      createdAt: false, //去掉默认字段
      updatedAt: false  //去掉默认字段
    });
  };
