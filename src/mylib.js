define([
  'camelize',
  'capitalize',
  'dasherize',
  'random',
  'slugify',
  'trim',
  'parse'
], function(camelize, capitalize, dasherize, random, slugify, trim, parse) {

  // Object Contructor
  var mylib = function(obj) {
    return obj;
  };

  // Properties
  mylib.VERSION = '1.0.0';

  // Methods
  mylib.camelize = camelize;
  mylib.capitalize = capitalize;
  mylib.dasherize = dasherize;
  mylib.random = random;
  mylib.slugify = slugify;
  mylib.trim = trim;
  mylib.parse = parse;

  return mylib;
});
