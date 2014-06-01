/**
 * Created by javi on 24/05/14.
 */
"use strict";

var http = require("http");
var server;

exports.start = function(){
    console.log("start called");
    server = http.createServer();
    console.log("server called");

    server.on("request", function(request, response){
        console.log("request called");
        response.end();
    });

    console.log("'on' called");
    server.listen(8080);    //TODO: remove duplication of port number

    console.log("Listen called");
};

exports.stop = function(callback){
    console.log("stop called");
    server.close(callback);
};