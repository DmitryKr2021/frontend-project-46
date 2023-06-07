import yaml from 'js-yaml';
import path from 'path';
import fs from 'fs';

const parsers = (file) => {
  const format = path.extname(file);
  if (format === '.yml' || format === '.yaml') {
    return yaml.load(fs.readFileSync(file, 'utf-8'));
  }
  return JSON.parse(fs.readFileSync(file, 'utf-8'));
};

export default parsers;
