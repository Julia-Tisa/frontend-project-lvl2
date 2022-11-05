import { test, expect } from '@jest/globals';
import genDiff from '../bin/index.js';
import fs from 'fs';
import path, { format } from 'path'

const getFullPath = (filepath) => path.resolve(process.cwd(), '__fixtures__', filepath);
const readFile = (filepath) => fs.readFileSync(getFullPath(filepath), 'utf-8');

const filepath1 = getFullPath('file1.json');
const filepath2 = getFullPath('file2.json');
const result1 = readFile('resultFileJson.txt');

const filepath3 = getFullPath('file1.yaml');
const filepath4 = getFullPath('file2.yml');
const result2 = readFile('resultFileYaml.txt');

const result3 = readFile('resultFilePlain.txt');

test('test with json', () => {
    expect(genDiff(filepath1, filepath2,'stylish')).toBe(result1);
  });

test('test with yaml', () => {
  expect(genDiff(filepath3, filepath4, 'stylish')).toBe(result2);
});

test('test with plain format', () => {
  expect(genDiff(filepath1, filepath2, 'plain')).toBe(result3);
  expect(genDiff(filepath3,filepath4, 'plain')).toBe(result3);
});