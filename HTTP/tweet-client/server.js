require('http').createServer(function (req, res) {
  res.writeHead(200);
  res.end('Hello Chenmin');
}).listen(3000);