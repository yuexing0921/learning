/**
 * 关于middleware的示例代码
 */
const express = require('express');

const app = express();

const http = require('http');

// 1. 应用级
require('./middleware/application')(app);

// 2. 路由级
const router = require('./middleware/router');
// 将路由挂载至应用
app.use('/router', router);

const server = http.createServer(app);

server.listen(8088);

server.on('error', (error) => {
  console.log(error);
});

server.on('listening', () => {
  const addr = server.address();
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
  console.log(`Listening on ${bind}`);
});
