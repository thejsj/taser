"use strict";
let taser = require('../taser');

describe('Taser', () => {

  describe('Type Checking', () => {

    it('should not throw an error if the right type is passed', () => {
      taser('hello', ['string']);
      taser(3, ['number']);
      taser(null, ['null']);
      taser(undefined, ['undefined']);
      taser({ a: 1 }, ['object']);
      taser([1, 2, 3], ['array']);
    });

    it('should recognize an array as an object', () => {
      taser.bind(null, [1, 2, 3], ['object']).should.throw();
    });

  });

  describe('Value Checking', function () {

  });
});
