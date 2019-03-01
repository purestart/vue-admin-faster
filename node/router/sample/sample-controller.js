
const genTableService = require('../../service/sample/sample-service');
const config=require("../../config/generator-config");

module.exports =[
    {
        url:"/sample/sample/info/:id",
        method:"get",
        function:async ctx=>{
           // const id=ctx.request.query.id;
            const id=ctx.params.id;
            const ret = await genTableService.info(id);
            if(ret){

                ctx.response.body = {
                    success:1,
                    data:ret
                };
        
            }else{
                ctx.response.body={
                    success:0,
                    data:null,
                    errMsg:"查询错误",
                }
            }
        }
    },
    {
        url:"/sample/sample/delete",
        method:"post",
        function:async ctx=>{
            //const id=ctx.request.query.id;
            //const id=ctx.params.id;
            let ids = ctx.request.body.ids;
            if(ids && ids.length>0){

                try {
                    let ret=null;

                    await new Promise((resolve, reject) => {
                        ids.forEach(async (id,idx)=>{
                             ret = await genTableService.delete(id);
                             if(idx==ids.length-1){
                                 resolve();
                             }
                        })
 
                     })

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
            }else{
                ctx.response.body={
                    success:0,
                    data:null,
                    errMsg:"请传入要删除的id",
                }
            }
            


        }
    },
    {
        url:"/sample/sample/create",
        method:"post",
        function:async ctx=>{
            let obj = ctx.request.body;
            
            const ret = await genTableService.create(obj);

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
        url:"/sample/sample/list",
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

            const ret = await genTableService.list(pageSize,pageNum,searchParams);

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
        url:"/sample/sample/update",
        method:"post",
        function:async ctx=>{
            let obj = ctx.request.body;

            const ret = await genTableService.update(obj);
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
    },
];