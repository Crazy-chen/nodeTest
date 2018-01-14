require('http').request({   //初始化一个新的http.Client Request对象
  host: '127.0.0.1',
  port: 3000,
  url: '/',
  method: 'GET'
}, function (res) {
  var body = '';
  res.setEncoding('utf8');
  res.on('data', function (chunk) {
    body += chunk;
  });
  res.on('end', function () {
    console.log('\n We got : \033[96m' + body + '\033[39m\n');
  });
}).end();//在创建完一个请求后，在发送服务器之前还可以和request对象进行交互