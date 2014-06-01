/**
 * Created by javi on 24/05/14.
 */
"use strict";

var server = require ("./server.js");
var http = require ("http");

exports.tearDown = function(done) {
    console.log("tear down start");
    server.stop(function() {
        console.log("stop callback");
        //todo: need test.done() equivalent here
        done();
    });
    console.log("tear down end");
};

//TODO: handle case where stop() is called before start()
//TODO: test-drive stop() callback

//exports.testSpike = function(test) {
//    server.start();
//    http.get("http://localhost:8080/", function(res){
//        console.log("Got response: " + res.statusCode);
//        test.done();
//        res.on("data", function(){});
//    }).on('error', function(e){
//        console.log("Got error: " + e.message);
//    });
//};

exports.testHttpServer = function(test) {
    console.log("test started");
    server.start();
    console.log("server started");

    http.get("http://localhost:8080", function(response) {
        console.log("response callback");
        response.on("data", function(){});
        test.done();
        console.log("test done");
    });
    console.log("get called");
};
