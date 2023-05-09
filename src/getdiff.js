/* eslint-disable import/extensions */
/* eslint-disable no-console */
import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import parsers from './parsers.js';

const toDeepPairs = (obj) => {
  const result = Object.keys(obj).map((key) => {
    if (!_.isObject(obj[key]) || obj[key] === null) {
      return [key, obj[key]];
    }
    return [key, toDeepPairs(obj[key])];
  });
  return result;
};

const fromDeepPairs = (arr) => {
  const result = _.fromPairs(arr);
  const keys = Object.keys(result);
  keys.map((key) => {
    if (Array.isArray(result[key])) {
      result[key] = fromDeepPairs(result[key]);
    }
  });
  return result;
};

const strNormalize = (str) => {
  if ([' ', '+', '-'].includes(str.substr(0, 1))) {
    return str.slice(2);
  }
  return str;
};

const deepSortArr = (arr) => {
  arr.map((item) => {
    if (Array.isArray(item[1])) {
      deepSortArr(item[1]);
    }
  });

  const bubbleSort = (coll) => {
    let stepsCount = coll.length - 1;
    let swapped;
    do {
      swapped = false;
      for (let i = 0; i < stepsCount; i += 1) {
        if (strNormalize(coll[i][0]) > strNormalize(coll[i + 1][0])) {
          [coll[i], coll[i + 1]] = [coll[i + 1], coll[i]];
          swapped = true;
        }
      }
      stepsCount -= 1;
    } while (swapped);
    return coll;
  };
  return bubbleSort(arr);
};

const compare = (obj1, obj2) => {
  const result = {};
  let sign = '-';

  const toCompare = (o1, o2) => {
    Object.keys(o1).map((key) => {
      if (!_.has(o2, key)) {
        result[`${sign} ${key}`] = o1[key];
      } else if (o1[key] instanceof Object && o2[key] instanceof Object) {
        result[`  ${key}`] = compare(obj1[key], obj2[key]);
      } else if (o1[key] === o2[key]) {
        result[`  ${key}`] = o1[key];
      } else {
        result[`${sign} ${key}`] = o1[key];
      }
    });
  };

  toCompare(obj1, obj2);
  sign = '+';
  toCompare(obj2, obj1);
  return result;
};

const getDiff = (filepath1, filepath2) => {
  const format = path.extname(filepath1);
  const parse = parsers(format);
  const objFile1 = parse(fs.readFileSync(filepath1, 'utf-8'));
  const objFile2 = parse(fs.readFileSync(filepath2, 'utf-8'));

  const res = compare(objFile1, objFile2);
  const deepPairs = toDeepPairs(res);
  const deepSort = deepSortArr(deepPairs);
  const fromSort = fromDeepPairs(deepSort);
  // console.log(fromSort);
  return (fromSort);
};

export default getDiff;
