const prefaces = [
  'Property',
  'was added with value:',
  'was removed',
  'was updated. From',
  '[complex value]',
];

let path = '';
let level = 0;
const paths = [];
const expression = (data) => {
  if (data instanceof Object) { return prefaces[4]; }
  return typeof data === 'string' ? `'${data}'` : data;
};
const plain = (data) => {
  const keys = Object.keys(data);
  const result = keys.map((key, index, array) => {
    if (key.substring(0, 1) === '-') {
      if (key.slice(2) === array[index + 1].slice(2)) {
        return (`${prefaces[0]} '${path}${key.slice(2)}' ${prefaces[3]} ${expression(data[key])} to ${expression(data[array[index + 1]])}\n`);
      }
      return (`${prefaces[0]} '${path}${key.slice(2)}' ${prefaces[2]}\n`);
    }
    if (key.substring(0, 1) === '+') {
      if (!array[index - 1] || (array[index - 1] && key.slice(2) !== array[index - 1].slice(2))) {
        return (`${prefaces[0]} '${path}${key.slice(2)}' ${prefaces[1]} ${expression(data[key])}\n`);
      }
    }

    if (data[key] instanceof Object) {
      path += `${key.slice(2)}.`;
      paths.push(path);
      level += 1;
      return (plain(data[key]));
    }
    return [];
  });
  level -= 1;
  path = paths[level - 1] || '';
  return result.join('');
};

export default plain;
