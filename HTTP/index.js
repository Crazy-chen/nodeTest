require('http').createServer(function (req, res) {
  console.log(req.headers);
  res.writeHead(200);
  res.end('Hello <b> Chen min </b>');
}).listen(3000);