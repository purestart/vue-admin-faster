module.exports= function (sequelize, DataTypes) {
    return sequelize.define('tb_project_plan', {
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
      custom_name: {
        type: DataTypes.STRING,
        allowNull: true,
        primaryKey: false,
        
      },
      project_address: {
        type: DataTypes.STRING,
        allowNull: true,
        primaryKey: false,
        
      },
      category: {
        type: DataTypes.STRING,
        allowNull: true,
        primaryKey: false,
        
      },
      create_date: {
        type: DataTypes.DATE,
        allowNull: true,
        primaryKey: false,
        
      },
      plan_time: {
        type: DataTypes.INTEGER,
        allowNull: true,
        primaryKey: false,
        
      },
      actual_time: {
        type: DataTypes.INTEGER,
        allowNull: true,
        primaryKey: false,
        
      },
      gap: {
        type: DataTypes.INTEGER,
        allowNull: true,
        primaryKey: false,
        
      },
      
    }, {
      tableName: 'tb_project_plan',
      createdAt: false, //去掉默认字段
      updatedAt: false  //去掉默认字段
    });
  };
