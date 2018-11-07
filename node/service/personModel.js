
const sequelize=require('../conmon/mysql');
const Sequelize = require('sequelize');
const Person = require('../schema/person')(sequelize,Sequelize); // 引入user的表结构


module.exports={
    
    getUserById:async (id)=> {
        console.log("getUserById");
        return await Person.findOne({
          where: {
            id
          }
        })
    },
    getUserByName:async (username)=>{
        return await Person.findOne({
            where: {
              username
            }
          })
    }
    
}
