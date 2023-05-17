import { test, expect } from '@jest/globals';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import genDiff from '../src/formatters/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const file1 = getFixturePath('file11.json');
const file2 = getFixturePath('file21.json');
const difFile1File2Txt = fs.readFileSync(getFixturePath('f11f21.txt'), 'utf-8');
const difFile1File2Plain = fs.readFileSync(getFixturePath('f11f21plain.txt'), 'utf-8');
const difFile1File2Json = fs.readFileSync(getFixturePath('f11f21json.txt'), 'utf-8');

test.each([
  {file1, file2, format: '', expected: difFile1File2Txt},
  {file1, file2, format: 'plain', expected: difFile1File2Plain},
  {file1, file2, format: 'json', expected: difFile1File2Json},
])('compare', ({file1, file2, format, expected}) => {expect(genDiff(file1, file2, format)).toBe(expected);
});