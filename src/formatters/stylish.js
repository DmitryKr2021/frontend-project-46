let level = 0;
const stylish = (data, replacer = ' ', spacesCount = 4) => {
  level += 1;
  const space = (levels, sign = 0) => replacer.repeat(levels * spacesCount - sign * 2);

  if (Array.isArray(data)) {
    const res = (data.reduce((acc, item) => {
      const entries = Object.entries(item).flat();
      let str;
      if (typeof entries[1] === 'object' && entries[1] !== null) { str = `${acc}\n${space(level, 1)}${item.dif}${entries[0]}: {${stylish(entries[1])}\n${space(level)}}`; } else {
        str = `${acc}\n${space(level, 1)}${item.dif}${entries[0]}: ${stylish(entries[1])}`;
      }
      return str;
    }, ''));
    level -= 1;
    return (level < 1 ? `{${res}\n}` : `${res}`);
  }

  if (typeof (data) === 'object' && data !== null) {
    const keys = Object.keys(data);
    let str = '';
    str = keys.map((key) => (typeof data[key] === 'object' ? `${str}\n${space(level)}${key}: {${stylish(data[key])}\n${space(level)}}` : `\n${space(level)}${key}: ${stylish(data[key])}`));

    level -= 1;
    return str.join('');
  }
  level -= 1;
  return `${data}`;
};

export default stylish;
