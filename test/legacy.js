"use strict";
let taser = require('../index').noCurrying;
require('should');

describe('Taser Legacy', () => {

  describe('Type Checking', () => {

    it('should not throw an error if the right type is passed', () => {
      taser('hello', ['string']);
      taser(3, ['number']);
      taser(null, ['null']);
      taser(undefined, ['undefined']);
      taser({ a: 1 }, ['object']);
      taser([1, 2, 3], ['array']);
    });

    it('should check for `function`s correctly', () => {
      taser(() => { }, ['function']);
    });

    it('should not recognize an array as an object', () => {
      taser.bind(null, [1, 2, 3], ['object']).should.throw;
    });

    it('should not recognize `null` as an object', () => {
      taser.bind(null, null, ['object']).should.throw;
    });

    it('should not recognize a function as an object', () => {
      taser.bind(null, () => { }, ['object']).should.throw;
    });
  });

  describe('Passing Objects', () => {
      it('should takes objects with a `type` property for the second argument', () => {
        taser('hello', {
          types: ['string']
        });
        taser(3, {
          types: ['number']
        });
        taser(null, {
          types: ['null']
        });
        taser(undefined, {
          types: ['undefined']
        });
        taser({ a: 1 }, {
          types: ['object']
        });
      });
  });

  describe('Value Checking', () => {

    it('should check values', () => {
      taser('hello', {
        types: ['string'],
        values: 'hello'
      });
    });

    it('should take `values` property with an array of valid values and throw an error when they don\'t match', () => {
      taser.bind(null, 'hello', {
        types: ['string'],
        values: 'not-hello'
      }).should.throw;
    });

    it('should take `values` property with an array of valid values and throw an error when they don\' match types', () => {
      taser.bind(null, '1', {
        types: ['string'],
        values: [1],
      }).should.throw;
    });

    it('should take objects as `values`', () => {
      taser({ a: 123 }, {
        types: ['object'],
        values: [{ a: 123 }]
      });
    });

    it('should take arrays as `values`', () => {
      taser([1, 2, 3], {
        types: ['array'],
        values: [[1, 2, 3]]
      });
    });

    it('should take functions as `values`', () => {
      var aFunc = (a1, b, c) => { return a1 + b + c; };
      taser(aFunc, {
        types: ['function'],
        values: [aFunc]
      });

      taser((a1, b, c) => { return a1 + b + c; }, {
        types: ['function'],
        values: [(a1, b, c) => { return a1 + b + c; }]
      });
    });
  });
});
