
const sequelize=require('../../conmon/mysql');
const Sequelize = require('sequelize');
const GenTable = require('../../schema/project/project-ctrl')(sequelize,Sequelize); // 引入user的表结构
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
        
            id:uuid.v1(),
            
          dealer_name:obj.dealer_name,
          project_name:obj.project_name,
          custom_name:obj.custom_name,
          project_address:obj.project_address,
          types:obj.types,
          stage:obj.stage,
          contract_num:obj.contract_num,
          create_date:obj.create_date,
          update_date:obj.update_date,
          
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

      
        o.dealer_name=obj.dealer_name;
        
        o.project_name=obj.project_name;
        
        o.custom_name=obj.custom_name;
        
        o.project_address=obj.project_address;
        
        o.types=obj.types;
        
        o.stage=obj.stage;
        
        o.contract_num=obj.contract_num;
        
        o.create_date=obj.create_date;
        
      return await o.save();

    },
    updateExist:async (obj)=>{
      var o = await GenTable.findOne({
          where: {
              id: obj.id
          }
      });

      o.update_date = Date.now();

      
        if(obj.dealer_name){
          o.dealer_name=obj.dealer_name;
        }
        
        if(obj.project_name){
          o.project_name=obj.project_name;
        }
        
        if(obj.custom_name){
          o.custom_name=obj.custom_name;
        }
        
        if(obj.project_address){
          o.project_address=obj.project_address;
        }
        
        if(obj.types){
          o.types=obj.types;
        }
        
        if(obj.stage){
          o.stage=obj.stage;
        }
        
        if(obj.contract_num){
          o.contract_num=obj.contract_num;
        }
        
        if(obj.create_date){
          o.create_date=obj.create_date;
        }
        
      
      return await o.save();

    }
    
}
