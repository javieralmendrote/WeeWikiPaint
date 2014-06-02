/*global desc, task, jake, fail, complete */
    "use strict";
    var NODE_VERSION = "v0.10.28";

    desc("Build and test");
    task("default", ["Lint", "test"]);

    desc("Lint everything");
    function nodeLintOptions() {
        var options = {
            bitwise: true,
            curly: false,
            eqeqeq: true,
            forin: true,
            immed: true,
            latedef: true,
            newcap: true,
            noarg: true,
            noempty: true,
            nonew: true,
            regexp: true,
            undef: true,
            strict: true,
            trailing: true,
            node: true
        };
        return options;
    }

    task("Lint", ["nodeVersion"], function () {
        var lint = require("./build/lint/lint_runner.js");

        var files = new jake.FileList();
        files.include("**/*.js");
        files.exclude("node_modules");
        var options = nodeLintOptions();
        var passed = lint.validateFileList(files.toArray(), options, {});
        if (!passed) {
            fail("Lint failed.");
        }
    });

    desc("Test everything");
    task("test", ["nodeVersion"], function () {
        var reporter = require("nodeunit").reporters["default"];
        reporter.run(['src/server/_server_test.js'], null, function (failures) {
            if (failures) fail("Tests failed");
            complete();
        });
    }, {async: true});

    desc("Integrate");
    task("integrate", ["default"], function () {
        console.log("1. Make sure 'git status' is clean.");
        console.log("2. Build on the integration box.");
        console.log("   a. Walk over to integration box.");
        console.log("   b. 'git pull'");
        console.log("   c. 'jake'");
        console.log("   d. If jake fails, stop! Try again after fixing the issue.");
        console.log("3. 'get checkout integration'");
        console.log("4. 'git merge master --no-ff --log'");
        console.log("5. 'git checkout master'");
    });

//desc("Ensure correct version of Node is present. Use 'strict= true' to require exact match");
function parseNodeVersion(description, versionString){
    var versionMatcher = /^v(\d+)\.(\d+).(\d+)$/;   // v[major].[minor].[bugfix]
    var versionInfo = versionString.match(versionMatcher);
    if (versionInfo === null) fail("Could not parse " + description + " (was '" + versionString + "')");

    var major = parseInt(versionInfo[1], 10);
    var minor = parseInt(versionInfo[2], 10);
    var bugfix = parseInt(versionInfo[3], 10);

    return [major, minor, bugfix];
}

task("nodeVersion", [], function(){
   function failWithQualifier(qualifier) {
       fail("Incorrect node version. Expected " + qualifier +
            " [" + expectedString + "], but was [" + actualString + "].");
   }

    var expectedString = NODE_VERSION;
    var actualString = process.version;
    var expected = parseNodeVersion("expected Node version", expectedString);
    var actual = parseNodeVersion("Node version", actualString);

    if(process.env.strict){
        if (actual[0] !== expected[0] || actual[1] !== expected[1] || actual[2] !== expected[2]){
            failWithQualifier("exactly");
        }
    }
    else{
        if (actual[0] < expected[0]) failWithQualifier("at least");
        if (actual[0] === expected[0] && actual[1] < expected[1]) failWithQualifier("at least");
        if (actual[0] === expected[0] && actual[1] === expected[1] && actual[2] < expected[2]) failWithQualifier("at least");
    }
});

