#!/usr/bin/env node
import { Command } from 'commander';
import { readFileSync } from 'node:fs';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1') 
  .option('-f, --format <type>', 'output format')
  .argument('<filepath1>', 'first configuration file')
  .argument('<filepath2>', 'second configuration file')
  .action((filepath1, filepath2, options) => {
    console.log(filepath1)
  });
program.parse(process.argv);