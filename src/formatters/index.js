import stylish from './stylish.js';
import plain from './plain.js';
import getDiff from '../getdiff.js';
import jsonFormat from './json.js';

const genDiff = (filepath1, filepath2, formatName) => {
  if (formatName === 'plain') {
    return (plain(getDiff(filepath1, filepath2)));
  }
  if (formatName === 'json') {
    return (jsonFormat(getDiff(filepath1, filepath2)));
  }
  return (stylish(getDiff(filepath1, filepath2)));
};
export default genDiff;
