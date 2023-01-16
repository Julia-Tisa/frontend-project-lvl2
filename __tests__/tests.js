import { test, expect } from '@jest/globals';
import fs from 'fs';
import path from 'path';
import genDiff from '../src/index.js';

const getFullPath = (filepath) => path.resolve(process.cwd(), '__fixtures__', filepath);
const readFile = (filepath) => fs.readFileSync(getFullPath(filepath), 'utf-8');

const filepathJson1 = getFullPath('file1.json');
const filepathJson2 = getFullPath('file2.json');
const filepathYaml1 = getFullPath('file1.yaml');
const filepathYaml2 = getFullPath('file2.yml');

const resultStylish = readFile('resultFileStylish.txt');
const resultPlain = readFile('resultFilePlain.txt');
const resultJson = readFile('resultFileJson.txt');

test.each([
  [filepathJson1, filepathJson2, resultStylish],
  [filepathYaml1, filepathYaml2, resultStylish],
  [filepathJson1, filepathYaml2, resultStylish],
])('%s, %s', (a, b, expected) => {
  expect(genDiff(a, b, 'stylish')).toBe(expected);
});

test.each([
  [filepathJson1, filepathJson2, resultPlain],
  [filepathYaml1, filepathYaml2, resultPlain],
  [filepathYaml1, filepathJson2, resultPlain],
])('%s, %s', (a, b, expected) => {
  expect(genDiff(a, b, 'plain')).toBe(expected);
});

test.each([
  [filepathJson1, filepathJson2, resultJson],
  [filepathYaml1, filepathYaml2, resultJson],
  [filepathJson1, filepathYaml2, resultJson],
])('%s, %s', (a, b, expected) => {
  expect(genDiff(a, b, 'json')).toBe(expected);
});
