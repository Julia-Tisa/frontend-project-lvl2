#!/usr/bin/env node
import { program } from 'commander';

program
    .name('gendiff')
    .version('0.0.1')
    .usage('[options] <filepath1> <filepath2>')
    .description('Compares two configuration files and shows a difference')
    .arguments('<files...>')
    .option('-f, --format <type>', 'output format')

    program.parse(process.argv);