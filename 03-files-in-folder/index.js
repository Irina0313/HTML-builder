const path = require('path');
const fs = require('fs');
const promises = require('fs/promises');
const targetFolder = path.join(__dirname, 'secret-folder')

promises.readdir(targetFolder)
  .then(
    result => {
      result.forEach(item => {
        let way = path.join(targetFolder, item);
        fs.stat(way, (err, data) => {
          if (err) throw err;
          if (!data.isDirectory()) {
            console.log(`${path.parse(way).name} - ${path.extname(way).slice(1)} - ${data.size / 1024} kb`)
          }
        })
      })

    },
    err => console.log(err)
  )










