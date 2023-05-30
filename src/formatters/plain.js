import _ from 'lodash';

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

const pathToNode = (localPath, localData) => {
  const prefix = (localPath.slice(0, 1) === '.' ? `${localPath.slice(1)}.` : '');
  return `${prefix}${_.toPairs(localData).flat()[0]}`;
};

const plain = (dataDif) => {
  let pathUpdate;
  let removed;
  const inner = (data, path = '') => {
    let res = '';
    if (Array.isArray(data)) {
      data.forEach((item) => { res += inner(item, path); });
    } else {
      if (data.dif === '- ') {
        [removed] = Object.values(data);
        pathUpdate = pathToNode(path, data);
        return (`${prefaces[0]} '${pathToNode(path, data)}' ${prefaces[2]}\n`);
      }
      if (data.dif === '+ ') {
        const isUpdate = pathToNode(path, data) === pathUpdate;
        return isUpdate ? `${prefaces[0]} '${pathToNode(path, data)}' ${prefaces[3]} ${expression(removed)} to ${expression(Object.values(data)[0])}\n` : `${prefaces[0]} '${pathToNode(path, data)}' ${prefaces[1]} ${expression(Object.values(data)[0])}\n`;
      }
      if (data.dif === '  ') {
        const [key] = Object.keys(data);
        return (inner(data[key], `${path}.${key}`));
      }
    }
    return res;
  };
  return inner(dataDif)
    .split('\n')
    .filter((elem, index, array) => {
      if (array[index + 1]) {
        const pos1 = elem.indexOf("'");
        const pos2 = elem.indexOf("'", pos1 + 1);
        return elem.slice(0, pos2) !== array[index + 1].slice(0, pos2);
      }
      return elem;
    })
    .join('\n');
};

export default plain;
