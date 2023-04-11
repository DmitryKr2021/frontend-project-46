#!/usr/bin/env node
import { Command } from 'commander';
const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1');

program.command('gendiff')
  .description('Compares two configuration files and shows a difference')
  .argument('<first>', 'first configuration file')
  .argument('<second>', 'second configuration file')
  .option('-h, --help', 'display help for command')
  .option('-V, --version', 'output the version number')
  .action((first, second, options) => {
    console.log('Hi!')
  });

program.parse();