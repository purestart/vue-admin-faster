
const sequelize=require('../../conmon/mysql');
const Sequelize = require('sequelize');
const GenTable = require('../../schema/project/tb-project-plan-schema')(sequelize,Sequelize); // 引入user的表结构
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
            
          name:obj.name,
          custom_name:obj.custom_name,
          project_address:obj.project_address,
          category:obj.category,
          create_date:obj.create_date,
          plan_time:obj.plan_time,
          actual_time:obj.actual_time,
          gap:obj.gap,
          
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

      
        o.name=obj.name;
        
        o.custom_name=obj.custom_name;
        
        o.project_address=obj.project_address;
        
        o.category=obj.category;
        
        o.create_date=obj.create_date;
        
        o.plan_time=obj.plan_time;
        
        o.actual_time=obj.actual_time;
        
        o.gap=obj.gap;
        
      return await o.save();

    },
    updateExist:async (obj)=>{
      var o = await GenTable.findOne({
          where: {
              id: obj.id
          }
      });

      o.update_date = Date.now();

      
        if(obj.name){
          o.name=obj.name;
        }
        
        if(obj.custom_name){
          o.custom_name=obj.custom_name;
        }
        
        if(obj.project_address){
          o.project_address=obj.project_address;
        }
        
        if(obj.category){
          o.category=obj.category;
        }
        
        if(obj.create_date){
          o.create_date=obj.create_date;
        }
        
        if(obj.plan_time){
          o.plan_time=obj.plan_time;
        }
        
        if(obj.actual_time){
          o.actual_time=obj.actual_time;
        }
        
        if(obj.gap){
          o.gap=obj.gap;
        }
        
      
      return await o.save();

    }
    
}
