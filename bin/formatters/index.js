import stylish from "./stylish.js";
import plain from './plain.js';

const formatter = (trees, format = 'stylish') => {
    if (format === 'stylish') {
      return stylish(trees);
    }
    return plain(trees);
  }

export default formatter;