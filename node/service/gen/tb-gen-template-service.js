
const sequelize=require('../../conmon/mysql');
const Sequelize = require('sequelize');
const GenTable = require('../../schema/gen/tb-gen-template')(sequelize,Sequelize); // 引入user的表结构
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
          content:obj.content,
          create_date:Date.now(),
          update_date:Date.now(),
          remarks:obj.remarks,
          del_flag:obj.del_flag,
          category:obj.category,
          file_path:obj.file_path,
          file_name:obj.file_name,
          
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
        
        o.content=obj.content;
        
        o.create_date=obj.create_date;
        
        o.remarks=obj.remarks;
        
        o.del_flag=obj.del_flag;
        
        o.category=obj.category;
        
        o.file_path=obj.file_path;
        
        o.file_name=obj.file_name;
        
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
        
        if(obj.content){
          o.content=obj.content;
        }
        
        if(obj.create_date){
          o.create_date=obj.create_date;
        }
        
        if(obj.remarks){
          o.remarks=obj.remarks;
        }
        
        if(obj.del_flag){
          o.del_flag=obj.del_flag;
        }
        
        if(obj.category){
          o.category=obj.category;
        }
        
        if(obj.file_path){
          o.file_path=obj.file_path;
        }
        
        if(obj.file_name){
          o.file_name=obj.file_name;
        }
        
      
      return await o.save();

    }
    
}
