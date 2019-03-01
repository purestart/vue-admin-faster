
const genTableService = require('../../service/genTableService');
const config=require("../../config/generator-config");

module.exports =[
    {
        url:"/get-gen-table",
        method:"get",
        function:async ctx=>{
            const id=ctx.request.query.id;
            const ret = await genTableService.getDbById(id);
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
        url:"/delete-gen-table",
        method:"get",
        function:async ctx=>{
            const id=ctx.request.query.id;
            try {
                const ret = await genTableService.deleteById(id);
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
        url:"/create-gen-table",
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
        url:"/get-gen-table-list",
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

            const ret = await genTableService.getList(pageSize,pageNum,searchParams);

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
        url:"/update-gen-table",
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
    {
        url:"/generator-code",
        method:"post",
        function:async ctx=>{
            let obj = ctx.request.body;
            obj.config=config;
            const ret = await genTableService.generateCode(obj);
            obj.ret=ret;
            if(obj){

                ctx.response.body = {
                    success:1,
                    data:obj
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