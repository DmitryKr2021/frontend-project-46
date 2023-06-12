import yaml from 'js-yaml';

const chooseParser = ([fileContent, format]) => {
  if (format === '.yml' || format === '.yaml') {
    return yaml.load(fileContent);
  }
  return JSON.parse(fileContent);
};

export default chooseParser;
