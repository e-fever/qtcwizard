import qbs
import qbs.Environment

Project {


    Product {
        Group {
            name: "all"
            files: "**"
            qbs.install: true
            qbs.installSourceBase: "."
            qbs.installRoot: {
                var res;
                if (qbs.targetOS === "windows") {
                    res = Environment.getEnv("APPDATA") + "/QtProject/qtcreator/templates/wizards" 
                } else {
                    res = Environment.getEnv("HOME") + "/.config/QtProject/qtcreator/templates/wizards/" 
                }
                return res;
            }
        }    
    }


}