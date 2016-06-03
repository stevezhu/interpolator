const expect = require('chai').expect;

const Interpolator = require('../src/interpolator');

describe('Interpolator', function() {
  describe('#constructor', function() {
    it("should throw an error because of unbalanced delimiters", function() {
      expect(function() {
        new Interpolator('text varname} text');
      }).to.throw(Error);
    });

    it("should set the template correctly with given delimiters", function() {
      let ts = new Interpolator('text {{varname] {{othervar] text', ['{{', ']']);
      expect(ts.template).to.eql(['text ', 'varname', ' ', 'othervar', ' text']);
    });

    it("should set the template correctly with default delimiters", function() {
      let ts = new Interpolator('text {varname} {othervar} text');
      expect(ts.template).to.eql(['text ', 'varname', ' ', 'othervar', ' text']);
    });
  });

  describe('#generateString', function() {
    let ts = new Interpolator('text {varname} {othervar} text');

    it("should return the string with the given variables correctly replaced", function() {
      let str = ts.generateString({
        varname: 'replacement text',
        othervar: 'other'
      });
      expect(str).to.equal('text replacement text other text');
    });

    it("should concatenate the variable name with delimiters for variables that aren't given", function() {
      let str = ts.generateString({
        varname: 'replacement text'
      });
      expect(str).to.equal('text replacement text {othervar} text');
    });
  });
});
