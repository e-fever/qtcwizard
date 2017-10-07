QTCWizard - Create Custom Wizard for Qt Creator
======================

QTCWizrd converts your existing project into a custom wizard for Qt Creator. They are displayed in the New dialog that opens when you choose File > New File or Project.

Example Usage
------------

```
    $ cd $existing_project
    $ qtcwizard init
    generator.json created
    wizard.json created
    
    # Edit generator.json and wizard.json for customization
    
    $ qtcwizard install
    
    # Launch Qt Creator, choose  File > New File or Project > Application > Example Project.
    
```

Example Project

[junkcode/qtcwizard-project/project1 at master · benlau/junkcode](https://github.com/benlau/junkcode/tree/master/qtcwizard-project/project1)

Installation
------------

```
    cd qtcwizard
    npm install -g
```

Commands
========

```
$ qtcwizard

  Usage: qtcwizard [options] [command]


  Options:

    -V, --version       output the version number
    -C, --chdir <path>  change the working directory
    -h, --help          output usage information


  Commands:

    init               create default rule.json and wizard.json
    generate <output>  generate Qt Creator Wizard Project to the output folder
    install            install this wizard to the Qt Creator
```

Remarks: `qtcwizard install` only works in Linux/Mac at this moment.

Customization
==============

wizard.json
-----------

[Adding JSON-Based Wizards | Qt Creator Manual](http://doc.qt.io/qtcreator/creator-project-wizards-json.html)


generator.json
--------------
TODO

```
{
    "ignoreFilePattern": ["\\.swp$", "\\.DS_Store$"],
    "rules": [
        {
            "pattern": "project1.pro", // Apply the rule if the file path match the pattern.
            "path": [
                {
                    "find": "project1.pro",
                    "replace": "%{ProFileName}"
                }
            ]
        },
        {
            "pattern": ".*",
            "content": [ // Substitute the content
                {
                    "find": "\\\\",
                    "replace": "\\\\"
                }
            ]
        }
    ]
}
````
