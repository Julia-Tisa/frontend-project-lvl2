import { test, expect } from '@jest/globals';
import genDiff from '../bin';
import fs from 'fs';
import path from 'path'

const getFullPath = (filepath) => path.resolve(process.cwd(), '__fixtures__', filepath);
const readFile = (filepath) => fs.readFileSync(getFullPath(filepath1), 'utf-8');

const filepath1 = getFullPath('file1.json');
const filepath2 = getFullPath('file2.json');
const result1 = readFile('resultFile1.txt');

test('first test', () => {
    expect(genDiff(filepath1, filepath2)).toBe(result1);
  });
