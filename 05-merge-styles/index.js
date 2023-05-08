const path = require('path');
const fs = require('fs');

const projectDistFolder = path.resolve(__dirname, 'project-dist');
const stylesFolder = path.resolve(__dirname, 'styles');

/*  Создаем bundle.js  */

fs.writeFile(
  path.join(projectDistFolder, 'bundle.css'),
  '',
  (err) => {
    if (err) throw err;
  }
);

/*  Читаем папку styles, находим файлы стилей, передаем их в функцию чтения  */

fs.readdir(
  stylesFolder,
  { withFileTypes: true },
  (err, files) => {
    if (err) throw err;
    let filesArr = [];
    files.forEach(item => {

      if (item.isFile() === true && item.name.slice(-3) === 'css') {
        readFile(item.name);
      }
    })
  })

/*  Считываем информацию файла  */

function readFile(file) {

  fs.readFile(
    path.join(stylesFolder, file),
    'utf-8',
    (err, data) => {
      if (err) throw err;
      addStilesToBundle(data, 'bundle.css');
    }
  );

}

/*  Записываем полученную информацию в результирующий файл (bundle.js)  */

function addStilesToBundle(stylesData, targetFileName) {
  fs.appendFile(
    path.join(projectDistFolder, targetFileName),
    stylesData,
    err => {
      if (err) throw err;
      console.log('Файл был изменен');
    }
  );
}
