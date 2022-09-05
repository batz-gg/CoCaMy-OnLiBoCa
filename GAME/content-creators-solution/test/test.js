var fs = require('fs');
var vm = require('vm');
var path = 'js/request-logic.js';

var code = fs.readFileSync(path);
vm.runInThisContext(code);

var should = require('chai').should();

describe('getContentType()', function() {
  it('a function called getContentType should exist', function() {
    should.equal(typeof getContentType, 'function');
  });

  it('should return "text/html" for filenames ending in .html', function() {
    should.equal(getContentType('index.html'), 'text/html');
  });

  it('should return "text/css" for filenames ending in .css', function() {
    should.equal(getContentType('style.css'), 'text/css');
  });

  it('should return "image/jpeg" for filenames ending in .jpeg', function() {
    should.equal(getContentType('image.jpeg'), 'image/jpeg');
  });

  it('should return "image/jpeg" for filenames ending in .jpg', function() {
    should.equal(getContentType('image.jpg'), 'image/jpeg');
  });

  it('should return "text/plain" for all other file extensions', function() {
    should.equal(getContentType('image.unknown'), 'text/plain');
  });
});