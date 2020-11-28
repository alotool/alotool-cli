var fs = require('fs');
var should = require('should');

describe('tasks', function() {
  describe('js', function() {
    it('should equal', function() {
      var file = fs.readFileSync('test/tasks/blogger/js/src/dist/js.js');
      var expected = fs.readFileSync('test/tasks/blogger/js/expected/js.js');
      String(file).should.equal(String(expected));
    });
  });
  describe('js-in-template', function() {
    it('should equal', function() {
      var file = fs.readFileSync('test/tasks/blogger/js/src/js/js-in-template.js');
      var expected = fs.readFileSync('test/tasks/blogger/js/expected/js-in-template.js');
      String(file).should.equal(String(expected));
    });
  });

  describe('sass', function() {
    it('should equal', function() {
      var file = fs.readFileSync('test/tasks/blogger/sass/src/dist/sass.css');
      var expected = fs.readFileSync('test/tasks/blogger/sass/expected/sass.css');
      String(file).should.equal(String(expected));
    });
  });
  describe('sass-in-template', function() {
    it('should equal', function() {
      var file = fs.readFileSync('test/tasks/blogger/sass/src/sass/_sass-in-template.scss');
      var expected = fs.readFileSync('test/tasks/blogger/sass/expected/_sass-in-template.scss');
      String(file).should.equal(String(expected));
    });
  });

  describe('skin', function() {
    it('should equal', function() {
      var file = fs.readFileSync('test/tasks/blogger/skin/src/dist/skin.css');
      var expected = fs.readFileSync('test/tasks/blogger/skin/expected/skin.css');
      String(file).should.equal(String(expected));
    });
  });
  describe('skin-in-template', function() {
    it('should equal', function() {
      var file = fs.readFileSync('test/tasks/blogger/skin/src/skin/skin-in-template.css');
      var expected = fs.readFileSync('test/tasks/blogger/skin/expected/skin-in-template.css');
      String(file).should.equal(String(expected));
    });
  });

  describe('template', function() {
    it('should equal', function() {
      var file = fs.readFileSync('test/tasks/blogger/template/dist/theme.xml');
      var expected = fs.readFileSync('test/tasks/blogger/template/expected/theme.xml');
      String(file).should.equal(String(expected));
    });
  });
  describe('template-variant-foo', function() {
    it('should equal', function() {
      var file = fs.readFileSync('test/tasks/blogger/template/dist/theme-foo.xml');
      var expected = fs.readFileSync('test/tasks/blogger/template/expected/theme-foo.xml');
      String(file).should.equal(String(expected));
    });
  });
  describe('template-variant-bar-baz', function() {
    it('should equal', function() {
      var file = fs.readFileSync('test/tasks/blogger/template/dist/theme-bar-baz.xml');
      var expected = fs.readFileSync('test/tasks/blogger/template/expected/theme-bar-baz.xml');
      String(file).should.equal(String(expected));
    });
  });
});
