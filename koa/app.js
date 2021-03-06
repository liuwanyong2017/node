import Koa from "koa";
import InitManager from "./core/init";
import parser from "koa-bodyparser";
import catch_error from "./middlewares/catch-error";
import path from "path";
import accessControl from "./middlewares/access-control-allow-origin";
import koaBody from "koa-body";

const staticPath = require("koa-static");

// import Router from "koa-router";
//
//
// import requireDirectory from "require-directory";


const app = new Koa();

app.use(accessControl);
app.use(catch_error);
app.use(parser());   //构建请求的body的数据，以便于在请求的body处拿到
app.use(koaBody({multipart: true}));


//静态文件处理中间键：static是关键字，所以改变量名为staticPath了。
app.use(
    staticPath(path.join(__dirname, "./static"))
);

//洋葱模型演示：
// app.use((ctx, next) => {
//     console.log(1);
//     const a = next();  //下一个中间键，否则就不会到下一个中间键
//     console.log(a);
//     console.log(12);
// });
// app.use((ctx, next) => {
//     console.log(2);
//     const a = next();
//     console.log(a);
//     console.log(22);
//     return 'ttt'     //返回给next函数，next函数把值强制转换为Promise
// });
// 1
// 2
// test
// Promise { undefined }
// 22
// Promise { 'ttt' }
// 12


// app.use(test);

//next 实质为promise

//以上洋葱模型的解析，重在定制顺序，顺序又跟node的异步结合了，所以中间键函数，经验总结
// 中间键函数都要用async await 强制做成Promise，又跟next的实质为promise正好匹配。


//中间键函数用async ，next函数用await：为了保证洋葱模型的顺序执行！

// app.use((ctx, next) => {
//     console.log(1);
//     next();
//     console.log(12);
// });
//
// app.use((ctx, next) => {
//     console.log(2);
//     next();
//     console.log(22);
// });
//
// app.use( async () => {
//     await new Promise((resolve) => {
//         setTimeout(() => {
//             console.log(21);
//             resolve(3);
//         }, 1200);
//     });
// });

//await 会阻塞线程，锁定当前的执行顺序。这保证了洋葱模式的执行顺序，不被嵌套的异步所打扰！


//await 也是适合拿到异步的操作的最终值，而不是一个promise对象,
// 上面说过，每一个next引导的最终结果都是promise

// app.use(async (ctx, next) => {
//     console.log(1);
//     await next();
//     console.log(12);
//     console.log(ctx.r);
// });
//
// app.use(async (ctx, next) => {
//     console.log(2);
//     ctx.r = await next();
//     console.log(22);
// });
//
// app.use( async () => {
//     return await new Promise((resolve) => {
//         setTimeout(() => {
//             console.log(21);
//             resolve(3);
//         }, 1200);
//     })
// });

// 1
// 2
// 21    阻塞
// 22   阻塞
// 12
// 3

// 路由简单引入
// app.use((ctx, next) => {
//     const {path, method} = ctx;
//     console.log(path, method);
//     if (path === "/" && method === "GET") {   //路由的最基础的演化，太麻烦了
//         ctx.body = {res: "host"};
//     }
// });


//koa-router:
// const router = new Router();
// router.get("/", (ctx, next) => {
//     ctx.body = {res:'hahha'}
// });


//requireDirectory用法
// const whenLoadModule = val => {
//     // console.log(val);
//     for (var key in val){
//         val[key] instanceof Router && app.use(val[key].routes())
//     }
// };
//
//
// requireDirectory(
//     module, "./router",
//     {visit: whenLoadModule}
// );


// app.use(router.routes());
// app.use(classic.routes());
// app.use(book.routes());


InitManager.init(app);


app.listen(3000, () =>
    console.log(3000));
