import qbs
import qbs.Environment
import qbs.File

Product {
    id: qtcwizard
    name: "%WIZARD%"
    type: ["script"]
    
    Rule {
        id: rule
        multiplex: true
        requiresInputs: false
        alwaysRun: true


        Artifact {
            filePath: "qtcwizard.qbs"
            fileTags: ["script"]
        }

        prepare: {
            var cmd;
            cmd = new JavaScriptCommand();
            cmd.sourceCode = function() {
            
                // QBS-1144

                function obtainInstallationPath() {
                    var res;
                    if (qbs.targetOS == "windows") { // use "==" to compare qbs.targetOS
                        res = Environment.getEnv("APPDATA") + "/QtProject/qtcreator/templates/wizards"
                    } else {
                        res = Environment.getEnv("HOME") + "/.config/QtProject/qtcreator/templates/wizards"
                    }
                    return res;
                }

                function install(source, target) {
                    var res = [];

                    function _install(s, t) {
                        var files = File.directoryEntries(s, File.Files | File.Hidden);

                        File.makePath(t);

                        for (var f in files) {
                            var file = files[f];
                            var input = s + "/" + file;
                            var output = t + "/" + file;
                            File.copy(input, output);
                            console.info("Installing " + output);
                        }

                        var dirs = File.directoryEntries(s, File.Dirs | File.Hidden);

                        for (var i in dirs) {
                            var dir = dirs[i];
                            if (dir === "." || dir === "..") {
                                continue;
                            }
                            _install(s +"/" + dir , t + "/" + dir);
                        }
                    }

                    _install(source, target);
                    return res;
                }

                install(product.sourceDirectory + "/%WIZARD%"  , obtainInstallationPath() + "/%WIZARD%");
            }

            cmd.description = "Installing...";
            return [cmd];
        }
    }    
}


