let level = 0;
const stylish = (data, replacer = ' ', spacesCount = 4) => {
  const spaceNormalize = (key) => {
    if ([' ', '+', '-'].includes(key.substr(0, 1))) {
      return (level * spacesCount - 2);
    }
    return level * spacesCount;
  };

  let space;

  if (typeof (data) === 'object' && data !== null) {
    const keys = Object.keys(data);
    let result = '';
    keys.map((key) => {
      level += 1;
      space = replacer.repeat(spaceNormalize(key));
      result = `${result}\n${space}${key}: ${stylish(data[key])}`;
      level -= 1;
      return result;
    });
    return `{${result}\n${replacer.repeat(level * spacesCount)}}`;
  }
  return `${data}`;
};

export default stylish;
