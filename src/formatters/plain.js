const prefaces = [
  'Property',
  'was added with value:',
  'was removed',
  'was updated. From',
  '[complex value]',
];

const expression = (data) => {
  if (data instanceof Object) { return prefaces[4]; }
  return typeof data === 'string' ? `'${data}'` : data;
};

const plain = (dataDif) => {
  const inner = (data, path = '') => {
    const res = data.reduce((acc, item) => {
      const pathPoint = path === '' ? '' : `${path}.`;
      if (item.type === 'nested') {
        const newPath = `${pathPoint}${item.key}`;
        return `${acc}${inner(item.children, newPath)}`;
      }
      if (item.type === 'added') {
        return `${acc}${prefaces[0]} '${pathPoint}${item.key}' ${prefaces[1]} ${expression(item.value)}\n`;
      }
      if (item.type === 'deleted') {
        return `${acc}${prefaces[0]} '${pathPoint}${item.key}' ${prefaces[2]}\n`;
      }
      if (item.type === 'changed') {
        return `${acc}${prefaces[0]} '${pathPoint}${item.key}' ${prefaces[3]} ${expression(item.value)} to ${expression(item.newValue)}\n`;
      }
      return acc;
    }, '');
    return res;
  };
  return inner(dataDif).trim();
};

export default plain;
