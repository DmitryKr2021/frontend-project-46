const stylish = (data_, replacer_ = ' ', spacesCount_ = 4) => {
  let level = 0;
  const inner = (data, replacer = ' ', spacesCount = 4) => {
    level += 1;
    const space = (levels, sign = 0) => replacer.repeat(levels * spacesCount - sign * 2);
    if (Array.isArray(data)) {
      const res = (data.reduce((acc, item) => {
        const entries = Object.entries(item).flat();
        if (typeof entries[1] === 'object' && entries[1] !== null) { return `${acc}\n${space(level, 1)}${item.dif}${entries[0]}: {${inner(entries[1])}\n${space(level)}}`; }
        return `${acc}\n${space(level, 1)}${item.dif}${entries[0]}: ${inner(entries[1])}`;
      }, ''));
      level -= 1;
      return (level < 1 ? `{${res}\n}` : `${res}`);
    }

    if (typeof (data) === 'object' && data !== null) {
      const keys = Object.keys(data);
      const str = keys.map((key) => (typeof data[key] === 'object' ? `${''}\n${space(level)}${key}: {${inner(data[key])}\n${space(level)}}` : `\n${space(level)}${key}: ${inner(data[key])}`));

      level -= 1;
      return str.join('');
    }
    level -= 1;
    return `${data}`;
  };
  return inner(data_, replacer_, spacesCount_);
};
export default stylish;
