/**
 * Module dependencies.
 */

var fs = require('fs'), stdin = process.stdin, stdout = process.stdout, stats = [];
//  fs.readdir(__dirname, function (err, files) {
//    console.log(files);
//  } );

fs.readdir(process.cwd(), function (err, files) {
  console.log(' ');     //输出友好 输出空行
  if (!files.length) {
    return console.log('    \033[31m No files to show!\033[39m\n '); //文本红色
  }

  console.log('    选择需要查看的目录或文件\n ');

  // function file(i) {        //第一种异步流控制模式：串行执行
  //   var filename = files[i];

  //   fs.stat(__dirname + '/' + filename, function (err, stat) { //fs.stat给出文件或目录的元数据
  //     if (stat.isDirectory()) {
  //       console.log('    ' + i + '  \033[36m' + filename + '\033[39m');
  //     } else {
  //       console.log('    ' + i + '  \033[90m' + filename + '\033[39m');
  //     }
  //     //流控制的核心部分
  //     i++;
  //     if(i == files.length) {
  //       console.log(' ');
  //       process.stdout.write('    \033[33m键入你的选择：\033[39m');//process无需换行
  //       process.stdin.resume();//等待用户输入
  //       //process.stdin,setEncoding('utf8'); 设置流编码 支持特殊字符
  //     } else {
  //       file(i);
  //     }
  //   } );
  // }
//重构
  function file(i) {
    var filename = files[i];

    fs.stat(__dirname + '/' + filename, function (err, stat) {
      stats[i] = stat;
      if (stat.isDirectory()) {
        console.log('      ' + i + '  \033[36m' + filename + '\033[39m');
      } else {
        console.log('      ' + i + '  \033[90m' + filename + '\033[39m');
      }


      if (++i == files.length) {
        read();
      } else {
        file(i);
      }
    });
  }

  function read() {
    console.log(' ');
    stdout.write('    \033[33m键入你的选择：\033[39m');
    stdin.resume();
    stdin.setEncoding('utf8');

    stdin.on('data', option); //检查输入是否符合数组下标
  }
  //读取文件
  function option(data) {
    var filename = files[Number(data)];
    if (!filename) {
      stdout.write('    \033[31m键入你的选择：\033[39m');
    } else {
      stdin.pause();//暂停流（回到默认状态），以便做完fs操作后顺利推退出
      if (stats[Number(data)].isDirectory()) {
        fs.readdir(__dirname + '/' + filename, function (err, files) {
          console.log(' ');
          console.log('    (' + files.length + ' files');
          files.forEach(function (file) {
            console.log('      -  ' + file);
          });
          console.log(' ');
        });
      } else {
        fs.readFile(__dirname + '/' + filename, 'utf8',  function (err, data) {//实现指定编码
          console.log(' ');
          console.log('\033[90m' + data.replace(/(.*)/g, '     $1') + '\033[39m');//正则表达式实现辅助缩进 $1 :与 regexp 中的第1个子表达式相匹配的文本。
        });
      }
    }
  }

  file(0);
});




