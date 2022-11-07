import yaml from 'js-yaml';

const parser = (file1, file2, format1, format2) => {
    const result = [];
    if (format1 === 'json') {
        result.push(JSON.parse(file1));
    }
    if (format1 === 'yaml' || format1 === 'yml') {
        result.push(yaml.load(file1));
    }
    if (format2 === 'json') {
        result.push(JSON.parse(file2));
    }
    if (format2 === 'yaml' || format2 === 'yml') {
        result.push(yaml.load(file2));
    }
    return result;
};

export default parser;