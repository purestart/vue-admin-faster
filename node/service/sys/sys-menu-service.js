
const sequelize=require('../../conmon/mysql');
const Sequelize = require('sequelize');
const GenTable = require('../../schema/sys/sys-menu')(sequelize,Sequelize); // 引入user的表结构
var uuid = require('node-uuid');

var path=require('path');
var fs = require("fs");
var AsyncFs= require('../../util/async-fs');

var xtpl = require('xtpl');

var SysMenuService={
    
    info:async (menu_id)=> {
        return await GenTable.findOne({
          where: {
            menu_id
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
    getNavMenuList:async()=>{
      //查询根菜单列表
      let navList=await SysMenuService.queryNavListParentId(0);

      //递归获取子菜单
      //let ret=SysMenuService.getMenuTreeList(navList);
      return navList;
    },
    getMenuTreeList:async (navList)=>{
      if(!navList || navList.length==0){
        return [];
      }else{
        let temNav=JSON.parse(JSON.stringify(navList));

        // let temNav= navList;
         await new Promise(async (resolve, reject) => {
           await navList.forEach(async (item,index)=>{
             if(item.type!==2){
               let sunNavs=await SysMenuService.queryNavListParentId(item.menu_id);
               let children=await SysMenuService.getMenuTreeList(sunNavs);
               
               temNav[index].children=children;
               console.log("---children---"+JSON.stringify(sunNavs));
               //console.log("---children--111---"+JSON.stringify(children));
               console.log(JSON.stringify(item));
   
               if(navList.length==index+1){
                 console.log("Promise完成");
                 resolve();
               }
   
             }
   
           })
         })
         console.log("navList返回");
         return temNav;
      }
     
    },
    queryNavListParentId:async(parent_id)=>{
      let searchParams={
        parent_id
      }
      let list= await GenTable.findAll({
        where:searchParams,
        order: [['order_num', 'ASC']],
      });

      let tmpList=[];

      for(let i=0;i<list.length;i++){
        let item=list[i];

        if(item.type!==2){
          let children=await SysMenuService.queryNavListParentId(item.menu_id);
          let tmp_item={
            menu_id:item.menu_id,
            order_num:item.order_num,
            parent_id:item.parent_id,
            name:item.name,
            url:item.url,
            perms:item.perms,
            type:item.type,
            icon:item.icon,
            spread:item.spread,
            children:children
          }
          tmpList.push(tmp_item);
        }else{
          let tmp_item={
            menu_id:item.menu_id,
            order_num:item.order_num,
            parent_id:item.parent_id,
            name:item.name,
            url:item.url,
            perms:item.perms,
            type:item.type,
            icon:item.icon,
            spread:item.spread,
            children:[]
          }
          tmpList.push(tmp_item);
        }
      }

      return tmpList;
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
        order: [['order_num', 'ASC']],
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

          parent_id:obj.parent_id,
          name:obj.name,
          url:obj.url,
          perms:obj.perms,
          type:obj.type,
          icon:obj.icon,
          spread:obj.spread,
          order_num:obj.order_num,
          
      })
    },
    delete:async (id)=>{

      var o = await GenTable.findOne({
          where: {
            menu_id: id
          }
      });

      return await o.destroy();

    },
    update:async (obj)=>{
      var o = await GenTable.findOne({
          where: {
            menu_id: obj.menu_id
          }
      });

       o.update_date = Date.now();
      
        o.menu_id=obj.menu_id;
        
        o.parent_id=obj.parent_id;
        
        o.name=obj.name;
        
        o.url=obj.url;
        
        o.perms=obj.perms;
        
        o.type=obj.type;
        
        o.icon=obj.icon;
        
        o.spread=obj.spread;
        
        o.order_num=obj.order_num;
        
      return await o.save();

    },
    updateExist:async (obj)=>{
      var o = await GenTable.findOne({
          where: {
              id: obj.id
          }
      });

      o.update_date = Date.now();

      
        if(obj.menu_id){
          o.menu_id=obj.menu_id;
        }
        
        if(obj.parent_id){
          o.parent_id=obj.parent_id;
        }
        
        if(obj.name){
          o.name=obj.name;
        }
        
        if(obj.url){
          o.url=obj.url;
        }
        
        if(obj.perms){
          o.perms=obj.perms;
        }
        
        if(obj.type){
          o.type=obj.type;
        }
        
        if(obj.icon){
          o.icon=obj.icon;
        }
        
        if(obj.spread){
          o.spread=obj.spread;
        }
        
        if(obj.order_num){
          o.order_num=obj.order_num;
        }
        
      
      return await o.save();

    }
    
}

module.exports=SysMenuService;
