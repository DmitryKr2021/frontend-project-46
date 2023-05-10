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

const plain = (data) => {
  let path = '';
  const paths = [];
  const iter = (node, level) => {
    const keys = Object.keys(node);
    const result = keys.map((key, index, array) => {
      
      /* if (key.substring(0, 1) === '-') {
        if (key.slice(2) === array[index + 1].slice(2)) {
          return (`${prefaces[0]} '${path}${key.slice(2)}' ${prefaces[3]} ${expression(node[key])} to ${expression(node[array[index + 1]])}\n`);
        }
        return (`${prefaces[0]} '${path}${key.slice(2)}' ${prefaces[2]}\n`);
      }
      if (key.substring(0, 1) === '+') {
        if (!array[index - 1] || (array[index - 1] && key.slice(2) !== array[index - 1].slice(2))) {
          return (`${prefaces[0]} '${path}${key.slice(2)}' ${prefaces[1]} ${expression(node[key])}\n`);
        }
      } */

      if (key.substring(0, 1) === '-') {
        if (key.slice(2) === array[index + 1].slice(2)) {
          return (`Property '${path}${key.slice(2)}' was updated. From ${expression(node[key])} to ${expression(node[array[index + 1]])}\n`);
        }
        return (`Property '${path}${key.slice(2)}' was removed\n`);
      }
      if (key.substring(0, 1) === '+') {
        if (!array[index - 1] || (array[index - 1] && key.slice(2) !== array[index - 1].slice(2))) {
          return (`Property '${path}${key.slice(2)}' was added with value: ${expression(node[key])}\n`);
        }
      }

      if (node[key] instanceof Object) {
        path += `${key.slice(2)}.`;
        paths.push(path);
        return (iter(node[key], level + 1));
      }
    });
    path = paths[level - 2] || '';
    return (result.join(''));
  };
  return iter(data, 0).trim();
};

export default plain;
