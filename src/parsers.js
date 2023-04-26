import yaml from 'js-yaml';

const parsers = (format) => {
  let parse;
  if (format === '.json') {
    parse = JSON.parse;
  } else if (format === '.yml' || format === '.yaml') {
    parse = yaml.load;
  } else if (format === '.ini') {
    // parse = ini.parse;
  }
  return parse;
};

export default parsers;
