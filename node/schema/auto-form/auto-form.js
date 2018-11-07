module.exports= function (sequelize, DataTypes) {
    return sequelize.define('auto_form', {
      id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
      },
      form_name: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: false
      },
      form_desc: {
        type: DataTypes.STRING,
        allowNull: true,
        primaryKey: false
      },
      form_style_id: {
        type: DataTypes.STRING,
        allowNull: true,
        primaryKey: false
      },
      form_content: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: false
      },
      create_name: {
        type: DataTypes.STRING,
        allowNull: true,
        primaryKey: false
      },
      create_by: {
        type: DataTypes.STRING,
        allowNull: true,
        primaryKey: false
      },
      create_date: {
        type: DataTypes.DATE,
        allowNull: true,
        primaryKey: false
      },
      update_by: {
        type: DataTypes.STRING,
        allowNull: true,
        primaryKey: false
      },
      update_date: {
        type: DataTypes.DATE,
        allowNull: true,
        primaryKey: false
      },
      sys_org_code: {
        type: DataTypes.STRING,
        allowNull: true,
        primaryKey: false
      },
      sys_company_code: {
        type: DataTypes.STRING,
        allowNull: true,
        primaryKey: false
      },
      form_parse: {
        type: DataTypes.STRING,
        allowNull: true,
        primaryKey: false
      },
      main_table_source: {
        type: DataTypes.STRING,
        allowNull: true,
        primaryKey: false
      },
      update_name: {
        type: DataTypes.STRING,
        allowNull: true,
        primaryKey: false
      },
      
    }, {
      tableName: 'auto_form',
      createdAt: false, //去掉默认字段
      updatedAt: false  //去掉默认字段
    });
  };
