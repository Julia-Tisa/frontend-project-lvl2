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
  [filepathJson1, filepathJson2, 'stylish', resultStylish],
  [filepathYaml1, filepathYaml2, 'stylish', resultStylish],
  [filepathJson1, filepathYaml2, 'stylish', resultStylish],
  [filepathJson1, filepathJson2, 'plain', resultPlain],
  [filepathYaml1, filepathYaml2, 'plain', resultPlain],
  [filepathYaml1, filepathJson2, 'plain', resultPlain],
  [filepathJson1, filepathJson2, 'json', resultJson],
  [filepathYaml1, filepathYaml2, 'json', resultJson],
  [filepathJson1, filepathYaml2, 'json', resultJson],
])('%s, %s', (file1, file2, style, expected) => {
  expect(genDiff(file1, file2, style)).toBe(expected);
});
