module.exports= function (sequelize, DataTypes) {
    return sequelize.define('project_ctrl', {
      id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        
      },
      dealer_name: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: false,
        
      },
      project_name: {
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
      types: {
        type: DataTypes.STRING,
        allowNull: true,
        primaryKey: false,
        
      },
      stage: {
        type: DataTypes.INTEGER,
        allowNull: true,
        primaryKey: false,
        
      },
      contract_num: {
        type: DataTypes.INTEGER,
        allowNull: true,
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
      
    }, {
      tableName: 'project_ctrl',
      createdAt: false, //去掉默认字段
      updatedAt: false  //去掉默认字段
    });
  };
