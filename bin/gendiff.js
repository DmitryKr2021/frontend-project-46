#!/usr/bin/env node
/* eslint-disable import/extensions */
/* eslint-disable no-console */
import { Command } from 'commander';
import process from 'process';
import getDiff from '../src/getdiff.js';
import stylish from '../src/formatters/stylish.js';
import plain from '../src/formatters/plain.js';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .option('-f, --format <type>', 'output format', 'stylish')
  .argument('<filepath1>', 'first configuration file')
  .argument('<filepath2>', 'second configuration file')
  .action((filepath1, filepath2, options) => {
    if (options.format === 'plain') {
      console.log(plain(getDiff(filepath1, filepath2)));
    } else {
      console.log(stylish(getDiff(filepath1, filepath2)));
    }
  });

program.parse(process.argv);
