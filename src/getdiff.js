import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import parsers from './parsers.js';

const compare = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const keysSorted = _.sortBy(_.union(keys1, keys2));

  const result = keysSorted.flatMap((key) => {
    if (obj1[key] instanceof Object && obj2[key] instanceof Object) {
      return { key, type: 'nested', children: compare(obj1[key], obj2[key]) };
    }
    if (!Object.hasOwn(obj1, key)) {
      return { key, type: 'added', value: obj2[key] };
    }
    if (!Object.hasOwn(obj2, key)) {
      return { key, type: 'deleted', value: obj1[key] };
    }
    if (obj1[key] !== obj2[key]) {
      return {
        key, type: 'changed', value: obj1[key], newValue: obj2[key],
      };
    }
    return { key, type: 'unchanged', value: obj1[key] };
  });

  return result;
};

const getDiff = (filepath1, filepath2) => {
  const format = path.extname(filepath1);
  const parse = parsers(format);
  const objFile1 = parse(fs.readFileSync(filepath1, 'utf-8'));
  const objFile2 = parse(fs.readFileSync(filepath2, 'utf-8'));

  return (compare(objFile1, objFile2));
};

export default getDiff;
