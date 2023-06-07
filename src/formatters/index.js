import stylish from './stylish.js';
import plain from './plain.js';
import getDiff from '../getdiff.js';
import jsonFormat from './json.js';

const genDiff = (filepath1, filepath2, formatName) => {
  switch (formatName) {
    case 'plain': return (plain(getDiff(filepath1, filepath2)));
    case 'json': return (jsonFormat(getDiff(filepath1, filepath2)));
    default: return (stylish(getDiff(filepath1, filepath2)));
  }
};
export default genDiff;
