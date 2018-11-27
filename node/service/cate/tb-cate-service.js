
const sequelize=require('../../conmon/mysql');
const Sequelize = require('sequelize');
const GenTable = require('../../schema/cate/tb-cate-schema')(sequelize,Sequelize); // 引入user的表结构
var uuid = require('node-uuid');

var path=require('path');
var fs = require("fs");
var AsyncFs= require('../../util/async-fs');

var xtpl = require('xtpl');

var Service={
    
    info:async (id)=> {
        
        return await GenTable.findOne({
          where: {
            id
          }
        })
    },
    nav:async(searchParams)=>{
      let retObj=await Service.list(1000,1,searchParams);
      let list=retObj.list;
      let result=await Service.getListByParentId(list,0);
      return result;
    },
    getListByParentId:async(list,parentId)=>{
      let ret=[];
      if(list && list.length>0){
        //await list.forEach(async currentItem => {
        for(let i=0;i<list.length;i++){
          let currentItem=list[i];
          if(currentItem.parentId==parentId){
            let children=await Service.getListByParentId(list,currentItem.id);
            console.log("------children-----"+currentItem.id+"==="+JSON.stringify(children));
            //currentItem.children=children;
            let item={
              id:currentItem.id,
              name:currentItem.name,
              parentId:currentItem.parentId,
              orderNum:currentItem.orderNum,
              remarks:currentItem.remarks,
              
              children:children
            }
          // console.log("====currentItem===="+JSON.stringify(currentItem));
            ret.push(item);
          }
        }
      }
     // })
      //console.log("=====ret====="+JSON.stringify(ret));
      return ret;
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
        order: [['order_num', 'DESC']],
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
        
            
          name:obj.name,
          parentId:obj.parentId,
          orderNum:obj.orderNum,
          remarks:obj.remarks,
          
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

      
        
        
        o.name=obj.name;
        
        o.parentId=obj.parentId;
        
        o.orderNum=obj.orderNum;
        
        o.remarks=obj.remarks;
        
      return await o.save();

    },
    updateExist:async (obj)=>{
      var o = await GenTable.findOne({
          where: {
              id: obj.id
          }
      });

      o.updateDate = Date.now();

      
        if(obj.name){
          o.name=obj.name;
        }
        
        if(obj.parentId){
          o.parentId=obj.parentId;
        }
        
        if(obj.orderNum){
          o.orderNum=obj.orderNum;
        }
        
        if(obj.remarks){
          o.remarks=obj.remarks;
        }
        
      
      return await o.save();

    }
    
}
module.exports=Service;
