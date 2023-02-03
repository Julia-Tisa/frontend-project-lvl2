import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (_.isString(value)) {
    return `'${value}'`;
  }
  return value;
};

const plain = (node, path = '') => {
  const {
    tree, key, type, value, oldValue, children,
  } = node;
  switch (type) {
    case 'root':
      return `${tree.flatMap((entity) => plain(entity)).join('\n')}`;
    case 'nested':
      return children.flatMap((child) => plain(child, `${path}${key}.`)).join('\n');
    case 'added':
      return `Property '${path}${key}' was added with value: ${stringify(value)}`;
    case 'removed':
      return `Property '${path}${key}' was removed`;
    case 'changed':
      return `Property '${path}${key}' was updated. From ${stringify(oldValue)} to ${stringify(value)}`;
    case 'unchanged':
      return [];
    default:
      throw new Error(`Unknown type: ${type}`);
  }
};

export default plain;
