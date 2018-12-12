const { query } = require('../../config/async-db-single')
const genTableService = require('../../service/genTableService')
const dbInfoService = require('../../service/dbInfoService')
module.exports =[
    {
        url:"/api/sys/sync-db",
        method:"post",
        function:async ctx=>{
            //const id=ctx.request.query.id;
            let obj = ctx.request.body;
            let attrs=obj.attrs;
            let tableName=obj.name;
            

            let remarks=obj.remarks?obj.remarks:"";
            
            let sql="CREATE TABLE "+tableName+"("
            let primaryKeyStr="";
            attrs.forEach((item,index)=>{
                let emptyStr=item.isEmpty?" DEFAULT NULL":" NOT NULL";
                let incrementStr=item.isAutoIncrement?" AUTO_INCREMENT":"";
                if(index==attrs.length-1){
                    sql=sql+item.name+' '+item.dataType+emptyStr+incrementStr+" COMMENT'"+item.remarks+"'";
                }else{
                    sql=sql+item.name+' '+item.dataType+emptyStr+incrementStr+" COMMENT'"+item.remarks+"'"+',';
                }
                if(item.primaryKey && primaryKeyStr.length==0){
                    primaryKeyStr=",PRIMARY KEY (`"+item.name+"`)"
                }
            })
            sql=sql+primaryKeyStr+")";
            sql=sql+" ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='"+remarks+"'";
            console.log(sql);
            
            let dropSql="DROP TABLE IF EXISTS `"+tableName+"`";

            //获取数据库信息
            let database=await dbInfoService.getDbById(obj.db_id);

           // ctx.response.body=database;

            //return;

            await query( dropSql,database);

            let ret = await query( sql,database);
            //const ret = await genTableService.getDbById(id);
            if(ret){
                let genItem={id:obj.id,sync:1};
                genTableService.updateExist(genItem);

                ctx.response.body = {
                    success:1,
                    data:ret
                };
        
            }else{
                ctx.response.body={
                    success:0,
                    errMsg:"同步失败",
                    data:null
                }
            }
        }
    },
    {
        url:"/api/sys/show-tables",
        method:"get",
        function:async ctx=>{
            const id=ctx.request.query.id;
            
            let database=await dbInfoService.getDbById(id);
            let sql = 'select table_name tableName, engine, table_comment tableComment, create_time createTime from information_schema.tables where table_schema = (select database())'
            let ret = await query( sql ,database);
            if(ret){
                ctx.response.body = {
                    success:1,
                    data:ret
                };
            }else{
                ctx.response.body = {
                    success:0,
                    errMsg:"获取失败",
                    data:null
                };

            }
            
        }
    },
    {
        url:"/api/sys/create-gen-by-table",
        method:"post",
        function:async ctx=>{
            let obj = ctx.request.body;
            let table=obj.table;
            let db=obj.database;
            //获取数据库信息
            let database=await dbInfoService.getDbById(db.id);
            let sql = "select IS_NULLABLE nullAble, column_name columnName,CHARACTER_MAXIMUM_LENGTH maxLength, data_type dataType, column_comment columnComment, column_key columnKey, extra from information_schema.columns where table_name = '"+table.tableName+"' and table_schema = (select database()) order by ordinal_position"
            let ret = await query( sql ,database);

            let attrsObj=[];
            if(ret.length>0){
                
                ret.forEach((item)=>{
                    let attrItem={};
                    if(item.dataType=='bigint' || item.dataType=='tinyint'){
                        item.dataType=='int';
                    }
                    attrItem.name=item.columnName;
                    attrItem.remarks=item.columnComment;
                    attrItem.dataType=item.dataType=='varchar'?'varchar(255)':item.dataType;
                    attrItem.primaryKey=(item.columnKey && item.columnKey=='PRI')?true:false;
                    attrItem.isEmpty=item.nullAble=='NO'?false:true;
                    attrItem.isAutoIncrement=item.extra=='auto_increment'?true:false;
                    attrsObj.push(attrItem);
                })
            }

            let genObj={
                name:table.tableName,
                remarks:table.tableComment,
                type:"single",
                sync:1,
                db_id:database.id,
                db_name:database.name,
                attrs:JSON.stringify(attrsObj)
            }

            const ret1 = await genTableService.create(genObj);
            
            if(ret1){
                ctx.response.body = {
                    success:1,
                    data:ret1
                };
            }else{
                ctx.response.body = {
                    success:0,
                    errMsg:"获取失败",
                    data:null
                };

            }
        }
    }
]