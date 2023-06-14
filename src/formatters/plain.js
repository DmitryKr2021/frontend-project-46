const stringify = (data) => {
  if (data instanceof Object) { return '[complex value]'; }
  return typeof data === 'string' ? `'${data}'` : data;
};

const plain = (dataDif) => {
  const inner = (data, path = '') => {
    const res = data.map((item) => {
      const pathPoint = path === '' ? '' : `${path}.`;
      switch (item.type) {
        case 'added': return `Property '${pathPoint}${item.key}' was added with value: ${stringify(item.value2)}`;
        case 'deleted': return `Property '${pathPoint}${item.key}' was removed`;
        case 'changed': return `Property '${pathPoint}${item.key}' was updated. From ${stringify(item.value1)} to ${stringify(item.value2)}`;
        case 'unchanged': return null;
        case 'nested': { const newPath = `${pathPoint}${item.key}`;
          return `${inner(item.children, newPath)}`; }
        default: break;
      }
    }, '');
    return res.filter((item) => item).join('\n');
  };
  return inner(dataDif).trim();
};

export default plain;
