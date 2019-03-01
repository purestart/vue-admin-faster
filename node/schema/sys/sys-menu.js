module.exports= function (sequelize, DataTypes) {
    return sequelize.define('sys_menu', {
      menu_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      parent_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        primaryKey: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true,
        primaryKey: false
      },
      url: {
        type: DataTypes.STRING,
        allowNull: true,
        primaryKey: false
      },
      perms: {
        type: DataTypes.STRING,
        allowNull: true,
        primaryKey: false
      },
      type: {
        type: DataTypes.INTEGER,
        allowNull: true,
        primaryKey: false
      },
      icon: {
        type: DataTypes.STRING,
        allowNull: true,
        primaryKey: false
      },
      spread: {
        type: DataTypes.INTEGER,
        allowNull: true,
        primaryKey: false
      },
      order_num: {
        type: DataTypes.INTEGER,
        allowNull: true,
        primaryKey: false
      },
      update_date: {
        type: DataTypes.DATE,
        allowNull: true,
        primaryKey: false
      },
      
    }, {
      tableName: 'sys_menu',
      createdAt: false, //去掉默认字段
      updatedAt: false  //去掉默认字段
    });
  };
