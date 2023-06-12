#!/usr/bin/env node
import { Command } from 'commander';
import process from 'process';
import genDiff from '../src/formatters/index.js';
import getDiff from '../src/getdiff.js';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .option('-f, --format <type>', 'output format', 'stylish')
  .argument('<filepath1>', 'first configuration file')
  .argument('<filepath2>', 'second configuration file')
  .action((filepath1, filepath2, options) => {
    const filesDif = getDiff(filepath1, filepath2);
    console.log(genDiff(filesDif, options.format));
  });

program.parse(process.argv);
