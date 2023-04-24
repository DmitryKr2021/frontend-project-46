/* eslint-disable no-underscore-dangle */
/* eslint-disable import/extensions */
import { test, expect } from '@jest/globals';
import path from 'path';
import { fileURLToPath } from 'url';
import compare from '../src/compare.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const f1 = getFixturePath('file1.json');
const f2 = getFixturePath('file2.json');
const f3 = getFixturePath('file3.json');

/* const f1f2 = `
{
 - follow: false
   host: hexlet.io
 - proxy: 123.234.53.22
 - timeout: 50
 + timeout: 20
 + verbose: true
}`; */

const f1f2 = `{\n - follow: false\n   host: hexlet.io\n - proxy: 123.234.53.22\n - timeout: 50\n + timeout: 20\n + verbose: true\n}`;

console.log(compare(f1, f2));
console.log(f1f2);

test('compare', () => {
  expect(compare(f1, f2)).toEqual(f1f2);
});
