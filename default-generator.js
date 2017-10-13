module.exports = {
    /// The files to be ignored
    ignoreFilePattern: [
        "\\.swp$", 
        "\\.DS_Store$", 
        "\\.pro.user$",
        "\\.qmlc$",
        "\\.jsc$"
    ],
    rules: [
        {
            pattern: ".*",
            content: [
                {
                    "find": "\\\\", // RegExp - Find every "\"
                    "replace": "\\\\" // Replace by "\\"
                }
            ]
        },
        {
            pattern: "\\.pro$",
            openAsProject: true 
        }
    ]
}