const space = (depths, replacer = ' ', spacesCount = 4) => replacer.repeat(depths * spacesCount);

const stringify = (obj, objDepth) => {
  if (!(obj instanceof Object)) { return obj; }
  const entries = Object.entries(obj);
  const str = entries.map(([key, value]) => `\n${space(objDepth + 1)}${key}: ${stringify(value, objDepth + 1)}`).join('');
  return `{${str}\n${space(objDepth)}}`;
};

const stylish = (inputData) => {
  const inner = (data, depth) => {
    const arr = data.map((item) => {
      const nextDepth = depth + 1;
      switch (item.type) {
        case 'added': return `${space(depth)}  + ${item.key}: ${stringify(item.value, nextDepth)}`;
        case 'deleted': return `${space(depth)}  - ${item.key}: ${stringify(item.value, nextDepth)}`;
        case 'changed': return `${space(depth)}  - ${item.key}: ${stringify(item.value1, nextDepth)}\n${space(depth)}  + ${item.key}: ${stringify(item.value2, nextDepth)}`;
        case 'nested': return `${space(nextDepth)}${item.key}: {\n${inner(item.children, nextDepth)}\n${space(nextDepth)}}`;
        default: return `${space(depth)}    ${item.key}: ${stringify(item.value, nextDepth)}`;
      }
    });
    return arr.join('\n');
  };
  return `{\n${inner(inputData, 0)}\n}`;
  // return `{\n${inner(inputData, 0)}}`;
};

export default stylish;
