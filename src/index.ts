#!/usr/bin/env node
import { Command } from 'commander';
import killCommand from './commands/kill.js';
import ipCommand from './commands/ip.js';
import rmCommand from './commands/rm.js';
import lsCommand from './commands/ls.js';

const program = new Command();

program.addCommand(rmCommand);

program.addCommand(killCommand);

program.addCommand(ipCommand);

program.addCommand(lsCommand);

program.parse(process.argv);
