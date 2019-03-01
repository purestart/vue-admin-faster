module.exports= function (sequelize, DataTypes) {
    return sequelize.define('tb_gen_table', {
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
      class_name: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: ''
      },
      parent_table: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: ''
      },
      parent_table_fk: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: ''
      },
      attrs: {
        type: DataTypes.TEXT,
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
      sync: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: ''
      },
      db_id: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: ''
      },
      db_name: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: ''
      },
      module_name:{
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: ''
      },
      buttons:{
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: '[]'
      }
    }, {
      tableName: 'tb_gen_table',
      createdAt: false, //去掉默认字段
      updatedAt: false  //去掉默认字段
    });
  };
