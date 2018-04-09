### express

#### express 简单来说就是一个路由+中间件的web框架，应该是nodejs目前应用最多的web框架，最近一周（20180402-20180408）的下载量在440万以上。

今天主要来学习下express的中间件（[Middleware](http://expressjs.com/en/guide/using-middleware.html)）

#### 一、Middleware的功能
主要是对res和req进行响应或者修改，比如：
- 修改请求
- 拦截请求
- 终结请求

简单来说middleware其实就是一个web系统的插件，它是基于nodejs的Connect中间件的，没有这个middleware，express也能运行的很好，但是有了这个插件接口，那系统就可以很好的扩展其他功能。它就像应用的一道道大门，可以做一系列的应用过滤功能，比如：
- 登录验证
- 权限拦截
- 代理设置
- ...

要把express理解透，不懂它的中间件是不可能搞懂的。

#### 二、Middleware的种类
express中间件官方给出的是总共有以下五种中间件
- 应用级别 =》镶嵌在应用级的中间件，可复用性很低
- 路由级别 =》大体上和应用级别是一样的，只不过通过router对象来加载
- 错误处理级别 =》 和以上两个区别在于，多了一个参数，第一个参数变成了err对象，其他都是一样的
- 内置级别 =》4.x版本只保留了static这个模块，其他的中间件模块都单独打包成一个模块，独立出去发展了,从4.16增加了json、urlencodeed这两个模块
- 第三方 =》 3.x版本的bodyParser、compress、cookieSession等等这些都单独独立成一个模块了
##### 1. 应用级
应用级中间件绑定到 app 对象 使用 app.use() 和 app.METHOD()
```
const app = express()

// 对所有的请求都会执行
app.use(function (req, res, next) {
  console.log('Time:', Date.now())
  // 请求下一个中间件
  next() 
})

// 处理特定【请求路径】，挂载至 /user/:id 的中间件，任何指向 /user/:id 的请求都会执行它
app.use('/user/:id', function (req, res, next) {
  console.log('Request Type:', req.method);
  next();
});

// 处理特定【请求方法】，路由和句柄函数(中间件系统)，处理指向 /user/:id 的 GET 请求
// 和上面的区别在于，只有get时候才会指向下面的这个请求,请求顺序看哪个先挂载就调用哪个
app.get('/user/:id', function (req, res, next) {
  console.log('Request Type2:', req.method);
  res.send('USER');
});
```

##### 2. 路由级

```
const router = express.Router();

// 对所有的请求都会执行
router.use(function (req, res, next) {
    console.log('router Time:', Date.now())
    // 请求下一个中间件
    next() 
});
  
// 处理特定【请求路径】，挂载至 /user/:id 的中间件，任何指向 /user/:id 的请求都会执行它
router.use('/user/:id', function (req, res, next) {
console.log('Request Type:', req.method);
next();
});
  
// 处理特定【请求方法】，路由和句柄函数(中间件系统)，处理指向 /user/:id 的 GET 请求
// 和上面的区别在于，只有get时候才会指向下面的这个请求
router.get('/user/:id', function (req, res, next) {
    console.log('Request Type2:', req.method);
    res.send('USER');
});

// 关键一步 =》将路由挂载至应用
app.use('/router', router);

```

##### 3. 错误处理级别
```
// 这种错误处理收集，一定要放在你需要处理请求的后面，因为expres是按照加载顺序来的，如果你定义的错误中间件，放到最前才加载，是无效的
app.use(function(err, req, res, next) {
		console.error('Something broke!');
		res.status(500).send(err.stack);
});
```

##### 4. 内置级别

1. [express.json](http://expressjs.com/en/4x/api.html#express.json)
2. [express.static](http://expressjs.com/en/4x/api.html#express.static)
3. [express.urlencoded](http://expressjs.com/en/4x/api.html#express.urlencoded)

##### 5. 第三方中间件
单独独立的模块参照[列表](https://github.com/senchalabs/connect#middleware)

如果仔细阅读【应用级】那部分的代码，写一个简单的第三方中间件，是很简单的事情
```
function third(req, res, next) {
    console.log('This is third-party middleware', Date.now());
    // 请求下一个中间件
    next();
}
app.use(third);

```

