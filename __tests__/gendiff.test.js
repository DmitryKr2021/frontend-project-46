import { test, expect } from '@jest/globals';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import genDiff from '../src/formatters/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const file1JsonPath = getFixturePath('file1.json');
const file2JsonPath = getFixturePath('file2.json');
const file1YmlPath = getFixturePath('file1.yml');
const file2YmlPath = getFixturePath('file2.yml');

test.each([
  {
    file1JsonPath, file2JsonPath, format: undefined, expected: fs.readFileSync(getFixturePath('resultStylish.txt'), 'utf-8'),
  },
  {
    file1JsonPath, file2JsonPath, format: 'plain', expected: fs.readFileSync(getFixturePath('resultPlain.txt'), 'utf-8'),
  },
  {
    file1JsonPath, file2JsonPath, format: 'json', expected: fs.readFileSync(getFixturePath('resultJson.txt'), 'utf-8'),
  },
  {
    file1YmlPath, file2YmlPath, format: undefined, expected: fs.readFileSync(getFixturePath('resultStylish.txt'), 'utf-8'),
  },
  {
    file1YmlPath, file2YmlPath, format: 'plain', expected: fs.readFileSync(getFixturePath('resultPlain.txt'), 'utf-8'),
  },
  {
    file1YmlPath, file2YmlPath, format: 'json', expected: fs.readFileSync(getFixturePath('resultJson.txt'), 'utf-8'),
  },
])('compare', ({
  format, expected,
}) => {
  expect(genDiff(file1JsonPath, file2JsonPath, format)).toBe(expected);
  expect(genDiff(file1YmlPath, file2YmlPath, format)).toBe(expected);
});
