/**
 * Created by javi on 31/05/14.
 */

// This is a simple spike of Node's HTTP module. The goal was to show how to serve a very simple HTML
// page using Node. It's not robust and it reflects avery basic understanding of Node; use it as a
// starting point,not a production-quality example.

var http = require ("http");

var server = http.createServer();

server.on("request", function(request, response){
    console.log("Received request");

    var body = "<html><head><title>Node HTTP Spike</title></head>" +
        "<body><p>This is a spike of Node's HTTP Server.</p></body></html>";

    // The following two approaches are equivalent:
    // The verbose way...
    // response.statusCode = 200;
    // response.write(body);
    // response.end();

    // The concise way...
    response.end(body);
});

server.listen(8080);

console.log("server started");