module.exports= function (sequelize, DataTypes) {
    return sequelize.define('person', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
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
      username: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: ''
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: ''
      }
    }, {
      tableName: 'person',
      createdAt: false, //去掉默认字段
      updatedAt: false  //去掉默认字段
    });
  };
