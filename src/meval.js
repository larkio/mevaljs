define([
  'parse'
], function(parse) {

  // Object Contructor
  var mylib = function(obj) {
    return obj;
  };

  // Properties
  mylib.VERSION = '0.0.1';

  // Methods
  mylib.parse = parse;

  return mylib;
});
