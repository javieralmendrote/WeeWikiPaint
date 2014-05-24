/**
 * Created by javi on 24/05/14.
 */
"use strict";

var server = require ("./server.js");

exports.testNothing = function(test){
    test.equals(3,server.number(),"number");
    test.done();
};