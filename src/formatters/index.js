import stylish from './stylish.js';
import plain from './plain.js';
import getDiff from '../getdiff.js';

/* const genDiff = (filesDif, formatName) => {
  switch (formatName) {
    case 'plain': return (plain(filesDif));
    case 'json': return (JSON.stringify(filesDif));
    default: return (stylish(filesDif));
  }
}; */

const genDiff = (filepath1, filepath2, formatName) => {
  switch (formatName) {
    case 'plain': return (plain(getDiff(filepath1, filepath2)));
    case 'json': return (JSON.stringify(getDiff(filepath1, filepath2)));
    default: return (stylish(getDiff(filepath1, filepath2)));
  }
};
export default genDiff;
