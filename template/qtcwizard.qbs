import qbs
import qbs.Environment

Project {


    Product {
        Group {
            name: "all"
            files: "**"
            qbs.install: true
            qbs.installRoot: Environment.getEnv("HOME") + "/.config/QtProject/qtcreator/templates/wizards/" 
        }    
    }


}