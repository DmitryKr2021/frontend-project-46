import { test, expect } from '@jest/globals';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import genDiff from '../src/formatters/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const file1Json = getFixturePath('file1.json');
const file2Json = getFixturePath('file2.json');
const file1Yml = getFixturePath('file1.yml');
const file2Yml = getFixturePath('file2.yml');

test.each([
  {
    file1Json, file2Json, format: undefined, expected: fs.readFileSync(getFixturePath('resultStylish.txt'), 'utf-8'),
  },
  {
    file1Json, file2Json, format: 'plain', expected: fs.readFileSync(getFixturePath('resultPlain.txt'), 'utf-8'),
  },
  {
    file1Json, file2Json, format: 'json', expected: fs.readFileSync(getFixturePath('resultJson.txt'), 'utf-8'),
  },
  {
    file1Yml, file2Yml, format: undefined, expected: fs.readFileSync(getFixturePath('resultStylish.txt'), 'utf-8'),
  },
  {
    file1Yml, file2Yml, format: 'plain', expected: fs.readFileSync(getFixturePath('resultPlain.txt'), 'utf-8'),
  },
  {
    file1Yml, file2Yml, format: 'json', expected: fs.readFileSync(getFixturePath('resultJson.txt'), 'utf-8'),
  },
])('compare', ({
  format, expected,
}) => {
  expect(genDiff(file1Json, file2Json, format)).toBe(expected);
  expect(genDiff(file1Yml, file2Yml, format)).toBe(expected);
});
