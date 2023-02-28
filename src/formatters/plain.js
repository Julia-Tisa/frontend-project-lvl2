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
  const property = `${path}${key}`;
  switch (type) {
    case 'root':
      return `${tree.flatMap((entity) => plain(entity)).join('\n')}`;
    case 'nested':
      return children.flatMap((child) => plain(child, `${property}.`)).join('\n');
    case 'added':
      return `Property '${property}' was added with value: ${stringify(value)}`;
    case 'removed':
      return `Property '${property}' was removed`;
    case 'changed':
      return `Property '${property}' was updated. From ${stringify(oldValue)} to ${stringify(value)}`;
    case 'unchanged':
      return [];
    default:
      throw new Error(`Unknown type: ${type}`);
  }
};

export default plain;
