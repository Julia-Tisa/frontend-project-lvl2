#!/usr/bin/env node
import { program } from 'commander';
import genDiff from './index.js';

program
    .name('gendiff')
    .version('0.0.1')
    .usage('[options] <filepath1> <filepath2>')
    .description('Compares two configuration files and shows a difference')
    .arguments('<filepath1> <filepath2>')
    .option('-f, --format <type>', 'output format', 'stylish')
    .action((filepath1, filepath2) => {
        console.log(genDiff(filepath1, filepath2, program.opts().format))
    })
    
    program.parse(process.argv);

