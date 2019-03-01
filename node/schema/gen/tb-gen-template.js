module.exports= function (sequelize, DataTypes) {
    return sequelize.define('tb_gen_template', {
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
      content: {
        type: DataTypes.STRING,
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
      remarks: {
        type: DataTypes.STRING,
        allowNull: true,
        primaryKey: false,
        
      },
      del_flag: {
        type: DataTypes.INTEGER,
        allowNull: true,
        primaryKey: false,
        
      },
      category: {
        type: DataTypes.STRING,
        allowNull: true,
        primaryKey: false,
        
      },
      file_path: {
        type: DataTypes.STRING,
        allowNull: true,
        primaryKey: false,
        
      },
      file_name: {
        type: DataTypes.STRING,
        allowNull: true,
        primaryKey: false,
        
      },
      
    }, {
      tableName: 'tb_gen_template',
      createdAt: false, //去掉默认字段
      updatedAt: false  //去掉默认字段
    });
  };
