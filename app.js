const Koa = require('koa');
const bodyParser = require('koa-bodyparser')
const app = new Koa();
const static = require('koa-static');
const path = require('path');
const Router = require('koa-router');
const router = new Router();

const Kcors =require('kcors');

const main =require('./node/router/main');
const about =require('./node/router/about');
const showtables =require('./node/router/showTables');
const getTable =require('./node/router/getTable');
const bdControllers=require('./node/router/db/dbControllers');

const myrouter=require('./node/router/index');
//POST解析
app.use(bodyParser());
// 跨域设置
const corsOptions = {
    'origin': '',
    'credentials': true,
    'maxAge': 3600
  };
app.use(Kcors(corsOptions));

app.use(static(path.resolve(__dirname, "./static")))

// app.use(async (ctx,next) => {
//   await next()
//   ctx.body = 'Hello World22';
// });

router.get('/', main);
router.get('/about', about);
router.get('/show-tables', showtables);
router.get('/get-table', getTable);
//router.get('/get-dbs',bdController);

for(var i in myrouter) {
    myrouter[i].forEach((item)=>{
        if(item.method=='get'){
            router.get(item.url, item.function);
        }else if(item.method=='post'){
            router.post(item.url, item.function);
        }
       
    })
}



app
.use(router.routes())    //吧路由都引入进来
.use(router.allowedMethods());

console.log("listen 8060");
app.listen(8060);
