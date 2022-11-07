import yaml from 'js-yaml';

const parser = (file, format) => {
switch(format) {
  case 'yaml':
  case 'yml':
    return yaml.load(file);
  case 'json':
    return JSON.parse(file);
  default:
    throw new Error('unknown type of file');
  }
};

export default parser;
