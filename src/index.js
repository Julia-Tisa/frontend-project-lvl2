import path from 'path';
import fs from 'fs';
import parser from './parsers.js';
import formatter from './formatters/index.js';
import buildTree from './buildTree.js';

const getFullPath = (filepath) => path.resolve(process.cwd(), filepath);

const parseFile = (filepath) => {
  const format = filepath.split('.')[1];
  const file = fs.readFileSync(getFullPath(filepath), 'utf-8');
  const resultFile = parser(file, format);
  return resultFile;
};

const genDiff = (filepath1, filepath2, formatOffile) => {
  const parsingFile1 = parseFile(filepath1);
  const parsingFile2 = parseFile(filepath2);
  const mainTree = buildTree(parsingFile1, parsingFile2);

  return formatter(mainTree, formatOffile);
};

export default genDiff;
