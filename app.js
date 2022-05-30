const http = require('http');
const routes = require('./routes');

//createserver creates a listener
const server = http.createServer(routes.handler);
console.log(routes.someText);

server.listen(3000);