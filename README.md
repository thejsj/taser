# Taser

[![Build Status](https://travis-ci.org/thejsj/taser.svg?branch=master)](https://travis-ci.org/thejsj/taser)
[![npm version](https://badge.fury.io/js/taser.svg)](http://badge.fury.io/js/taser)

*A better `assert`*

Write better code, by being more strict with the types and values you expect in 
a function. Taser helps you check your input types and values and throws an 
error when they are not the expected values.

With taser, you can declare what your expectations are for your inputs and 
`taser` will throw an error whenever the input data doesn't meet your 
expectations. For example, if you have a function that multiplies two numbers 
together, you can declare your expectations with `taser` and write your 
function without any type checking. 

```javascript
var multiply = function (a, b) {
  // An error will be thrown if these variables are not numbers
  taser('number', a);
  taser('number', b);
  // Because these are numbers, we can guarantee that this 
  // function works as expected
  return a * b;
};
```

## Examples

### Checking for a single type

You can check a value for a specific type.

```javascript
var sayHello = function (str) {
  taser(['string'], str);
  return 'Hello ' + str + '!';
};
sayHello('Jorge'); // Hello Jorge!
sayHello('Carlos'); // Hello Carlos!
sayHello(57); // Throws an error
sayHello(); // Throws an error
```

### Checking for a multiple types

You can check a value for multiple types, if your function can take more than one type.

```javascript
var loopThrouhValies = function (arrayOrObject, callback) {
  taser(['array', 'object'], arrayOrObject);
  taser(['function'], callback);
  if (Array.isArray(arrayOrObject)) {
    arrayOrObject.forEach(callback);
  } else {
    for (var key in arrayOrObject) {
      callback(arrayOrObject[key], key, arrayOrObject);
    }
  }
};
sayHello([1, 2, 3], console.log); // [1, 2, 3]
sayHello({ a: 1, b: 2, c: 3 }, console.log); // { a: 1, b: 2, c: 3 }
sayHello(57, console.log); // Throws an error
sayHello("wow", console.log); // Throws an error
```

### Checking for specific values

You can check for types and values, passing an array of valid values.

```
var logNumberBetweeOneAndFive = function (num) {
  taser({
    type: 'number',
    values: [1, 2, 3, 4, 5]
  }, num);
  console.log('Number:', num);
};
logNumberBetweenOneAndFive(1); // 1
logNumberBetweenOneAndFive(4); // 4
logNumberBetweenOneAndFive(7); // Throws an error
logNumberBetweenOneAndFive('3'); // Throws an error
```

## Interfaces

When declaring your checks in your function, often times you want to declare 
more complex dependencies. You might want to declare that an object would have 
certain properties of a certain type. You can do this with interfaces. After 
declaring your interfaces, you can pass those along to `taser`.

```javascript
var taser = require('taser');
var userInterface = new taser.Interface({
  'first_name': taser('string'),
  'last_name':  taser('string'),
  'age':        taser('number'),
  'email':      taser('string')
});

// Will validate and return true
taser(userInterface, {
  first_name: 'jorge',
  last_name: 'silva',
  age: 25,
  email: 'jorge.silva@thejsj.com'
});

// Will throw an error
taser(userInterface, {
  first_name: 'jorge',
  last_name: 'silva',
  age: '25', // This is a String, not a number!
  email: 'jorge.silva@thejsj.com'
});
```

You can also pass

## Types

| name        | Examples                                   | Notes                                                                                                        |
|-------------|--------------------------------------------|--------------------------------------------------------------------------------------------------------------|
| 'string'    | 'hello', 'goodbye', '1'                    |                                                                                                              |
| 'number'    | 1, 2, 234.23423, -0.001                    |                                                                                                              |
| 'boolean'   | true, false                                |                                                                                                              |
| 'array'     | [1, 2, 3], [{ hello: 'hello' }, 3, "adsf"] |                                                                                                              |
| 'object'    | { hello: 'hello' }, { name: 'jorge' }      | 'object' does not map directly to a JavaScript object. Arrays and null are not considered objects, by taser. |
| 'function'  | function (a, b) { return a + b }           |                                                                                                              |
| 'null'      | null                                       |                                                                                                              |
| 'undefined' | undefined                                  |                                                                                                              |

## Currying

If you only pass one argument to the main `curry` function, `taser` will return 
another function that validates a variable using that parameter. 

```javascript
var isString = taser('string');
isString('hello'); // true
isString(1); // Throws Error
```
```javascript
var isAOrB = taser({ type: 'string', values: ['a', 'b' ]});
isAOrB('a'); // true
isAOrB('c'); // Throws Error
```

## Legacy / No Currying

In `v0.0.1`, the value to be checked came first, followed by assertion 
declaration (string, array, or object). If you wish to use the function in that 
order, include taser as follows:

```javascript
var taser = require('taser').noCurrying;
taser('hello', 'string');
```

This will also disable currying.
