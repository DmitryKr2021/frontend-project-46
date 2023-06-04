const stylish = (data, replacer = ' ', spacesCount = 4) => {
  const signs = {
    added: '+ ',
    deleted: '- ',
    unchanged: '  ',
    changed: '- ',
  };
  const inner = (data_, level) => {
    const space = (levels, number = 0) => replacer.repeat(levels * spacesCount - number * 2);

    const isObject = (obj, objLevel) => {
      if (!(obj instanceof Object) || obj === null) { return obj; }
      const entries = Object.entries(obj);
      const str = entries.reduce((acc, entry) => `${acc}\n${space(objLevel + 1)}${entry[0]}: ${isObject(entry[1], objLevel + 1)}`, '');
      return `{${str}\n${space(objLevel)}}`;
    };

    const arr = data_.map((item) => (item.type === 'nested'
      ? `${space(level + 1)}${item.key}: {\n${inner(item.children, level + 1)}${space(level + 1)}}\n`
      : `${space(level + 1, 1)}${signs[item.type]}${item.key}: ${isObject(item.value, level + 1)}\n${item.type === 'changed' ? `${space(level + 1, 1)}+ ${item.key}: ${item.newValue}\n` : ''}`
    ));

    return arr.join('');
  };

  return `{\n${inner(data, 0)}}`;
};
export default stylish;
