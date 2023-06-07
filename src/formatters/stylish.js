const space = (levels, gapCount = 0, replacer = ' ', spacesCount = 4) => replacer.repeat(levels * spacesCount - gapCount * 2);

const stringify = (obj, objLevel) => {
  if (!(obj instanceof Object)) { return obj; }
  const entries = Object.entries(obj);
  const str = entries.reduce((acc, entry) => `${acc}\n${space(objLevel + 1)}${entry[0]}: ${stringify(entry[1], objLevel + 1)}`, '');
  return `{${str}\n${space(objLevel)}}`;
};

const stylish = (inputData) => {
  const inner = (data, level) => {
    const arr = data.map((item) => {
      const levelUp = level + 1;
      switch (item.type) {
        case 'added': return `${space(levelUp, 1)}+ ${item.key}: ${stringify(item.value2, levelUp)}\n`;
        case 'deleted': return `${space(levelUp, 1)}- ${item.key}: ${stringify(item.value1, levelUp)}\n`;
        case 'changed': return `${space(levelUp, 1)}- ${item.key}: ${stringify(item.value1, levelUp)}\n${space(levelUp, 1)}+ ${item.key}: ${stringify(item.value2, levelUp)}\n`;
        case 'unchanged': return `${space(levelUp, 1)}  ${item.key}: ${stringify(item.value1, levelUp)}\n`;
        case 'nested': return `${space(levelUp)}${item.key}: {\n${inner(item.children, levelUp)}${space(levelUp)}}\n`;
        default: return '';
      }
    });

    return arr.join('');
  };

  return `{\n${inner(inputData, 0)}}`;
};
export default stylish;
