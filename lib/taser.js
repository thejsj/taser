var buildInterface = require('./interface');

var taser = function taser (validTypesOrValues, value)  {
  'use strict';
  var args = Array.prototype.slice.call(arguments);
  if (args.length === 1) {
    var newFunction = function (value) {
      return taser(args[0], value);
    };
    newFunction.prototype = taser.prototype;
    return newFunction;
  }

  var validTypes, validValues;

  var replaceWhiteSpace = function (str) {
    return str.replace(/\ +/g, ' ').replace(/\n+/g, '');
  };

  var deepEquals = function(val1, val2){
    if (typeof val1 !== typeof val2) return false;
    if (Array.isArray(val1)) {
      if (val1.length !== val2.length) return false;
      return val1.every(function (v, i) {
        return deepEquals(val1[i], val2[i]);
      });
    }
    if (typeof val1 === 'object' && val1 !== null) {
      if (!deepEquals(Object.keys(val1), Object.keys(val2))) return false;
      for (var ii in val1) {
        if (!deepEquals(val1[ii], val2[ii])) return false;
      }
      return true;
    }
    // Compare function through their string representations
    // This might provide some false positives
    // Functions that are the same will always be true, but functions that
    // are not the same, might also be true
    // There are probalby a million more tests this functionality needs, like
    // checking to see if the variable names have been renamed
    if (typeof val1 === 'function' && typeof val2 === 'function') {
      var val1String = replaceWhiteSpace(val1.toString());
      var val2String = replaceWhiteSpace(val2.toString());
      return val1String === val2String;
    }
    return val1 === val2;
  };

  // Validate type
  var validateType = function (value, types) {
    if (types === null) return true;
    if (!Array.isArray(types)) {
      throw new TypeError('`types` must be an Array.');
    }
    for (var i = 0; i < types.length; i += 1) {
      if (types[i] === 'array') {
        if (Array.isArray(value)) return true;
      } else if (types[i] === 'null') {
        if (value === null) return true;
      } else {
        if (typeof value === types[i]) return true;
      }
    }
    return false;
  };

  var validateValue = function (value, values) {
    if (values === null) return true;
    if (!Array.isArray(values)) {
      throw new TypeError('`values` must be an Array.');
    }
    for (var i = 0; i < values.length; i += 1) {
      if (deepEquals(values[i], value)) {
        return true;
      }
    }
    return false;
  };

  var getPropertyValue = function (obj, propertyName) {
    if (obj[propertyName] === undefined) {
      return null;
    } else if (Array.isArray(obj[propertyName])) {
      return obj[propertyName];
    } else if (obj[propertyName]) {
      return [obj[propertyName]];
    } else {
      throw new TypeError('The `values` property must be an array');
    }
  };

  /*!
   * Interface Validation
   */
  if (validTypesOrValues instanceof taser.Interface) {
    // If this is a function, execute the function passing taser
    var input;
    if (typeof validTypesOrValues.input === 'function') {
      input = validTypesOrValues.input(taser);
    } else {
      input = validTypesOrValues.input;
    }
    // With every value in our object
    taser('object', input);
    var validateInterface = function validateInterface (obj, value) {
      for(var key in obj) {
        if (!Array.isArray(obj[key]) && obj[key] !== null && typeof obj[key] === 'object') {
          validateInterface(obj[key], value[key]);
        } else if (typeof obj[key] === 'function') {
          // Is there a way to ensure that this is a taser function?
          if(obj[key].prototype !== taser.prototype) {
            throw new Error('taser: Interface: non-taser function provided for validation');
          }
          obj[key](value[key]);
        } else {
          throw new Error('taser: Interface: Invalid input in object');
        }
      }
    };
    validateInterface(input, value);
    return true;
  }

  /*!
   * Regular Validation
   */

  // Check the arguments
   else if (Array.isArray(validTypesOrValues)) {
    validTypes = validTypesOrValues;
    validValues = null;
  } else if (typeof validTypesOrValues === 'object' && validTypesOrValues !== null) {
    if (validTypesOrValues.types === undefined && validTypesOrValues === undefined) {
      throw new Error('`validTypesOrValues` must have a `types` or `values` property');
    }
    validValues = getPropertyValue(validTypesOrValues, 'values');
    validTypes = getPropertyValue(validTypesOrValues, 'types');
  } else if (typeof validTypesOrValues === 'string') {
    validTypes = [validTypesOrValues];
    validValues = null;
  } else {
    throw new TypeError('`validTypesOrValues` must be an `Array`, `String` or `Object`');
  }

  // Compare
  if (!validateValue(value, validValues)) {
    throw new TypeError('Variable with value `' + value + '` expected to be of value `' + validValues + '`');
  }
  if (!validateType(value, validTypes)) {
    throw new TypeError('Variable of type `' + typeof value + '` expected to be of type `' + validTypes + '`');
  }
  return true;
};

/*!
 * Interface and taser, both require to know about each other. Hence, we
 * pass taser into our `Interface` in order to have a reference to it
 */
var Interface = buildInterface(taser);
// Attach our interface to `taser` in order to make it publicly accessible
taser.Interface = Interface;

module.exports = taser;
