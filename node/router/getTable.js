const { query } = require('../config/async-db')
const about = async ctx => {

    let result="失败";

    let sql = "select IS_NULLABLE nullAble, column_name columnName,CHARACTER_MAXIMUM_LENGTH maxLength, data_type dataType, column_comment columnComment, column_key columnKey, extra from information_schema.columns where table_name = 'mytable' and table_schema = (select database()) order by ordinal_position"
    let ret0 = await query( sql );
  
  ctx.response.body = JSON.stringify(ret0);


};
module.exports = about;
