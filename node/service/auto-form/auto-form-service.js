
const sequelize=require('../../conmon/mysql');
const Sequelize = require('sequelize');
const GenTable = require('../../schema/auto-form/auto-form')(sequelize,Sequelize); // 引入user的表结构
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
        order: [['update_date', 'DESC']],
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
        form_name:obj.form_name,
          form_desc:obj.form_desc,
          form_style_id:obj.form_style_id,
          form_content:obj.form_content,
          create_name:obj.create_name,
          create_by:obj.create_by,
          create_date:obj.create_date,
          update_by:obj.update_by,
          update_date:obj.update_date,
          sys_org_code:obj.sys_org_code,
          sys_company_code:obj.sys_company_code,
          form_parse:obj.form_parse,
          main_table_source:obj.main_table_source,
          update_name:obj.update_name,
          
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

      
        o.form_name=obj.form_name;
        
        o.form_desc=obj.form_desc;
        
        o.form_style_id=obj.form_style_id;
        
        o.form_content=obj.form_content;
        
        o.create_name=obj.create_name;
        
        o.create_by=obj.create_by;
        
        o.create_date=obj.create_date;
        
        o.update_by=obj.update_by;
        
        o.sys_org_code=obj.sys_org_code;
        
        o.sys_company_code=obj.sys_company_code;
        
        o.form_parse=obj.form_parse;
        
        o.main_table_source=obj.main_table_source;
        
        o.update_name=obj.update_name;
        
      return await o.save();

    },
    updateExist:async (obj)=>{
      var o = await GenTable.findOne({
          where: {
              id: obj.id
          }
      });

      o.update_date = Date.now();

      
        if(obj.form_name){
          o.form_name=obj.form_name;
        }
        
        if(obj.form_desc){
          o.form_desc=obj.form_desc;
        }
        
        if(obj.form_style_id){
          o.form_style_id=obj.form_style_id;
        }
        
        if(obj.form_content){
          o.form_content=obj.form_content;
        }
        
        if(obj.create_name){
          o.create_name=obj.create_name;
        }
        
        if(obj.create_by){
          o.create_by=obj.create_by;
        }
        
        if(obj.create_date){
          o.create_date=obj.create_date;
        }
        
        if(obj.update_by){
          o.update_by=obj.update_by;
        }
        
        if(obj.sys_org_code){
          o.sys_org_code=obj.sys_org_code;
        }
        
        if(obj.sys_company_code){
          o.sys_company_code=obj.sys_company_code;
        }
        
        if(obj.form_parse){
          o.form_parse=obj.form_parse;
        }
        
        if(obj.main_table_source){
          o.main_table_source=obj.main_table_source;
        }
        
        if(obj.update_name){
          o.update_name=obj.update_name;
        }
        
      
      return await o.save();

    }
    
}
