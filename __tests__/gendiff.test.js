/* eslint-disable no-underscore-dangle */
/* eslint-disable import/extensions */
import { test, expect } from '@jest/globals';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import compare from '../src/compare.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const f1 = getFixturePath('file1.json');
const f2 = getFixturePath('file2.json');
const f3 = getFixturePath('file3.json');
const y1 = getFixturePath('file1.yml');
const y2 = getFixturePath('file2.yml');
const y3 = getFixturePath('file3.yml');
const f1f2 = fs.readFileSync(getFixturePath('f1f2.txt'), 'utf-8');
const f1f3 = fs.readFileSync(getFixturePath('f1f3.txt'), 'utf-8');
const f2f3 = fs.readFileSync(getFixturePath('f2f3.txt'), 'utf-8');

test('compare', () => {
  expect(compare(f1, f2)).toEqual(f1f2);
  expect(compare(f1, f3)).toEqual(f1f3);
  expect(compare(f2, f3)).toEqual(f2f3);

  expect(compare(y1, y2)).toEqual(f1f2);
  expect(compare(y1, y3)).toEqual(f1f3);
  expect(compare(y2, y3)).toEqual(f2f3);
});
