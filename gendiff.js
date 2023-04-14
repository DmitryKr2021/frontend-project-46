#!/usr/bin/env node
import { Command } from 'commander';
import { readFileSync } from 'fs';
import { path } from 'path';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1') 
  .option('-f, --format <type>', 'output format')
  .argument('<filepath1>', 'first configuration file')
  .argument('<filepath2>', 'second configuration file')
  .action((filepath1, filepath2, options) => {
    const objFile1 = JSON.parse(readFileSync(`${filepath1}.json`));
    console.log(objFile1);
    console.log(path.resolve(filepath1));
    //const objFile2 = JSON.parse(readFileSync(`${filepath2}.json`));
    //console.log(objFile2);
  });
program.parse(process.argv);