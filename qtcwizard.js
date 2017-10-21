#!/usr/bin/env node
var program = require('commander');
var init = require("./init.js");
var shell = require('shelljs');
var generate = require("./generate.js");
const path = require('path');
var prerequisite = require("./prerequisite.js");
var sanitize = require("sanitize-filename");

program
    .version('0.0.1')
    .option('-C, --chdir <path>', 'change the working directory')

program
    .command('init')
    .description("create default generator.json and wizard.json")
    .action(function(cmd,options) {
        init(shell.pwd().toString());
    });

program
    .command("generate <output>")
    .description("generate Qt Creator Wizard Project to the output folder")
    .action(function(cmd, options) {
        generate(shell.pwd().toString(), cmd);
    });

program
    .command("install")
    .description("install this wizard to the Qt Creator")
    .action(function(cmd, options) {
        var source = shell.pwd().toString();
        if (!prerequisite(source)) {
            return -1;
        }
    
        var wizard = JSON.parse(shell.cat(source + "/wizard.json").toString());
    
        var target = shell.env["HOME"] + "/.config/QtProject/qtcreator/templates/wizards/" +  sanitize(wizard.trDisplayName)
        generate(source, target);
    });

program
    .command("pack-installer <output>")
    .description("create a installable package")
    .action(function(cmd, options) {
        var source = shell.pwd().toString();
        var output = cmd;

        if (!prerequisite(source)) {
            return -1;
        }
    
        var wizard = JSON.parse(shell.cat(source + "/wizard.json").toString());
        var projectName = sanitize(wizard.trDisplayName);
        var target = output + "/" + projectName;

        function cp(src, dst) {
            var target = dst + "/" + path.basename(src)
            var content = shell.cat(src).toString();
            content = content.replace(new RegExp("%WIZARD%","g"), projectName);
            shell.ShellString(content).to(target);                                                  
            console.log("Created " + target);
        }
    
        cp(__dirname + "/template/qtcwizard.qbs", output);
        cp(__dirname + "/template/README.md", output);

        generate(source, target);
    });

program.parse(process.argv);

if (!process.argv.slice(2).length) {
    program.outputHelp();
}
