#!/usr/bin/env node
var program = require('commander');
var init = require("./init.js");
var shell = require('shelljs');
var generate = require("./generate.js");

program
    .version('0.0.1')
    .option('-C, --chdir <path>', 'change the working directory')

program
    .command('init')
    .description("create default rule.json and wizard.json")
    .action(function(cmd,options) {
        init(shell.pwd().toString());
    });

program
    .command("generate <output>")
    .description("generate Qt Creator Wizard Project folder")
    .action(function(cmd, options) {
        generate(shell.pwd().toString(), cmd);
    });


program.parse(process.argv);

if (!process.argv.slice(2).length) {
    program.outputHelp();
}
