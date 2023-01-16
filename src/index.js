import path from 'path';
import fs from 'fs';
import parser from './parsers.js';
import formatter from './formatters/index.js';
import buildTree from './buildTree.js';

/*  По поводу функции  getFullPath: она создана так для того, чтобы, если пользователь
передаст абсолютный путь до файла, функция вычленила только название файла
и относительно него построит путь до файла в папке фикстур. Иначе выскакивает такая ошибка:
Error: ENOENT: no such file or directory, open '/Users/yulek/frontend-project-lvl2
/__fixtures__/Users/yulek/frontend-project-lvl2/__fixtures__/file1.json'
и path.resolve никак ее не сглаживает, не использует абсолютный путь вместо
построения нового. Возможно, я как-то не так пользуюсь path.resolve, в
таком случае прошу о более развернутом комментарии, спасибо. И
по поводу того, что указана при построении пути папка фикстур: действительно
вне этой папки файлы не будут работать, мы для этого и создаем папку фикстур,
чтобы знать, куда обращаться за файлами, разве не так?  */

/*  По поводу обертки в объект с типом root, не совсем понятно, что с этим
делать и как это может помочь убрать итеры. На них базируется все построение
вывода текста программы, зачем этот объект передавать в парсер, если парсируется
только начальный файл. Или зачем создавать объект, чтобы потом его опять раскрывать
и взаимодействовать с типами вложенного объекта.Я строила программу,
исходя из испытания нахождения различий в курсе объекты, так что
сложно понять, что предложено сделать */

const getFullPath = (filepath) => {
  const arrFilepath = filepath.split('/');
  const cutFilepath = arrFilepath[arrFilepath.length - 1];
  return path.resolve(process.cwd(), '__fixtures__', cutFilepath);
};
const parseFile = (filepath) => {
  const format = filepath.split('.')[1];
  const file = fs.readFileSync(getFullPath(filepath), 'utf-8');
  const resultFile = parser(file, format);
  return resultFile;
};

const genDiff = (filepath1, filepath2, formatOffile) => {
  const parsingFile1 = parseFile(filepath1);
  const parsingFile2 = parseFile(filepath2);
  const tree = buildTree(parsingFile1, parsingFile2);

  return formatter(tree, formatOffile);
};
export default genDiff;
