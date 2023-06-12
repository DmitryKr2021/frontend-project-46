const space = (depths, shiftLeft = 0, replacer = ' ', spacesCount = 4) => replacer.repeat(depths * spacesCount - shiftLeft * 2);

const stringify = (obj, objDepth) => {
  if (!(obj instanceof Object)) { return obj; }
  const entries = Object.entries(obj);
  const str = entries.reduce((acc, entry) => `${acc}\n${space(objDepth + 1)}${entry[0]}: ${stringify(entry[1], objDepth + 1)}`, '');
  return `{${str}\n${space(objDepth)}}`;
};

const stylish = (inputData) => {
  const inner = (data, depth) => {
    const arr = data.map((item) => {
      const nextDepth = depth + 1;
      switch (item.type) {
        case 'added': return `${space(nextDepth, 1)}+ ${item.key}: ${stringify(item.value2, nextDepth)}`;
        case 'deleted': return `${space(nextDepth, 1)}- ${item.key}: ${stringify(item.value1, nextDepth)}`;
        case 'changed': return `${space(nextDepth, 1)}- ${item.key}: ${stringify(item.value1, nextDepth)}\n${space(nextDepth, 1)}+ ${item.key}: ${stringify(item.value2, nextDepth)}`;
        case 'nested': return `${space(nextDepth)}${item.key}: {\n${inner(item.children, nextDepth)}\n${space(nextDepth)}}`;
        default: return `${space(nextDepth, 1)}  ${item.key}: ${stringify(item.value1, nextDepth)}`;
      }
    });
    return arr.join('\n');
  };
  return `{\n${inner(inputData, 0)}\n}`;
};
export default stylish;
