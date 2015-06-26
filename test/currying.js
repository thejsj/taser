/*jshing esnext: true */
"use strict";
let taser = require('../index');
require('should');

describe('Currying Functions', () => {

  describe('Type Checking', () => {

    it('should not throw an error if the right type is passed', () => {
      taser(['string'])('hello');
      taser(['number'])( 3);
      taser(['null'])( null);
      taser(['undefined'])(undefined);
      taser(['object'])({ a: 1 });
      taser(['array'])([1, 2, 3]);
    });

    it('should check for `function`s correctly', () => {
      taser(['function'])(() => { });
    });

    it('should not recognize an array as an object', () => {
      taser(['object']).bind(null, [1, 2, 3]).should.throw;
    });

    it('should not recognize `null` as an object', () => {
      taser(['object']).bind(null, null).should.throw;
    });

    it('should not recognize a function as an object', () => {
      taser(['object']).bind(null, () => { }).should.throw;
    });
  });

  describe('Passing Objects', () => {
      it('should takes objects with a `type` property for the second argument', () => {
        taser({
          types: ['string']
        })('hello');
        taser({
          types: ['number']
        })(3);
        taser({
          types: ['null']
        })(null);
        taser({
          types: ['undefined']
        })(undefined);
        taser({
          types: ['object']
        })({ a: 1 });
      });
  });

  describe('Value Checking', () => {

    it('should check values', () => {
      taser({
        types: ['string'],
        values: 'hello'
      })('hello');
    });

    it('should take `values` property with an array of valid values and throw an error when they don\'t match', () => {
      taser({
        types: ['string'],
        values: 'not-hello'
      }).bind(null, 'hello').should.throw;
    });

    it('should take `values` property with an array of valid values and throw an error when they don\' match types', () => {
      taser({
        types: ['string'],
        values: [1],
      }).bind(null, '1').should.throw;
    });

    it('should take objects as `values`', () => {
      taser({
        types: ['object'],
        values: [{ a: 123 }]
      })({ a: 123 });
    });

    it('should take arrays as `values`', () => {
      taser({
        types: ['array'],
        values: [[1, 2, 3]]
      })([1, 2, 3]);
    });

    it('should take functions as `values`', () => {
      var aFunc = (a1, b, c) => { return a1 + b + c; };
      taser({
        types: ['function'],
        values: [aFunc]
      })(aFunc);

      taser({
        types: ['function'],
        values: [(a1, b, c) => { return a1 + b + c; }]
      })((a1, b, c) => { return a1 + b + c; });
    });
  });
});
