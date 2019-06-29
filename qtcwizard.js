#!/usr/bin/env node
var program = require('commander');
var init = require("./init.js");
var shell = require('shelljs');
var generate = require("./generate.js");
const path = require('path');
var prerequisite = require("./prerequisite.js");
var sanitize = require("sanitize-filename");
var os = require('os');

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

        var target;
        if (os.platform() === "win32") {
            target = shell.env["APPDATA"] + "/QtProject/qtcreator/templates/wizards/" +  sanitize(wizard.trDisplayName)
        } else {
            target = shell.env["HOME"] + "/.config/QtProject/qtcreator/templates/wizards/" +  sanitize(wizard.trDisplayName)
        }

        shell.mkdir("-p", target);
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

        function create(src, dst) {
            var target = dst + "/" + path.basename(src)

            if (shell.test("-f", target)){
                console.log("Skip " + target);
                return;
            }

            var content = shell.cat(src).toString();
            content = content.replace(new RegExp("%WIZARD%","g"), projectName);
            shell.ShellString(content).to(target);
            console.log("Created " + target);
        }

        shell.mkdir("-p", output);
        create(__dirname + "/template/qtcwizard.qbs", output);
        create(__dirname + "/template/install.sh", output);
        create(__dirname + "/template/README.md", output);

        shell.chmod("u+x", output + "/install.sh");

        generate(source, target);
    });

program.parse(process.argv);

if (!process.argv.slice(2).length) {
    program.outputHelp();
}
