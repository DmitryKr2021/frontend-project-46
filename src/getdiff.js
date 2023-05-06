/* eslint-disable import/extensions */
/* eslint-disable no-console */
import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import parsers from './parsers.js';
import stylish from '../bin/stylish.js';

const getDiff = (filepath1, filepath2) => {
  const format = path.extname(filepath1);
  const parse = parsers(format);
  const objFile1 = parse(fs.readFileSync(filepath1, 'utf-8'));
  const objFile2 = parse(fs.readFileSync(filepath2, 'utf-8'));

  const compare = (obj1, obj2) => {
    const result = {};

    Object.keys(obj1).map((key) => {
      if (!_.has(obj2, key)) {
        result[`- ${key}`] = obj1[key];
      } else if (obj1[key] instanceof Object && obj2[key] instanceof Object) {
        result[`  ${key}`] = compare(obj1[key], obj2[key]);
      } else if (obj1[key] === obj2[key]) {
        result[`  ${key}`] = obj1[key];
      } else {
        result[`- ${key}`] = obj1[key];
      }
    });

    Object.keys(obj2).map((key) => {
      if (!_.has(obj1, key)) {
        result[`+ ${key}`] = obj2[key];
      } else if (obj2[key] instanceof Object && obj1[key] instanceof Object) {
        result[`  ${key}`] = compare(obj1[key], obj2[key]);
      } else if (obj1[key] === obj2[key]) {
        result[`  ${key}`] = obj2[key];
      } else {
        result[`+ ${key}`] = obj2[key];
      }
    });

    return result;
  };

  const toDeepPairs = (obj) => {
    const result = Object.keys(obj).map((key) => {
      if (!_.isObject(obj[key]) || obj[key] === null) {
        return [key, obj[key]];
      }
      return [key, toDeepPairs(obj[key])];
    });
    return result;
  };

  const deepSortArr = (arr) => {
    arr.map((item) => {
      if (Array.isArray(item[1])) {
        deepSortArr(item[1]);
      }
    });

    const strNormalize = (str) => {
      if ([' ', '+', '-'].includes(str.substr(0, 1))) {
        return str.slice(2);
      }
      return str;
    };

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

  const res = compare(objFile1, objFile2);
  const deepPairs = toDeepPairs(res);
  const deepSort = deepSortArr(deepPairs);
  const fromSort = fromDeepPairs(deepSort);
  // console.log(stylish(fromSort));
  return (stylish(fromSort));
};

export default getDiff;
