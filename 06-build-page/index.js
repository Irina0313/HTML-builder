/* Импортируем модули  */

const path = require('path');
const fs = require('fs');
const fsPromises = require('fs/promises');


const componentsFolderPath = path.join(__dirname, 'components');
const tags = {};


(async () => {
  try {
    await fsPromises.rm(path.join(__dirname, 'project-dist'), { recursive: true, force: true, })
    /*  Создаем папку project-dist */

    await fsPromises.mkdir(path.join(__dirname, 'project-dist'), { recursive: true })

    const projectDistPath = path.join(__dirname, 'project-dist');
    /*  Копируем папку assets */

    const assetsFolder = path.join(__dirname, 'assets');


    async function readAssets(sourseFolderPath, folderName, targetFolderPath) {
      /* Создаем копию папки в project-dist  */
      await fsPromises.mkdir(path.join(targetFolderPath, folderName), { recursive: true })
      const newtargetFolderPath = path.join(targetFolderPath, folderName);
      /* Считываем содержание текущей папки  */
      const currFolderValue = await fsPromises.readdir(sourseFolderPath, { withFileTypes: true })
      /*  Проходимся по каждому диренту и либо копируем файл, либо запускаем рекурсию */
      for (let item of currFolderValue) {
        if (item.isFile()) {
          await fsPromises.copyFile(path.join(sourseFolderPath, item.name), path.join(newtargetFolderPath, item.name))
        } else {
          const newSourcePath = path.join(sourseFolderPath, item.name);
          await readAssets(newSourcePath, item.name, newtargetFolderPath)
        }
      }
    }
    readAssets(assetsFolder, 'assets', projectDistPath);


    /*  Собираем HTML бандл  */


    const initValue = await fsPromises.readFile(path.join(__dirname, 'template.html'), { encoding: 'utf8' })
    let changeValue = initValue;
    /* Читаем папку components  */
    const componentsValue = await fsPromises.readdir(componentsFolderPath, { withFileTypes: true })

    let targetComponentsFiles = [];

    componentsValue.forEach(item => {
      if (item.isFile() && item.name.slice(-5) === '.html') {
        targetComponentsFiles.push(item.name);
      }
    })
    /*  Формируем объект для замены в шаблоне  */
    for (let fileName of targetComponentsFiles) {
      const value = await fsPromises.readFile(path.join(componentsFolderPath, fileName))
      tags[fileName.slice(0, -5)] = value.toString();
    }

    /* Заменяем значения тегов  */
    for (let key in tags) {
      changeValue = changeValue.replace(`{{${key}}}`, tags[key])
    }
    /* Записываем измененный HTML в файл index.html  */
    await fsPromises.writeFile(path.join(projectDistPath, 'index.html'), changeValue)



    /*  Читаем папку styles, находим файлы стилей  */
    const stylesFolder = path.resolve(__dirname, 'styles');
    const stylesFiles = await fsPromises.readdir(
      path.join(__dirname, 'styles'),
      { withFileTypes: true })

    const stilesFilesArr = [];
    stylesFiles.forEach(item => {
      if (item.isFile() === true && item.name.slice(-3) === 'css') {
        stilesFilesArr.push(item.name);
      }
    })

    /* Объединяем файлы стилей в одну переменную  */
    let finalStyles = '';
    for (let file of stilesFilesArr) {
      const value = await fsPromises.readFile(path.join(__dirname, 'styles', file), { encoding: 'utf8' });
      finalStyles = finalStyles + value;
    }
    /*  Создаем файл style.css в папке project-dist  */
    await fsPromises.writeFile(path.join(projectDistPath, 'style.css'), finalStyles);


  }
  catch (err) {
    console.log(err)
  }
})()
















