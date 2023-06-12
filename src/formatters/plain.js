const stringify = (data) => {
  if (data instanceof Object) { return '[complex value]'; }
  return typeof data === 'string' ? `'${data}'` : data;
};

const plain = (dataDif) => {
  /*const inner = (data, path = '') => {
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
  };*/

  const inner = (data, path = '') => {
    const res = data.map((item) => {
      const pathPoint = path === '' ? '' : `${path}.`;
      switch (item.type) {
        case 'added': return `Property '${pathPoint}${item.key}' was added with value: ${stringify(item.value2)}`;
        case 'deleted': return `Property '${pathPoint}${item.key}' was removed`;
        case 'changed': return `Property '${pathPoint}${item.key}' was updated. From ${stringify(item.value1)} to ${stringify(item.value2)}`;
        case 'nested': { const newPath = `${pathPoint}${item.key}`;
          return `${inner(item.children, newPath)}`; }
        default: break;
      }
    }, '');
    console.log('res=', res);
    return res.join('\n');
  };

  return inner(dataDif).trim();
};

export default plain;
