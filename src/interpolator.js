const expect = require('chai').expect;

// TODO allow variable input in templates like { variable.name }
class Interpolator {
  // enter a string like 'text {variablename} text'
  // delimiters should be given in string or array format in the case of multiple character delimiters
  constructor(str, delimiters='{}') {
    // turn delimiters into array
    if (typeof delimiters === 'string') {
      expect(delimiters.length).to.equal(2);
      delimiters = delimiters.split('');
    }
    this.delimiters = delimiters;

    this.templateString = str;
    // if the given string is 'text {variablename} text'
    // template is ['text ', 'variablename', ' text']
    this.template = str.split(new RegExp(`(?:${delimiters[0]}|${delimiters[1]})`));

    // the length of template should be odd
    // because that means there is a opening delimiter for each closing delimiter
    expect(this.template).to.satisfy(function(template) {
      return template.length % 2 === 1;
    });
  }

  // generate the string given replacements for the placeholders
  generateString(vars) {
    let result = '';
    for (let i = 0; i < this.template.length; i++) {
      let s = this.template[i];

      if (i % 2 === 1) { // if odd then is placeholder
        if (s in vars) {
          result += vars[s];
        } else {
          // if a variable isnt given in vars
          // concatenate the variable name with delimiters instead
          result += this.delimiters[0] + s + this.delimiters[1];
        }
      } else { // else is just regular text
        result += s;
      }
    }
    return result;
  }
}

module.exports = Interpolator;
