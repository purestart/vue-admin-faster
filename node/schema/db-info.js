module.exports= function (sequelize, DataTypes) {
    return sequelize.define('tb_db_info', {
      id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: ''
      },
      type: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: ''
      },
      host: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: ''
      },
      user: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: ''
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: ''
      },
      port: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: ''
      },
      create_date: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: ''
      },
      update_date: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: ''
      },
      remarks: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: ''
      },
      alias: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: ''
      },
    }, {
      tableName: 'tb_db_info',
      createdAt: false, //去掉默认字段
      updatedAt: false  //去掉默认字段
    });
  };
