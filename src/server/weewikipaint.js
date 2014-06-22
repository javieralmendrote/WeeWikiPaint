/**
 * Created by javi on 15/06/14.
 */
(function(){
    "use strict";

    var server = require("./server.js");
    server.start("src/server/content/homepage.html", "404.html", 8080, function(){
        console.log("Server started");
    });
}());