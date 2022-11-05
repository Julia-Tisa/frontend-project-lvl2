import { test, expect } from '@jest/globals';
import genDiff from '../bin/index.js';
import fs from 'fs';
import path from 'path'

const getFullPath = (filepath) => path.resolve(process.cwd(), '__fixtures__', filepath);
const readFile = (filepath) => fs.readFileSync(getFullPath(filepath), 'utf-8');

const filepathJson1 = getFullPath('file1.json');
const filepathJson2 = getFullPath('file2.json');
const filepathYaml1 = getFullPath('file1.yaml');
const filepathYaml2 = getFullPath('file2.yml');

const resultStylish = readFile('resultFileStylish.txt');
const resultPlain = readFile('resultFilePlain.txt');
const resultJson = readFile('resultFileJson.txt');

test('test with stylish format', () => {
    expect(genDiff(filepathJson1, filepathJson2, 'stylish')).toBe(resultStylish);
    expect(genDiff(filepathYaml1, filepathYaml2, 'stylish')).toBe(resultStylish);
});

test('test with plain format', () => {
  expect(genDiff(filepathJson1, filepathJson2, 'plain')).toBe(resultPlain);
  expect(genDiff(filepathYaml1, filepathYaml2, 'plain')).toBe(resultPlain);
});

test('test with json format', () => {
  expect(genDiff(filepathJson1, filepathJson2, 'json')).toBe(resultJson);
  expect(genDiff(filepathYaml1, filepathYaml2, 'json')).toBe(resultJson);
});