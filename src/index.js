import path from 'path';
import fs from 'fs';
import _ from 'lodash';
import parser from './parsers.js';
import formatter from '../formatters/index.js';

const getFullPath = (filepath) => {
  const arrFilepath = filepath.split('/');
  filepath = arrFilepath[arrFilepath.length - 1];
  return path.resolve(process.cwd(), '__fixtures__', filepath)
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
const format1 = filepath1.split('.')[1];
const format2 = filepath2.split('.')[1];
const file1 = fs.readFileSync(getFullPath(filepath1), 'utf-8');
const file2 = fs.readFileSync(getFullPath(filepath2), 'utf-8');
const [parsingFile1, parsingFile2] = parser(file1, file2, format1, format2);
const futer = buildTree(parsingFile1, parsingFile2);

return formatter(futer, formatOffile);
}
export default genDiff;