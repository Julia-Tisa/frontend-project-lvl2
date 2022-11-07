import path from 'path';
import fs from 'fs';
import _ from 'lodash';
import parser from './parsers.js';
import formatter from '../formatters/index.js';

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
}
const buildTree = (obj1, obj2) => {
  const keys = [obj1, obj2].flatMap(Object.keys);
  const unionKeys = _.sortBy(_.union(keys));
  const nodes = unionKeys.map((key) => {
    const [value1, value2] = [obj1[key], obj2[key]];
    if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
      return {
        key,
        type: 'nested',
        children: buildTree(value1, value2),
      };
    }
    if (!Object.hasOwn(obj1, key)) { return { key, type: 'added', value: value2 }; }
    if (!Object.hasOwn(obj2, key)) { return { key, type: 'removed', value: value1 }; }
    if (value1 === value2) { return { key, type: 'unchanged', value: value1 }; }
    return {
      key, type: 'changed', value: value2, oldValue: value1,
    };
  });
  return nodes;
};

  const genDiff = (filepath1, filepath2, formatOffile) => {
  const [parsingFile1, parsingFile2] = [filepath1, filepath2].flatMap(parseFile);
  const tree = buildTree(parsingFile1, parsingFile2);

  return formatter(tree, formatOffile);
};
export default genDiff;
