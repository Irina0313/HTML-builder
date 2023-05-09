
const path = require('path');
const fs = require('fs');
const sourceFolder = path.join(__dirname, 'files');

fs.readdir(
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

  });



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
}
