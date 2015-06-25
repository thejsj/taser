var checkType = function (validTypesOrValues, value)  {
  'use strict';

  // Curry function if not enough arguments passed
  var args = Array.prototype.slice.call(arguments);
  if (args.length === 1) {
    return function (value) {
      return checkType(args[0], value);
    };
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

  // Check the arguments
  if (Array.isArray(validTypesOrValues)) {
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

checkType.noCurrying = function (value, validTypesOrValues) {
  return checkType(validTypesOrValues, value);
};

module.exports = checkType;
