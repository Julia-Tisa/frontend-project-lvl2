import path from 'path';
import fs from 'fs';
import _ from 'lodash';

const getFullPath = (filepath) => path.resolve(process.cwd(), '__fixtures__', filepath);
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
      if (!Object.hasOwn(obj1, key) && Object.hasOwn(obj2, key)) { return { key, type: 'added', value: value2 }; }
      if (Object.hasOwn(obj1, key) && !Object.hasOwn(obj2, key)) { return { key, type: 'removed', value: value1 }; }
      if (value1 === value2) { return { key, type: 'unchanged', value: value1 }; }
      return {
        key, type: 'changed', value: value2, oldValue: value1,
      };
    });
    return nodes;
  };
  const makeIndent = (depth) => {
    const str = ' ';
    return str.repeat(depth * 4 - 2);
  };
  
  const stringify = (value, depth = 1) => {
    if (!_.isObject(value)) {
      return value;
    }
    const valueKeys = Object.keys(value);
    const mapKeys = valueKeys.map((key) => `${makeIndent(depth + 1)}  ${key}: ${stringify(value[key], depth + 1)}`);
    return `{\n${mapKeys.join('\n')}\n  ${makeIndent(depth)}}`;
  };
  
  const stylish = (diff) => {
    const symbols = {
      unchanged: ' ',
      removed: '-',
      added: '+',
    };
    const iter = (node, depth = 1) => {
      const {
        key, type, value, oldValue, children,
      } = node;
      switch (type) {
        case 'unchanged':
        case 'added':
        case 'removed':
          return `${makeIndent(depth)}${symbols[type]} ${key}: ${stringify(value, depth)}`;
        case 'changed':
          return [
            `${makeIndent(depth)}${symbols.removed} ${key}: ${stringify(oldValue, depth)}`,
            `${makeIndent(depth)}${symbols.added} ${key}: ${stringify(value, depth)}`,
          ];
        case 'nested':
          return `${makeIndent(depth)}  ${key}: {\n${children.flatMap((child) => iter(child, depth + 1)).join('\n')}\n${makeIndent(depth)}  }`;
        default:
          throw new Error(`Unknown type: ${type}`);
      }
    };
    const result = diff.flatMap((node) => iter(node));
    return `{\n${result.join('\n')}\n}`;
  };

const genDiff = (filepath1, filepath2) => {
const file1 = JSON.parse(fs.readFileSync(getFullPath(filepath1), 'utf-8'));
const file2 = JSON.parse(fs.readFileSync(getFullPath(filepath2), 'utf-8'));
const futer = buildTree(file1, file2);
return stylish(futer);
}
export default genDiff;