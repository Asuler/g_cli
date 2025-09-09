#!/usr/bin/env node
import { Command } from "commander";
import killCommand from "./commands/kill.js";
import ipCommand from "./commands/ip.js";
import rmCommand from "./commands/rm.js";
import lsCommand from "./commands/ls.js";
import portCommand from "./commands/port.js";

const program = new Command();

program.name("g");

program.addCommand(rmCommand);

program.addCommand(killCommand);

program.addCommand(ipCommand);

program.addCommand(lsCommand);

program.addCommand(portCommand);

program.parse(process.argv);
