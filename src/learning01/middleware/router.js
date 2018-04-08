/**
 * 路由级别的middleware
 */
const express = require('express');

const router = express.Router();

// 对所有的请求都会执行
router.use((req, res, next) => {
	console.log('router Time:', Date.now());
	// 请求下一个中间件
	next();
});

// 处理特定【请求路径】，挂载至 /user/:id 的中间件，任何指向 /user/:id 的请求都会执行它
router.use('/user/:id', (req, res, next) => {
	console.log('router Request Type:', req.method);
	next();
});

// 处理特定【请求方法】，路由和句柄函数(中间件系统)，处理指向 /user/:id 的 GET 请求
router.get('/user/:id', (req, res, next) => {
	// 和上面的区别在于，只有get时候才会指向下面的这个请求
	console.log('router Request Type2:', req.method);
	res.send('router USER');
});

module.exports = router;
