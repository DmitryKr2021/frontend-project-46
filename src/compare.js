/* eslint-disable no-console */
import _ from 'lodash';
import fs from 'fs';

const compare = (filepath1, filepath2, options) => {
  const objFile1 = JSON.parse(fs.readFileSync(filepath1));
  const objFile2 = JSON.parse(fs.readFileSync(filepath2));
  const arrFile1 = _.sortBy(Object.entries(objFile1));
  const arrFile2 = _.sortBy(Object.entries(objFile2));
  const uniqArr = _.uniqWith([...arrFile1, ...arrFile2], _.isEqual);
  const uniqArrSorted = _.sortBy(uniqArr, (item) => item[0]);

  const getSign = (request, arr1, arr2) => {
    if (
      arr1.filter((item) => _.isEqual(item, request)).length
      && arr2.filter((item) => _.isEqual(item, request)).length
    ) {
      return '  ';
    }
    if (arr1.filter((item) => _.isEqual(item, request)).length) {
      return '- ';
    }
    return '+ ';
  };

  const resultArr = uniqArrSorted.map((item) => {
    const sign = getSign(item, arrFile1, arrFile2);
    const [key, value] = item;
    return [sign + key, value].join(': ');
  });
  // console.log(`{\n  ${resultArr.join('\n  ')}\n}`);
  console.log(`{\n ${resultArr.join('\n ')}\n}`);
  return (`{\n ${resultArr.join('\n ')}\n}`);
};

export default compare;
