/**
 * Created by javi on 09/06/14.
 */

// launch the server in the same way it happens in production
// get a page
// confirm we got something

(function() {
    "use strict";

    var child_process = require("child_process");
    var http = require("http");
    var child;

    exports.setUp = function(done){
        runServer(done);
    };

    exports.tearDown = function(done){
        child.on("exit", function(code, signal){
            done();
        });
        child.kill();
    };

    exports.test_canGetHomePage = function (test) {
        httpGet("http://localhost:8080", function (response, receivedData) {
            var foundHomePage = receivedData.indexOf("WeeWikiPaint home page") !== -1;
            test.ok(foundHomePage, "home page should have contained WeeWikiPaint marker");
            test.done();
        });
    };

    //TODO: check 404 page

    function runServer(callback){
        child = child_process.spawn("node", ["src/server/weewikipaint", "8080"]);
        child.stdout.setEncoding("utf8");
        child.stdout.on("data", function(chunk){
            if (chunk.trim() === "Server started") callback();
        });
    }

    //TODO: eliminate duplication with _server_test.js file
    function httpGet(url, callback) {
        var request = http.get(url);
        request.on("response", function (response) {
            var receivedData = "";
            response.setEncoding("utf8");

            response.on("data", function (chunk) {
                receivedData += chunk;
            });
            response.on("end", function () {
                    callback(response, receivedData);
            });
        });
    }
}());