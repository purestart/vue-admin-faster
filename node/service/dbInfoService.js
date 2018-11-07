
const sequelize=require('../conmon/mysql');
const Sequelize = require('sequelize');
const DbInfo = require('../schema/db-info')(sequelize,Sequelize); // 引入user的表结构
var uuid = require('node-uuid');

module.exports={
    
    getDbById:async (id)=> {
        console.log("getUserById");
        return await DbInfo.findOne({
          where: {
            id
          }
        })
    },
    getUserByName:async (username)=>{
        return await DbInfo.findOne({
            where: {
              username
            }
          })
    },
    getList:async (pageSize=10,pageNum,searchParams)=>{

      let total=0;
      total=await DbInfo.count({where : searchParams}, {logging : false});
      console.log(total);
      if(total<1){
        return [];
      }

      let offset=0;
      console.log(pageSize);

      if(pageNum>1){
        offset=(pageNum-1)*pageSize;
      }
      
      let list= await DbInfo.findAll({
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
      return await DbInfo.create({
        id:uuid.v1(),
        name:obj.name,
        type:obj.type,
        host:obj.host,
        user:obj.user,
        password:obj.password,
        port:obj.port,
        create_date:new Date(),
        update_date:new Date(),
        remarks:obj.remarks,
        alias:obj.alias,
      })
    },
    deleteById:async (id)=>{

      var o = await DbInfo.findOne({
          where: {
              id: id
          }
      });

      return await o.destroy();

    },
    update:async (obj)=>{
      var o = await DbInfo.findOne({
          where: {
              id: obj.id
          }
      });

      o.update_date = Date.now();
      o.name=obj.name;
      o.type=obj.type;
      o.host=obj.host;
      o.user=obj.user;
      o.password=obj.password;
      o.port=obj.port;
      o.remarks=obj.remarks;
      o.alias=obj.alias;
      return await o.save();

    }
    
}
