var shell = require('shelljs');

module.exports = function(path) {

    if (!shell.test("-f", path + "/generator.json") ){
        console.log("generator.json not found. Please run `qtcwizard init` to create default generator.json");
        return false;
    }

    if (!shell.test("-f", path + "/wizard.json")) {
        console.log("wizard.json not found. Please run `qtcwizard init` to create default generator.json");
        return false;        
    }

    return true;
}