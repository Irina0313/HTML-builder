const fs = require('fs');
const path = require('path');
const { stdin, stdout } = process;

function getMessage() {
  stdin.on('data', (data) => {
    const message = data.toString();
    const text = message.slice(0, -2);


    if (text.length === 0) {
      stdout.write(
        'Ты ничего не написал, мне нечего записывать. Напиши что-нибудь.\n'
      );
    } else if (text === 'exit') {
      process.exit();
    } else {
      fs.appendFile(path.join(__dirname, 'message.txt'), message, (err) => {
        if (err) throw err;
        stdout.write('Записать что-то еще?\n');
      });
    }
  });
}

fs.writeFile(
  path.join(__dirname, 'message.txt'),
  '',
  (err) => {
    if (err) throw err;
    stdout.write('Я готов записать сообщение. Напишите мне что-нибудь\n');
    getMessage();
    process.on('SIGINT', function () {
      process.exit();
    });
  }

);

process.on('exit', function () {
  console.log('Приятно было поработать! Удачи!');
});