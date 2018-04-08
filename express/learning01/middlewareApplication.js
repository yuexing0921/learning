/**
 * 应用级别的middleware
 */
const express = require('express');
const app = express();

// 对所有的请求都会执行
app.use(function (req, res, next) {
    console.log('Time:', Date.now())
    // 请求下一个中间件
    next() 
});
  
// 处理特定【请求路径】，挂载至 /user/:id 的中间件，任何指向 /user/:id 的请求都会执行它
app.use('/user/:id', function (req, res, next) {
console.log('Request Type:', req.method);
next();
});
  
  // 处理特定【请求方法】，路由和句柄函数(中间件系统)，处理指向 /user/:id 的 GET 请求
  // 和上面的区别在于，只有get时候才会指向下面的这个请求
app.get('/user/:id', function (req, res, next) {
    console.log('Request Type2:', req.method);
    res.send('USER');
});
 
module.exports = app;