//var stream = fs.createReadStream('my-file.txt');
var fs = require('fs');
//获取工作目录下的所有文件
var files = fs.readdirSync(process.cwd());
files.forEach(function(file) {
  //监听后缀为css的文件
  if(/\.css/.test(file)) {
    fs.watchFile(process.cwd() + '/' + file, function(){
      console.log(' - ' + file + ' 被改动！');
    });
  }
});