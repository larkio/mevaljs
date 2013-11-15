define([
  'parse'
], function(parse) {

  // Object Contructor
  var mylib = function(obj) {
    return obj;
  };

  // Properties
  mylib.VERSION = '1.0.0';

  // Methods
  mylib.parse = parse;

  return mylib;
});
