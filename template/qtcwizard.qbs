import qbs
import qbs.Environment

Product {
    name: "%WIZARD%"
    
    Group {
        name: "all"
        files: "**"
        excludeFiles: "./README.md"
        qbs.install: true
        qbs.installSourceBase: "."
        qbs.installRoot: {
            var res;
            if (qbs.targetOS == "windows") { // use "==" to compare qbs.targetOS
                res = Environment.getEnv("APPDATA") + "/QtProject/qtcreator/templates/wizards" 
            } else {
                res = Environment.getEnv("HOME") + "/.config/QtProject/qtcreator/templates/wizards/" 
            }
            return res;
        }
    }    
}


