module.exports= function (sequelize, DataTypes) {
    return sequelize.define('{{obj.table.name}}', {
      {{#each(obj.table.columns)~}}
      {{this.name}}: {
        type: DataTypes.{{obj.config.node_type[this.dataType]}},
        allowNull: {{this.isEmpty?true:false}},
        primaryKey: {{this.primaryKey?true:false}},
        {{#if(this.isAutoIncrement)~}}
        autoIncrement: true
        {{~/if}}
      },
      {{~/each}}
    }, {
      tableName: '{{obj.table.name}}',
      createdAt: false, //去掉默认字段
      updatedAt: false  //去掉默认字段
    });
  };
