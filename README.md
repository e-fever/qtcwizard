QTCWizard - Create Custom Wizard for Qt Creator
======================

QTCWizrd converts your existing project into a custom wizard for Qt Creator. They are displayed in the New dialog that opens when you choose File > New File or Project.

Example Usage
------------

```
    $ cd existing_project
    $ qtcwizard init
    generator.json created
    wizard.json created

    # Edit generator.json and wizard.json for customization

    $ qtcwizard install

    # Launch Qt Creator, choose  File > New File or Project > Application > Example Project.

```

Installation
------------

```
    cd qtcwizard
    npm install -g
```

Example Wizard
------

```
    cd example
    qtcwizard install
```

# Launch Qt Creator, choose  File > New File or Project > Application > QTCWizard Example


Advanced Example Projects
-----

 1. [e-fever-codebase/Qt-Quick-Unit-Test at master · e-fever/e-fever-codebase](https://github.com/e-fever/e-fever-codebase/tree/master/Qt-Quick-Unit-Test)
 1. [e-fever-codebase/Qt-Qml-Library-Project at master · e-fever/e-fever-codebase](https://github.com/e-fever/e-fever-codebase/tree/master/Qt-Qml-Library-Project)


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

    init               create default generator.json and wizard.json
    generate <output>  generate Qt Creator Wizard Project to the output folder
    install            install this wizard to the Qt Creator
```


Customization
==============

wizard.json
-----------

The wizard.json file contains sections that specify information about the wizard, variables that you can use, wizard pages, and generators for creating files. You have to input the required information by yourself except the `generators` property. It will be filled by qtcwizard automatically.

Reference: [Adding JSON-Based Wizards | Qt Creator Manual](http://doc.qt.io/qtcreator/creator-project-wizards-json.html)


generator.json
--------------

The generator.json file describes what files should be to the installed, how to substitute its content. qtcwizard relies on that information to generate the content of `generators` property in the wizard.json file.

```
{
    "ignoreFilePattern": ["\\.swp$", "\\.DS_Store$"], // Ignore those files. They will not be copied.
    "rules": [
        {
            "pattern": "project1.pro", // Apply the rule if the file path match the pattern (RegExp).
            "path": [ // Substitute the path
                {
                    "find": "project1.pro",
                    "replace": "%{ProFileName}",
                    "openAsProject": true // This file should be opened by Qt Creator upon creation
                }
            ]
        },
        {
            "pattern": ".*",
            "content": [ // Substitute the content
                {
                    "find": "\\\\", // Find "\" (RegExp)
                    "replace": "\\\\" // Replace by "\\"
                }
            ]
        }
    ]
}
````
