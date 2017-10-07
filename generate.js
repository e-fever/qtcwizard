var fs = require('fs');
var shell = require('shelljs');
const path = require('path');

function run(input, output) {

    var generatorFile = input + "/generator.json";

    if (!shell.test("-f", generatorFile ) ){
        console.log("generator.json not found. Please run `qtcwizard init` to create default generator.json");
        return -1;
    }

    var generator = JSON.parse(shell.cat(generatorFile));
    
    var defaultIgnorePattern = ["generator.json"];
    generator.ignoreFilePattern = generator.ignoreFilePattern ? generator.ignoreFilePattern.concat(defaultIgnorePattern) : defaultIgnorePattern
    
    if (!shell.test("-f", input + "/wizard.json")) {
        console.log("wizard.json not found. Please run `qtcwizard init` to create default generator.json");
        return -1;        
    }

    var files = shell.find(input).filter(function(file) {
        var name = path.basename(file);
        return !shell.test("-d", file) && name.toLocaleLowerCase !== "generator.json" 
    });

    var generators = [];
    var basePath = path.resolve(input) + "/";

    var files = files.filter(function(file){

        var source = file.replace(basePath, "");

        return generator.ignoreFilePattern.reduce(function(acc, value) {
            var res = source.match(value);
            if (res) {
                acc.include = false;
            }
            return acc;
        }, { include: true} ).include;
        
    }).map(function(file) {
        var item = {
            source: file.replace(basePath, ""),
            content: shell.cat(file)
        };
        
        item.target = item.source;
        
        item = generator.rules.reduce(function(item, rule) {
            rule.path = rule.path ? rule.path : []
            rule.content = rule.content ? rule.content : []
            
            if (!item.source.match(rule.pattern)) {
                return item;
            }
            
            if (rule.openAsProject) {
                item.openAsProject = rule.openAsProject
            }
            
            item.target = rule.path.reduce(function(acc, value) {
                return acc.replace(new RegExp(value.find, "g"), value.replace);
            }, item.target);
            
            item.content = rule.content.reduce(function(acc, value) {
                return acc.replace(new RegExp(value.find, "g"), value.replace);
            }, item.content);
            
            return item;            
        }, item);
        
        var outputFile = path.resolve(output, item.source);

        var dirname = path.dirname(outputFile);

        shell.mkdir("-p", dirname);

        shell.ShellString(item.content).to(outputFile);

        var res = {
            source: item.source,
            target: item.target
        }
        
        if (item.openAsProject) {
            res.openAsProject = true;  
        }

        return res;
    });

    var wizardFilePath = path.resolve(output, "wizard.json");
    var content = shell.cat(wizardFilePath);
    var wizard = JSON.parse(content);

    wizard.generators = [
        {
            typeId: "File",
            "data": files
        }
    ];

    shell.ShellString(JSON.stringify(wizard,null,4)).to(wizardFilePath);
   
}

module.exports = run