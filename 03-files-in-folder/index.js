const path = require('path');
const fs = require('fs');
const targetFolder = path.join(__dirname, 'secret-folder')

const files = fs.readdir(
  targetFolder,
  { withFileTypes: true },
  (err, files) => {
    if (err) throw err;
    let result = [];
    files.forEach(item => {
      if (item.isFile() === true) {
        let name = item.name.split('.')[0]
        result.push(name);

        let way = path.resolve(targetFolder, item.name);
        let extname = path.extname(way);
        result.push(extname.slice(1));

        function getFilesizeInBytes(filename) {
          let stats = fs.statSync(filename);
          let fileSizeInBytes = stats.size / 1000;
          return fileSizeInBytes;
        }
        let size = String(getFilesizeInBytes(way));
        result.push(`${size}kb`);
      }
    })

    let resultStr = '';

    result.forEach((el, i) => {
      if (i !== result.length - 1 && el.slice(-2) !== 'kb') {
        resultStr += `${el} - `
      }
      if (i !== result.length - 1 && el.slice(-2) === 'kb') {
        resultStr += `${el}\n`
      }
      if (i === result.length - 1 && el.slice(-2) !== 'kb') {
        resultStr += `${el}`
      }
      if (i === result.length - 1 && el.slice(-2) === 'kb') {
        resultStr += `${el}\n`
      }
    })
    console.log(resultStr);
  }
);





