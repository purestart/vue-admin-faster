
const dbInfoService = require('../../service/dbInfoService')

module.exports =[
    {
        url:"/get-dbs",
        method:"get",
        function:async ctx=>{
            const id=ctx.request.query.id;
            const ret = await dbInfoService.getDbById(id);
            if(ret){

                ctx.response.body = ret;
        
            }else{
                ctx.response.body={
                    code:200,
                    data:null
                }
            }
        }
    },
    {
        url:"/delete-dbs",
        method:"get",
        function:async ctx=>{
            const id=ctx.request.query.id;
            try {
                const ret = await dbInfoService.deleteById(id);
                if(ret){

                    ctx.response.body = {
                        success:1,
                        data:ret
                    };
            
                }else{
                    ctx.response.body={
                        success:0,
                        data:null
                    }
                }
            } catch (error) {

                ctx.response.body={
                    success:0,
                    data:null,
                    errMsg:"no this data",
                }
            }
            


        }
    },
    {
        url:"/create-dbs",
        method:"post",
        function:async ctx=>{
            let obj = ctx.request.body;

            const ret = await dbInfoService.create(obj);
            if(ret){

                ctx.response.body = {
                    success:1,
                    data:ret
                };
        
            }else{
                ctx.response.body={
                    success:0,
                    data:null,
                    errMsg:"创建失败"
                }
            }
        }
    },
    {
        url:"/get-dbs-list",
        method:"get",
        function:async ctx=>{
            const pageSize=ctx.request.query.pageSize?parseInt(ctx.request.query.pageSize):10;
            const pageNum=ctx.request.query.pageNum?parseInt(ctx.request.query.pageNum):1;

            const name=ctx.request.query.name;
            //获取搜索参数
            let searchParams={
                
            };
            if(name && name.length>0){
                searchParams.name=name;
            }

            const ret = await dbInfoService.getList(pageSize,pageNum,searchParams);

            if(ret){

                ctx.response.body = {
                    success:1,
                    data:ret
                };
        
            }else{
                ctx.response.body={
                    success:0,
                    data:null
                }
            }
        }
    },
    {
        url:"/update-dbs",
        method:"post",
        function:async ctx=>{
            let obj = ctx.request.body;

            const ret = await dbInfoService.update(obj);
            if(ret){

                ctx.response.body = {
                    success:1,
                    data:ret
                };
        
            }else{
                ctx.response.body={
                    success:0,
                    data:null,
                    errMsg:"更新失败"
                }
            }
        }
    }
];