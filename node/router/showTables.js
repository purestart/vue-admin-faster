const { query } = require('../config/async-db')
const about = async ctx => {

    let result="失败";

    let sql = 'select table_name tableName, engine, table_comment tableComment, create_time createTime from information_schema.tables where table_schema = (select database())'
    let ret0 = await query( sql );
  
  ctx.response.body = JSON.stringify(ret0);


};
module.exports = about;
