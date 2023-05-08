const path = require('path');
const fs = require('fs');
const sourceFolder = path.join(__dirname, 'files');


fs.mkdir(path.join(__dirname, 'files-copy'),
  { recursive: true }, (err) => {
    if (err) {
      return console.error(err);
    }
  });

const copyFolder = path.join(__dirname, 'files-copy');

fs.readdir(
  sourceFolder, (err, files) => {
    if (err) throw err;
    copyFiles(files);
  })

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
}

