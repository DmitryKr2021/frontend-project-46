import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import parsers from './parsers.js';

const sortArr = (a, b) => Object.keys(a)[0].localeCompare(Object.keys(b)[0]);

const compare = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const keys = _.union(keys1, keys2);

  const result = keys.flatMap((key) => {
    if (obj1[key] instanceof Object && obj2[key] instanceof Object) {
      return ({ [key]: compare(obj1[key], obj2[key]), dif: '  ' });
    }
    if (!Object.hasOwn(obj1, key)) {
      return { [key]: obj2[key], dif: '+ ' };
    }
    if (!Object.hasOwn(obj2, key)) {
      return { [key]: obj1[key], dif: '- ' };
    }
    if (obj1[key] !== obj2[key]) {
      return [{ [key]: obj1[key], dif: '- ' }, { [key]: obj2[key], dif: '+ ' }];
    }
    return { [key]: obj1[key], dif: '  ' };
  });
  return result.sort(sortArr);
};

const getDiff = (filepath1, filepath2) => {
  const format = path.extname(filepath1);
  const parse = parsers(format);
  const objFile1 = parse(fs.readFileSync(filepath1, 'utf-8'));
  const objFile2 = parse(fs.readFileSync(filepath2, 'utf-8'));

  return (compare(objFile1, objFile2));
};

export default getDiff;
