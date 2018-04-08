/**
 * 关于express middleware的示例代码
 */
const express = require('express');
const path = require('path');

const app = express();

const http = require('http');
const cookieParser = require('cookie-parser');
// 1. 应用级
require('./middleware/application')(app);

// 2. 路由级
const router = require('./middleware/router');
// 将路由挂载至应用
app.use('/router', router);

// 3. 错误级别 手动引发一个错误
app.use('/err', (req, res, next) => {
	throw new Error('errorHandler!!!');
});
// 这种错误处理收集，一定要放在你需要处理请求的后面，因为expres是按照加载顺序来的，如果你定义的错误中间件，放到最前才加载，是无效的
require('./middleware/err')(app);

// 4. 内置模块
const options = {
	dotfiles: 'ignore',
	etag: false,
	extensions: ['htm', 'html'],
	index: false,
	maxAge: '1d',
	redirect: false,
	setHeaders(res, path, stat) {
		res.set('x-timestamp', Date.now());
	},
};
const staticPath = path.join(__dirname, './static');
app.use(express.static(staticPath, options));

// 5. 第三方模块
app.use(cookieParser());
app.use(require('./middleware/third'));

const server = http.createServer(app);

server.listen(8088);

server.on('error', (error) => {
	console.log(error);
});

server.on('listening', () => {
	const addr = server.address();
	const bind =
        typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
	console.log(`Listening on ${bind}`);
});
