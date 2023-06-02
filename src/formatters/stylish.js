const stylish = (data, replacer = '.', spacesCount = 4) => {
  const signs = {
    added: '+ ',
    deleted: '- ',
    unchanged: '  ',
    changed: '- ',
  };
  const inner = (data_, level) => {
    const space = (levels, number = 0) => replacer.repeat(levels * spacesCount - number * 2);

    const format = (key) => {
      const arrayData = data_[key];

      if (typeof arrayData[1] === 'object') {
        // console.log('dataKey1=', arrayData[1]);
        // const { innerKey, innerValue } = Object.entries(arrayData[1]);
        // console.log(Object.entries(arrayData[1]));
      }

      const result = typeof arrayData[1] === 'object'
        // ? `${signs[dataKey[0]]}${key}: ${Object.values((dataKey)[1])}`
        ? `${signs[arrayData[0]]}${key}: ${Object.entries(arrayData[1])}`
        : `${signs[arrayData[0]]}${key}: ${arrayData[1]}`;
      return (arrayData[0] !== 'changed' ? `${result}` : `${result}\n${space(level, 1)}${signs.added}${key}: ${arrayData[2]}`);
    };

    const keys = Object.keys(data_);
    const arr = keys.map((key) => (Array.isArray(data_[key])
      ? `\n${space(level, 1)}${format(key)}`
      : `${''}\n${space(level)}${key}: {${inner(data_[key], level + 1)}\n${space(level)}}`));

    return arr.join('');
  };

  return inner(data, 1);
};
export default stylish;
