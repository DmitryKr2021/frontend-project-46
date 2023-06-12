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

test.each([
  {
    jsonDif, format: undefined, expected: fs.readFileSync(getFixturePath('resultStylish.txt'), 'utf-8'),
  },
  {
    jsonDif, format: 'plain', expected: fs.readFileSync(getFixturePath('resultPlain.txt'), 'utf-8'),
  },
  {
    jsonDif, format: 'json', expected: fs.readFileSync(getFixturePath('resultJson.txt'), 'utf-8'),
  },
  {
    ymlDif, format: undefined, expected: fs.readFileSync(getFixturePath('resultStylish.txt'), 'utf-8'),
  },
  {
    ymlDif, format: 'plain', expected: fs.readFileSync(getFixturePath('resultPlain.txt'), 'utf-8'),
  },
  {
    ymlDif, format: 'json', expected: fs.readFileSync(getFixturePath('resultJson.txt'), 'utf-8'),
  },
])('compare', ({
  format, expected,
}) => {
  expect(genDiff(jsonDif, format)).toBe(expected);
  expect(genDiff(ymlDif, format)).toBe(expected);
});
