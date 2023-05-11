/* eslint-disable no-console */
/* eslint-disable import/extensions */
import stylish from './stylish.js';
import plain from './plain.js';
import getDiff from '../getdiff.js';

const genDiff = (filepath1, filepath2, formatName) => {
  if (formatName === 'plain') {
    console.log(plain(getDiff(filepath1, filepath2)));
    return (plain(getDiff(filepath1, filepath2)));
  }
  console.log(stylish(getDiff(filepath1, filepath2)));
  return (stylish(getDiff(filepath1, filepath2)));
};
export default genDiff;
