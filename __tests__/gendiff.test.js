/* eslint-disable no-underscore-dangle */
/* eslint-disable import/extensions */
import { test, expect } from '@jest/globals';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import getDiff from '../src/getdiff.js';
import stylish from '../src/formatters/stylish.js';
import plain from '../src/formatters/plain.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const f11 = getFixturePath('file11.json');
const f21 = getFixturePath('file21.json');
const f11f21 = fs.readFileSync(getFixturePath('f11f21.txt'), 'utf-8');
const f11f21plain = fs.readFileSync(getFixturePath('f11f21plain.txt'), 'utf-8');

test('compare', () => {
  expect(stylish(getDiff(f11, f21))).toEqual(f11f21);
  console.log(plain(getDiff(f11, f21)));
  expect(plain(getDiff(f11, f21))).toEqual(f11f21plain);
});
