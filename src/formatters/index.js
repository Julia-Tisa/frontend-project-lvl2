import stylish from './stylish.js';
import plain from './plain.js';

const formatter = (mainTree, format = 'stylish') => {
  if (format === 'stylish') {
    return stylish(mainTree);
  }
  if (format === 'plain') {
    return plain(mainTree);
  }
  return JSON.stringify(mainTree.tree);
};

export default formatter;
