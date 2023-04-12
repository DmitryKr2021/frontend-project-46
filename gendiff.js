#!/usr/bin/env node
import { Command } from 'commander';
const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')
  .option('-V, --version', 'output the version number 12345')
  .option('-h, --help', 'display help for command')
  .option('-f, --format <type>', 'output format')

  .command('gendiff')
  .argument('<filepath1>', 'first configuration file')
  .argument('<filepath2>', 'second configuration file')
  .action((filepath1, filepath2, options) => {
    console.log(filepath1)
  });

program.parse(process.argv);