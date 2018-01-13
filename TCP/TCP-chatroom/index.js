/**
 * 模块依赖
 */

var net = require('net');

/**
 * 追踪连接数
 */
var count = 0;
var users = {};
/**
 * 创建服务器
 */

var server = net.createServer(function (conn) {
  //handle connection 指定回调函数
  //   console.log('\033[90m   new connection!\033[39m');
  // 
  conn.write('\n > welcome to node-chat!' + '\n > ' + count + ' other people are connected at this time.' + '\n > please write your name and press enter: ');
  count++;

  conn.setEncoding('utf8');

  //代表当前连接的昵称
  var nickname;

  conn.on('data', function (data) {
    //删除回车符
    data = data.replace('\r\n', '');
    if (!nickname) {
      if (users[data]) {
        conn.write('nickname already in use. try again:');
        return;
      } else {
        nickname = data;
        users[nickname] = conn;

        for (var i in users) {
          users[i].write(' \n> ' + nickname + ' joined the room\n');
        }
      }
    }
    console.log(data);

  });



  conn.on('colose', function () {
    count--;
  });
});
/**
 * 监听
 */

server.listen(3000, function () {
  console.log('\033[96m   server listening on *:3000\033[39m');
});