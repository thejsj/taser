"use strict";
let taser = require('../taser');
require('should');

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

    it('should not recognize an array as an object', () => {
      taser.bind(null, [1, 2, 3], ['object']).should.throw;
    });

    it('should not recognize `null` as an object', () => {
      taser.bind(null, null, ['object']).should.throw;
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

  });

  describe('Value Checking', function () {

    it('should take `values` property with an array of valid values', () => {
      taser('hello', {
        types: ['string'],
        values: 'hello'
      });
    });

    it('should take `values` property with an array of valid values', () => {
      taser.bind(null, 'hello', {
        types: ['string'],
        values: 'not-hello'
      }).should.throw;
    });

  });
});
