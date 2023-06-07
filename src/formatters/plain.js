const stringify = (data) => {
  if (data instanceof Object) { return '[complex value]'; }
  return typeof data === 'string' ? `'${data}'` : data;
};

const plain = (dataDif) => {
  const inner = (data, path = '') => {
    const res = data.reduce((acc, item) => {
      const pathPoint = path === '' ? '' : `${path}.`;
      switch (item.type) {
        case 'added': return `${acc}Property '${pathPoint}${item.key}' was added with value: ${stringify(item.value2)}\n`;
        case 'deleted': return `${acc}Property '${pathPoint}${item.key}' was removed\n`;
        case 'changed': return `${acc}Property '${pathPoint}${item.key}' was updated. From ${stringify(item.value1)} to ${stringify(item.value2)}\n`;
        case 'nested': { const newPath = `${pathPoint}${item.key}`;
          return `${acc}${inner(item.children, newPath)}`; }
        default: return acc;
      }
    }, '');
    return res;
  };
  return inner(dataDif).trim();
};

export default plain;
