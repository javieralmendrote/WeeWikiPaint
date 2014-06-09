/**
 * Created by javi on 24/05/14.
 */
"use strict";

var http = require("http");
var fs = require("fs");
var server;

exports.start = function(homePageToServe, notFoundPageToServe, portNumber){
    if (!portNumber) throw new Error("port number is required");

    server = http.createServer();
    server.on("request", function(request, response){
        if (request.url === "/" || request.url === "/index.html"){
            fs.readFile(homePageToServe, function (err, data) {
                if (err) throw err;
                response.end(data);
            });
        }
        else {
            response.statusCode = 404;
            response.end();
        }
    });
    server.listen(portNumber);
};

exports.stop = function(callback){
    server.close(callback);
};