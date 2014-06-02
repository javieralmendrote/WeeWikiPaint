/**
 * Created by javi on 31/05/14.
 */

//This spike demonstrates how to serve a static file

"use strict";

var http = require ("http");
var fs = require("fs");

var server = http.createServer();

server.on("request", function(request, response){
    console.log("Received request");

    fs.ReadFile('file.html', function(err, data){
       if (err) throw err;
        response.end(data);
    });

});

server.listen(8080);

console.log("server started");