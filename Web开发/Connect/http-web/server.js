/**
 * 模块依赖
 */

var http = require('http'), fs = require('fs');

/**
 * 创建服务器
 */

var server = http.createServer(function (req, res) {
  //...
  if ('GET' == req.method && '/images' == req.url.substr(0, 7) && '.jpg' == req.url.substr(-4)) {
    fs.stat(__dirname + req.url, function (err, stat) {
      if (err || !stat.isFile()) {
        res.writeHead(404);
        res.end('NOT FOUND');
        return;
      }
      serve(__dirname + req.url, 'applocation/jpg');
    })
  } else if ('GET' == req.method && '/' == req.url) {
    serve(__dirname + '/index.html', 'text/html');
  } else {
    res.writeHead(404);
    res.end('NOT FOUND');
  }

  function serve(path, type) {
    res.writeHead(200, { 'Content-Type': type });
    fs.createReadStream(path).pipe(res);//将文件系统流接（pipe）到HTTP响应流中
  }
  /**
   * 上述函数相当于fs.createReadStream(path)
   * .on('data', function(data){
   * res.write(data);
   * })
   * .on('end', function(){
   * res.end();
   * })
   * 实现静态文件托管功能
   */
});

/**
 * 监听
 */

server.listen(3000);