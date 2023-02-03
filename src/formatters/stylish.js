import _ from 'lodash';

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

const stylish = (node, depth = 1) => {
  const symbols = {
    unchanged: ' ',
    removed: '-',
    added: '+',
  };
  const {
    tree, key, type, value, oldValue, children,
  } = node;
  switch (type) {
    case 'root':
      return `{\n${tree.flatMap((entity) => stylish(entity)).join('\n')}\n}`;
    case 'unchanged':
      return `${makeIndent(depth)}${symbols[type]} ${key}: ${stringify(value, depth)}`;
    case 'added':
      return `${makeIndent(depth)}${symbols[type]} ${key}: ${stringify(value, depth)}`;
    case 'removed':
      return `${makeIndent(depth)}${symbols[type]} ${key}: ${stringify(value, depth)}`;
    case 'changed':
      return [
        `${makeIndent(depth)}${symbols.removed} ${key}: ${stringify(oldValue, depth)}`,
        `${makeIndent(depth)}${symbols.added} ${key}: ${stringify(value, depth)}`,
      ];
    case 'nested':
      return `${makeIndent(depth)}  ${key}: {\n${children.flatMap((child) => stylish(child, depth + 1)).join('\n')}\n${makeIndent(depth)}  }`;
    default:
      throw new Error(`Unknown type: ${type}`);
  }
};

export default stylish;
