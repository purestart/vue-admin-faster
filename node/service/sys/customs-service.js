
const sequelize=require('../../conmon/mysql');
const Sequelize = require('sequelize');
const GenTable = require('../../schema/sys/customs-schema')(sequelize,Sequelize); // 引入user的表结构
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
          createDate:obj.createDate,
          age:obj.age,
          mytext:obj.mytext,
          blog:obj.blog,
          fl:obj.fl,
          db:obj.db,
          remarks:obj.remarks,
          updateDate:obj.updateDate,
          
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

      
        o.updateDate = Date.now();
        
        o.name=obj.name;
        
        o.createDate=obj.createDate;
        
        o.age=obj.age;
        
        o.mytext=obj.mytext;
        
        o.blog=obj.blog;
        
        o.fl=obj.fl;
        
        o.db=obj.db;
        
        o.remarks=obj.remarks;
        
        o.updateDate = Date.now();
        
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
        
        if(obj.createDate){
          o.createDate=obj.createDate;
        }
        
        if(obj.age){
          o.age=obj.age;
        }
        
        if(obj.mytext){
          o.mytext=obj.mytext;
        }
        
        if(obj.blog){
          o.blog=obj.blog;
        }
        
        if(obj.fl){
          o.fl=obj.fl;
        }
        
        if(obj.db){
          o.db=obj.db;
        }
        
        if(obj.remarks){
          o.remarks=obj.remarks;
        }
        
      
      return await o.save();

    }
    
}
