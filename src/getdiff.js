import _ from 'lodash';
import path from 'path';
import fs from 'fs';
import chooseParser from './parsers.js';

const compare = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const keysSorted = _.sortBy(_.union(keys1, keys2));

  const result = keysSorted.map((key) => {
    if (_.isPlainObject(data1[key]) && _.isPlainObject(data2[key])) {
      return { key, type: 'nested', children: compare(data1[key], data2[key]) };
    }
    if (!Object.hasOwn(data1, key)) {
      return { key, type: 'added', value2: data2[key] };
    }
    if (!Object.hasOwn(data2, key)) {
      return { key, type: 'deleted', value1: data1[key] };
    }
    if (!_.isEqual(data1[key], data2[key])) {
      return {
        key, type: 'changed', value1: data1[key], value2: data2[key],
      };
    }
    return { key, type: 'unchanged', value1: data1[key] };
  });

  return result;
};

// const getData = (filePath) => [fs.readFileSync(filePath, 'utf-8'), path.extname(filePath)];
const getData = (filePath) => [fs.readFileSync(filePath, 'utf-8').trim(), path.extname(filePath)];

const parseData = (data) => chooseParser(data);

const getDiff = (file1, file2) => compare(parseData(getData(file1)), parseData(getData(file2)));

export default getDiff;
