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
    
    $ qtcwizard generate $output_path # Output path is the installation path of Qt Creator template
    
```

Installation
------------

```
    cd qtcwizard
    npm install -g
```

Customization
==============

wizard.json
-----------

[Adding JSON-Based Wizards | Qt Creator Manual](http://doc.qt.io/qtcreator/creator-project-wizards-json.html)


generator.json
--------------


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