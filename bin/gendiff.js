#!/usr/bin/env node
/* eslint-disable no-console */
import { Command } from 'commander';
import fs from 'fs';
import path from 'path';
import process from 'process';
import _ from 'lodash';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .option('-f, --format <type>', 'output format')
  .argument('<filepath1>', 'first configuration file')
  .argument('<filepath2>', 'second configuration file')
  .action((filepath1, filepath2, options) => {
    const objFile1 = JSON.parse(fs.readFileSync(filepath1));
    const objFile2 = JSON.parse(fs.readFileSync(filepath2));
    const arrFile1 = _.sortBy(Object.entries(objFile1));
    const arrFile2 = _.sortBy(Object.entries(objFile2));
    const uniqArr = _.uniqWith([...arrFile1, ...arrFile2], _.isEqual);
    const getSign = (request, arr1, arr2) => {
      if (
        arr1.filter((item) => _.isEqual(item, request)).length
        && arr2.filter((item) => _.isEqual(item, request)).length
      ) {
        return '  ';
      }
      if (arr1.filter((item) => _.isEqual(item, request)).length) {
        return '- ';
      }
      return '+ ';
    };

    const resultArr = uniqArr.map((item) => {
      const sign = getSign(item, arrFile1, arrFile2);
      const [key, value] = item;
      return [sign + key, value].join(': ');
    });
    console.log(`{\n  ${resultArr.join('\n  ')}\n}`);
  });

program.parse(process.argv);
