task("default", ["Lint"]);

desc("Lint everything");

task("Lint", [], function() {
    var lint = require("./build/lint/lint_runner.js");
    lint.validateFile("Jakefile.js", {}, {});
});
