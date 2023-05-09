/* eslint-disable import/extensions */
import stylish from './stylish.js';
import plain from './plain.js';
// import gendiff from '../../bin/gendiff.js';

const filepath1 = 'D:/Programming/Hexlet/Project2/frontend-project-46/__fixtures__/file11.yml';
const filepath2 = 'D:/Programming/Hexlet/Project2/frontend-project-46/__fixtures__/file21.yml';
const formatName = stylish;

const diff = gendiff(filepath1, filepath2, formatName);
console.log(diff);
