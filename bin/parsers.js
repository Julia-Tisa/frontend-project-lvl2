import yaml from 'js-yaml';

const parser = (file1, file2, format) => {
    if (format === 'json') {
        return [JSON.parse(file1), JSON.parse(file2)];
    }
    return [yaml.load(file1), yaml.load(file2)];
};

export default parser;