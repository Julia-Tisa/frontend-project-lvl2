import stylish from './stylish.js';
import plain from './plain.js';

const formatter = (trees, format = 'stylish') => {
  if (format === 'stylish') {
    return stylish(trees);
  }
  if (format === 'plain') {
    return plain(trees);
  }
  return JSON.stringify(trees);
};

export default formatter;
