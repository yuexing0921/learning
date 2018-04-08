
const http = require('http');

const app = require("./middlewareApplication");

const server = http.createServer(app);

server.listen(8088);

server.on("error",(error)=>{
  console.log(error);
})

server.on('listening', ()=>{
  const addr = server.address();
  const bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  console.log('Listening on ' + bind);
});