
const sequelize=require('../../conmon/mysql');
const Sequelize = require('sequelize');
const GenTable = require('../../schema/{{obj.table.module_name}}/{{obj.fileSubName}}')(sequelize,Sequelize); // 引入user的表结构
var uuid = require('node-uuid');

var path=require('path');
var fs = require("fs");
var AsyncFs= require('../../util/async-fs');

var xtpl = require('xtpl');

module.exports={
    
    info:async (id)=> {
        
        return await GenTable.findOne({
          where: {
            id
          }
        })
    },
    infoByName:async (username)=>{
        return await GenTable.findOne({
            where: {
              username
            }
          })
    },
    list:async (pageSize=10,pageNum,searchParams)=>{

      let total=0;
      total=await GenTable.count({where : searchParams}, {logging : false});
      console.log(total);
      if(total<1){
        return [];
      }

      let offset=0;
      console.log(pageSize);

      if(pageNum>1){
        offset=(pageNum-1)*pageSize;
      }
      
      let list= await GenTable.findAll({
        where:searchParams,
        //order: [['update_date', 'DESC']],
        offset: offset,
        limit: pageSize
      });

      let result={
        pageSize,
        pageNum,
        list,
        total
      }
      return result;
    },
    create:async (obj)=>{
      return await GenTable.create({
        {{#each(obj.table.columns)~}}
          {{#if(this.name !== obj.keyname)~}}
          {{this.name}}:obj.{{this.name}},
          {{else}}
            {{#if(this.dataType !== 'int' && this.dataType !== 'integer' && !this.isAutoIncrement)~}}
          {{this.name}}:uuid.v1(),
            {{~/if}}
          {{~/if}}
        {{~/each}}
      })
    },
    delete:async (id)=>{

      var o = await GenTable.findOne({
          where: {
              id: id
          }
      });

      return await o.destroy();

    },
    update:async (obj)=>{
      var o = await GenTable.findOne({
          where: {
              id: obj.id
          }
      });

      o.update_date = Date.now();

      {{#each(obj.table.columns)~}}
        {{#if(this.name !== obj.keyname && this.name!=='update_date')~}}
        o.{{this.name}}=obj.{{this.name}};
        {{~/if}}
      {{~/each}}
      return await o.save();

    },
    updateExist:async (obj)=>{
      var o = await GenTable.findOne({
          where: {
              id: obj.id
          }
      });

      o.update_date = Date.now();

      {{#each(obj.table.columns)~}}
        {{#if(this.name !== obj.keyname && this.name!=='update_date')~}}
        if(obj.{{this.name}}){
          o.{{this.name}}=obj.{{this.name}};
        }
        {{~/if}}
      {{~/each}}
      
      return await o.save();

    }
    
}
