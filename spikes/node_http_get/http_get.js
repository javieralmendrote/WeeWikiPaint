/**
 * Created by javi on 01/06/14.
 */

// This spike shows how to get a URL using Node's HTTP module.
"use strict";

var http = require("http");

http.get("http://www.google.com/index.html", function(res) {
    console.log("Get response: " + res.statusCode);
}).on('error', function(e) {
    console.log("Got error: " + e.message);
});