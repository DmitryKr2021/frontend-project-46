import stylish from './stylish.js';
import plain from './plain.js';

const ast = (filesDif, formatType) => {
  switch (formatType) {
    case 'plain': return (plain(filesDif));
    case 'json': return (JSON.stringify(filesDif));
    default: return (stylish(filesDif));
  }
};

export default ast;
