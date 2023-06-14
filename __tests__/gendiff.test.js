import { test, expect } from '@jest/globals';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import genDiff from '../src/formatters/index.js';
import getDiff from '../src/getdiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const jsonDif = getDiff(getFixturePath('file1.json'), getFixturePath('file2.json'));
const ymlDif = getDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'));
const resultExpected = (fileName) => fs.readFileSync(getFixturePath(fileName), 'utf-8');

test.each([
  {
    format: undefined, expected: resultExpected('resultStylish.txt'),
  },
  {
    format: 'plain', expected: resultExpected('resultPlain.txt'),
  },
  {
    format: 'json', expected: resultExpected('resultJson.txt'),
  },
  {
    format: undefined, expected: resultExpected('resultStylish.txt'),
  },
  {
    format: 'plain', expected: resultExpected('resultPlain.txt'),
  },
  {
    format: 'json', expected: resultExpected('resultJson.txt'),
  },
])('compare', ({
  format, expected,
}) => {
  expect(genDiff(jsonDif, format)).toBe(expected);
  expect(genDiff(ymlDif, format)).toBe(expected);
});
