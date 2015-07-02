/*jshing esnext: true */
"use strict";
let taser = require('../index');
require('should');

describe('Taser Interface', function () {

  let personInterface = new taser.Interface({
      first_name: taser('string'),
      last_name: taser('string'),
      age: taser('number'),
  });

  describe("Init", ()  => {

    it('should throw an error when trying to declare an interface with a string', () => {
      (() => {
        var superFakeInterface = new taser.Interface("hello");
      }).should.throw();
    });

    it('should not throw an error when passed an object with function', () => {
      (() => {
        var otherInterface = new taser.Interface({
          first_name: taser('string'),
          last_name: taser('string'),
          age: taser('number'),
        });
      }).should.not.throw();
    });


  });

  describe("Validation", () => {
    it('should not throw an error when passed an interface that validates', () => {
      taser(personInterface).bind(null, {
        first_name: 'jorge',
        last_name: 'silva',
        age: 234
      }).should.not.throw();
    });

    it('should throw an error when passed an interface that is not valid', () => {
      taser(personInterface).bind(null, {
        first_name: 'jorge',
        last_name: 'silva',
        age: '234' // This is not a number
      }).should.throw();
    });

    it('should throw an error when passed an interface is created with a non taser function', () => {
      taser(new taser.Interface({ first_name: () => { }})).bind(null, {
        first_name: 'jorge',
      }).should.throw();
    });

    it('should not throw an error when passed a property that is not defined in the interface', () => {
      taser(new taser.Interface({ first_name: () => { }})).bind(null, {
        first_name: 'jorge',
        property_not_defined: 'not_defined'
      }).should.throw();
    });
 });

  describe("Sub-Object Validation", ()  => {

    let userInterface = new taser.Interface({
        first_name: taser('string'),
        last_name: taser('string'),
        age: taser('number'),
        address: {
          street: taser('string'),
          city: taser('string')
        }
    });

    it('should not throw an error when passed an interface with nested objects that is valid', () => {
      taser(userInterface).bind(null, {
        first_name: 'jorge',
        last_name: 'silva',
        age: 234,
        address: {
          street: 'Larkin',
          city: 'San Francisco'
        }
      }).should.not.throw();
    });

    it('should not throw an error when passed an interface with nested objects that is not valid', () => {
      taser(userInterface).bind(null, {
        first_name: 'jorge',
        last_name: 'silva',
        age: 234,
        address: {
          street: 55, // This is not a string
          city: 'San Francisco'
        }
      }).should.throw();
    });

    it('shouldn\'t care about objets that are not defined by the interface', () => {
      taser(userInterface).bind(null, {
        first_name: 'jorge',
        last_name: 'silva',
        age: 234,
        property_not_defined: 'not_defined',
        address: {
          street: 'Larking',
          city: 'San Francisco',
          property_not_defined: 'not_defined',
          another_property:  {
            property_not_defined: 'not_defined',
          }
        }
      }).should.not.throw();
    });

  });

});
