var fs = require('fs');
var shell = require('shelljs');
const path = require('path');
var prerequisite = require("./prerequisite.js");

function mkdirAndCp(basePath, sourceFile, outputFolder) {
    var basedSourceFile = path.resolve(basePath, sourceFile);
    
    shell.mkdir("-p", outputFolder + "/" + path.dirname(basedSourceFile));
    shell.cp(sourceFile, outputFolder);
}

function run(input, output) {
    
    if (!prerequisite(input)) {
        return -1;
    }

    var generatorFile = input + "/generator.json";

    var generator = JSON.parse(shell.cat(generatorFile));
    
    var defaultIgnorePattern = ["generator.json" , "wizard.json"];
    generator.ignoreFilePattern = generator.ignoreFilePattern ? generator.ignoreFilePattern.concat(defaultIgnorePattern) : defaultIgnorePattern
    
    var files = shell.find(input).filter(function(file) {
        var name = path.basename(file);
        return !shell.test("-d", file) && name.toLocaleLowerCase !== "generator.json" 
    });

    var generators = [];
    var basePath = path.resolve(input) + "/";

    var files = files.filter(function(file){
        // Step 1 - Filter out files which should not be copied

        var source = file.replace(basePath, "");

        return generator.ignoreFilePattern.reduce(function(acc, value) {
            var res = source.match(value);
            if (res) {
                acc.include = false;
            }
            return acc;
        }, { include: true} ).include;
        
    }).filter(function(file) {
        // Step 2 - process icon
        if (generator.hasOwnProperty("icon")) {
            var basename = path.relative(input, file);   
            if (generator.icon === basename) {
                mkdirAndCp(input, file, output);
                return false;
            }
        }        
        return true;
    }).map(function(file) {
        // Process each file and return the properties for "generator" of this file
        var item = {
            source:  path.relative(basePath, file),
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
        
        var outputFile = path.resolve(output, path.relative(input, item.source));

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

    var wizardFilePath = path.resolve(input, "wizard.json");
    var content = shell.cat(wizardFilePath);
    var wizard = JSON.parse(content);

    wizard.generators = [
        {
            typeId: "File",
            "data": files
        }
    ];
    
    if (generator.hasOwnProperty("icon")) {
        wizard.icon = generator.icon;    
    }

    shell.ShellString(JSON.stringify(wizard,null,4)).to(path.resolve(output, "wizard.json"));
    console.log("Exported to " + output);
}

module.exports = run
