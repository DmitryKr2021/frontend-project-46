/* eslint-disable no-underscore-dangle */
/* eslint-disable import/extensions */
import { test, expect } from '@jest/globals';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import getDiff from '../src/getdiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const f1 = getFixturePath('file1.json');
const f2 = getFixturePath('file2.json');
const f11 = getFixturePath('file11.json');
const f21 = getFixturePath('file21.json');
const y1 = getFixturePath('file1.yml');
const y2 = getFixturePath('file2.yml');
const f1f2 = fs.readFileSync(getFixturePath('f1f2.txt'), 'utf-8');
const f11f21 = fs.readFileSync(getFixturePath('f11f21.txt'), 'utf-8');

test('compare', () => {
  // expect(getDiff(f1, f2)).toEqual(f1f2);
  // expect(getDiff(y1, y2)).toEqual(f1f2);
  expect(getDiff(f11, f21)).toEqual(f11f21);
});
