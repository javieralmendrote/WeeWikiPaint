/**
 * Created by javi on 09/06/14.
 */

// launch the server in the same way it happens in production
// get a page
// confirm we got something

(function() {
    "use strict";

    exports.test_for_smoke = function (test) {
        runProcess("weewikipaint homepage.html 404.html 8080");

        test.done();
    };

    function runProcess(command){
        
    }
}());