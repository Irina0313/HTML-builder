
//При самопроверке обнаружилось, что папка copy не актуализируется. Переписала код. 
const path = require('path');
const fs = require('fs');
const fsPromises = require('fs/promises');


(async () => {
  try {
    /* Создаем папку-копию  */
    await fsPromises.mkdir(path.join(__dirname, 'files-copy'), { recursive: true });

    /*  Читаем содержимое папки-копии и очищаем ее*/
    const copyFolderValue = await fsPromises.readdir(path.join(__dirname, 'files-copy'));
    for (let item of copyFolderValue) {
      await fsPromises.rm(path.join(__dirname, 'files-copy', item), { force: true });
    }
    /* Сохраняем содержимое исходной папки в переменную  */
    const initValue = await fsPromises.readdir(path.join(__dirname, 'files'));

    /*  Копируем файлы в папку-копию  */
    for (let item of initValue) {
      await fsPromises.copyFile(path.join(__dirname, 'files', item), path.join(__dirname, 'files-copy', item));
    }
  } catch (err) {
    console.log(err);
  }
})();





/*fs.readdir(
  sourceFolder, (err, files) => {
    if (err) throw err;
    if (files.includes('files-copy')) {
      fs.readdir(
        path.join(__dirname, 'files-copy'), (err, files) => {
          if (err) throw err;
          if (files.length > 0) {
            files.forEach(file => {
              fs.unlink(path.join(__dirname, 'files-copy', file), err => {
                if (err) throw err;
              });
            });
          }
        }
      );
    }

  });*/



/*fs.mkdir(path.join(__dirname, 'files-copy'),
  { recursive: true }, (err) => {
    if (err) {
      return console.error(err);
    }
  });*/

/*const copyFolder = path.join(__dirname, 'files-copy');

fs.readdir(
  sourceFolder, (err, files) => {
    if (err) throw err;
    copyFiles(files);
  });

function copyFiles(filesArr) {
  filesArr.forEach(file => {

    let sourseFolderRath = path.resolve(sourceFolder, file);
    let copyFolderRath = path.resolve(copyFolder, file);

    fs.copyFile(sourseFolderRath, copyFolderRath, (err) => {
      if (err) {
        console.error(err)
        return;
      }
    });
  })
}*/
