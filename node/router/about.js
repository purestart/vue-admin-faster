const { query } = require('../config/async-db')
const about = async ctx => {

    let result="失败";

    let sql = 'DROP TABLE IF EXISTS `person`'
    let ret0 = await query( sql );

    let sql1 = "CREATE TABLE person(id int,user varchar(255),password varchar(255),username varchar(255),age int DEFAULT NULL COMMENT '年龄')";
    let ret1 = await query( sql1 );
  
    ctx.response.body = ret1;
    

};
module.exports = about;
