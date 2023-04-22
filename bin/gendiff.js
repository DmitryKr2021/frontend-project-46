#!/usr/bin/env node
/* eslint-disable import/extensions */
/* eslint-disable no-console */
import { Command } from 'commander';
// import path from 'path';
import process from 'process';
import compare from '../src/compare.js';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .option('-f, --format <type>', 'output format')
  .argument('<filepath1>', 'first configuration file')
  .argument('<filepath2>', 'second configuration file')
  .action((filepath1, filepath2, options) => compare(filepath1, filepath2, options));

program.parse(process.argv);
