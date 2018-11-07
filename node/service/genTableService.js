
const sequelize=require('../conmon/mysql');
const Sequelize = require('sequelize');
const GenTable = require('../schema/gen-table')(sequelize,Sequelize); // 引入user的表结构
var uuid = require('node-uuid');

var path=require('path');
var fs = require("fs");
var AsyncFs= require('../util/async-fs');

var xtpl = require('xtpl');

module.exports={
    
    getGenTableById:async (id)=> {
        console.log("getUserById");
        return await GenTable.findOne({
          where: {
            id
          }
        })
    },
    getGenTableByName:async (username)=>{
        return await GenTable.findOne({
            where: {
              username
            }
          })
    },
    getList:async (pageSize=10,pageNum,searchParams)=>{

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
        name:obj.name,
        class_name:obj.class_name,
        parent_table:obj.parent_table,
        parent_table_fk:obj.parent_table_fk,
        attrs:obj.attrs,
        sync:'0',
        create_date:new Date(),
        update_date:new Date(),
        remarks:obj.remarks,
        db_id:obj.db_id,
        db_name:obj.db_name,
        type:obj.type,
        module_name:obj.module_name,
        buttons:obj.buttons
      })
    },
    deleteById:async (id)=>{

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
      o.type=obj.type;
      o.class_name=obj.class_name;
      o.parent_table=obj.parent_table;
      o.parent_table_fk=obj.parent_table_fk;
      o.attrs=obj.attrs;
      o.remarks=obj.remarks;
      o.sync=obj.sync;
      o.db_id=obj.db_id;
      o.db_name=obj.db_name;
      o.module_name=obj.module_name;
      o.buttons=obj.buttons;
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
      if(obj.type){

        o.type=obj.type;
      }
      if(obj.class_name){

        o.class_name=obj.class_name;
      }
      if(obj.parent_table){

        o.parent_table=obj.parent_table;
      }
      if(obj.parent_table_fk){

        o.parent_table_fk=obj.parent_table_fk;
      }
      if(obj.attrs){

        o.attrs=obj.attrs;
      }
      if(obj.remarks){

        o.remarks=obj.remarks;
      }
      if(obj.sync){

        o.sync=obj.sync;
      }
      if(obj.db_name){

        o.db_name=obj.db_name;
      }
      if(obj.db_id){

        o.db_id=obj.db_id;
      }
      if(obj.module_name){
        o.module_name=obj.module_name;
      }
      if(obj.buttons){
        o.module_name=obj.buttons;
      }
      return await o.save();

    },

    generateCode:async (obj)=>{
      var dirpath=path.join(__dirname,'');
      var defpath=path.join(__dirname,'../');
      var abcpath=path.join(__dirname,'../../src/pages/'+obj.table.module_name+"/");
      let reg=require("../router/reg.json")
      obj.reg=reg;
      obj.table.columns=JSON.parse(obj.table.attrs);
      obj.table.buttons=obj.table.buttons?obj.table.buttons:"[]";
      obj.table.buttons=JSON.parse(obj.table.buttons);
      
      let existAdvanceSearch="false";
      obj.table.columns.forEach((item=>{
        if(item.existAdvanceSearch){
          existAdvanceSearch="true";
        }
      }))
      obj.table.existAdvanceSearch=existAdvanceSearch;

      let ret={
        success:1,
        path:{dirpath,defpath,abcpath}
      }

      await AsyncFs.makeDirs(abcpath).then((result) => {
        console.log("makeDir success");
      }).catch((err) => {
        ret.success=0;
        ret.err=err;
      });

      var xtplPath=path.join(__dirname,'../xtpl/'+obj.config.list_vue);

      let fileSubName=obj.table.name;
      fileSubName=fileSubName.replace(/\_/g,"-");
      fileSubName=fileSubName.replace(obj.config.tablePrefix,"");
      obj.fileSubName=fileSubName;
      
      let attrsName=obj.table.name.replace(obj.config.tablePrefix,"");

      //大写处理

      obj.reg.list[obj.table.module_name+"-"+fileSubName]={
        fileSubName:fileSubName,
        moduleName:obj.table.module_name,
        attrsName:attrsName
      }
      let regArray=[];
      Object.keys(obj.reg.list).forEach(function(key){
        regArray.push(obj.reg.list[key]);
      })
      obj.reg.regArray=regArray;
      obj.keyname="id";//主键设置
      
      await new Promise((resolve, reject) => {
        xtpl.renderFile(xtplPath,{
          obj:obj,
          columns:[{id:0},{id:1}]
        },async function(error,content){
            if(error)
            {
                console.log(error);
                ret.generate={
                  success:0,
                  err:error    
                }
                reject(error)
            }
            console.log(content);
            let fileName=obj.table.name+".vue";
            fileName=fileName.replace(/\_/g,"-");
            fileName=fileName.replace(obj.config.tablePrefix,"");
            abcpath=abcpath+fileName;
            await AsyncFs.writeFile(abcpath,content).then((result)=>{
              console.log("writeFile success");
              ret.generate={
                success:1,
              }
              resolve();
            }).catch((err)=>{
                console.log(err);
                ret.generate={
                    success:0,
                    err:err    
                }
                reject(error)
            })
            ret.content=content;
        });
      })

      xtplPath=path.join(__dirname,'../xtpl/'+obj.config.add_or_update);

      await new Promise((resolve, reject) => {
        xtpl.renderFile(xtplPath,{
          obj:obj,
          columns:[{id:0},{id:1}]
        },async function(error,content){
            if(error)
            {
                console.log(error);
                ret.generate={
                  success:0,
                  err:error    
                }
                reject(error)
            }
            console.log(content);
            let fileName=obj.table.name+"-add-or-update.vue";
            fileName=fileName.replace(/\_/g,"-");
            fileName=fileName.replace(obj.config.tablePrefix,"");
            abcpath=path.join(__dirname,'../../src/pages/'+obj.table.module_name+"/");
            abcpath=abcpath+fileName;
            await AsyncFs.writeFile(abcpath,content).then((result)=>{
              console.log("writeFile success");
              ret.generate={
                success:1,
              }
              resolve();
            }).catch((err)=>{
                console.log(err);
                ret.generate={
                    success:0,
                    err:err    
                }
                reject(error)
            })
            ret.content=content;
        });
      })


      xtplPath=path.join(__dirname,'../xtpl/'+obj.config.schema);

      await new Promise((resolve, reject) => {
        xtpl.renderFile(xtplPath,{
          obj:obj,
          columns:[{id:0},{id:1}]
        },async function(error,content){
            if(error)
            {
                console.log(error);
                ret.generate={
                  success:0,
                  err:error    
                }
                reject(error)
            }
            console.log(content);
            let fileName=obj.table.name+".js";
            fileName=fileName.replace(/\_/g,"-");
            fileName=fileName.replace(obj.config.tablePrefix,"");
            abcpath=path.join(__dirname,'../schema/'+obj.table.module_name+"/");

            await AsyncFs.makeDirs(abcpath).then((result) => {
              console.log("makeDir success");
            }).catch((err) => {
              ret.success=0;
              ret.err=err;
            });
            abcpath=abcpath+fileName;
            await AsyncFs.writeFile(abcpath,content).then((result)=>{
              console.log("writeFile success");
              ret.generate={
                success:1,
              }
              resolve();
            }).catch((err)=>{
                console.log(err);
                ret.generate={
                    success:0,
                    err:err    
                }
                reject(error)
            })
            ret.content=content;
        });
      })


      xtplPath=path.join(__dirname,'../xtpl/'+obj.config.service);

      await new Promise((resolve, reject) => {
        xtpl.renderFile(xtplPath,{
          obj:obj
        },async function(error,content){
            if(error)
            {
                console.log(error);
                ret.generate={
                  success:0,
                  err:error    
                }
                reject(error)
            }
            console.log(content);
            let fileName=obj.table.name+"-service.js";
            fileName=fileName.replace(/\_/g,"-");
            fileName=fileName.replace(obj.config.tablePrefix,"");
            abcpath=path.join(__dirname,'../service/'+obj.table.module_name+"/");

            await AsyncFs.makeDirs(abcpath).then((result) => {
              console.log("makeDir success");
            }).catch((err) => {
              ret.success=0;
              ret.err=err;
            });
            abcpath=abcpath+fileName;
            await AsyncFs.writeFile(abcpath,content).then((result)=>{
              console.log("writeFile success");
              ret.generate={
                success:1,
              }
              resolve();
            }).catch((err)=>{
                console.log(err);
                ret.generate={
                    success:0,
                    err:err    
                }
                reject(error)
            })
            ret.content=content;
        });
      })

      xtplPath=path.join(__dirname,'../xtpl/'+obj.config.controller);

      await new Promise((resolve, reject) => {
        xtpl.renderFile(xtplPath,{
          obj:obj
        },async function(error,content){
            if(error)
            {
                console.log(error);
                ret.generate={
                  success:0,
                  err:error    
                }
                reject(error)
            }
            console.log(content);
            let fileName=obj.table.name+"-controller.js";
            fileName=fileName.replace(/\_/g,"-");
            fileName=fileName.replace(obj.config.tablePrefix,"");
            abcpath=path.join(__dirname,'../router/'+obj.table.module_name+"/");

            await AsyncFs.makeDirs(abcpath).then((result) => {
              console.log("makeDir success");
            }).catch((err) => {
              ret.success=0;
              ret.err=err;
            });
            abcpath=abcpath+fileName;
            await AsyncFs.writeFile(abcpath,content).then((result)=>{
              console.log("writeFile success");
              ret.generate={
                success:1,
              }
              resolve();
            }).catch((err)=>{
                console.log(err);
                ret.generate={
                    success:0,
                    err:err    
                }
                reject(error)
            })
            ret.content=content;
        });
      })



      if(ret.success==1 && ret.generate.success==1){

          xtplPath=path.join(__dirname,'../xtpl/'+obj.config.node_router);

          await new Promise((resolve, reject) => {
            xtpl.renderFile(xtplPath,{
              obj:obj
            },async function(error,content){
                if(error)
                {
                    console.log(error);
                    ret.generate={
                      success:0,
                      err:error    
                    }
                    reject(error)
                }
                console.log(content);
                let fileName="index.js";
                fileName=fileName.replace(/\_/g,"-");
                fileName=fileName.replace(obj.config.tablePrefix,"");
                abcpath=path.join(__dirname,'../router/');

                abcpath=abcpath+fileName;
                await AsyncFs.writeFile(abcpath,content).then((result)=>{
                  console.log("writeFile success");
                  ret.generate={
                    success:1,
                  }
                  resolve();
                }).catch((err)=>{
                    console.log(err);
                    ret.generate={
                        success:0,
                        err:err    
                    }
                    reject(error)
                })
                ret.content=content;
            });
          })

          //保存reg.json
          if(ret.success==1 && ret.generate.success==1){
            await new Promise((resolve, reject) => {
              let fileName="reg.json";
              abcpath=path.join(__dirname,'../router/');
              abcpath=abcpath+fileName;
              let regStr=JSON.stringify(obj.reg);
              AsyncFs.writeFile(abcpath,regStr).then((result)=>{
                ret.generate={
                  success:1,
                }
                resolve();
              }).catch((err)=>{
                ret.generate={
                    success:0,
                    err:err    
                }
                reject(error)
              })
            })
            

          }
        
      }
      
      console.log("ret");
      return ret;
    }
    
}
