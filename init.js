var fs = require('fs');
var shell = require('shelljs');
const path = require('path');
var defaultWizardJson = require("./default-wizard.js");
var defaultGeneratorJson = require("./default-generator");

function run(output) {
    var generatorsFilePath = path.resolve(output, "generator.json");

    if (!shell.test("-e", generatorsFilePath)) {
        shell.ShellString(JSON.stringify(defaultGeneratorJson,null,4)).to(generatorsFilePath);
        console.log("generator.json created");
    }
    
    var wizardFilePath = path.resolve(output, "wizard.json");
    
    if (!shell.test("-e", wizardFilePath)) {
        shell.ShellString(JSON.stringify(defaultWizardJson,null,4)).to(wizardFilePath);
        console.log("wizard.json created");
    }
    
}

module.exports = run;