import stylish from './stylish.js';
import plain from './plain.js';

const genDiff = (filesDif, formatName) => {
  switch (formatName) {
    case 'plain': return (plain(filesDif));
    case 'json': return (JSON.stringify(filesDif));
    default: return (stylish(filesDif));
  }
};

export default genDiff;
