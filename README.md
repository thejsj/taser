# Taser

`assert` on steroids.

Write better code, by being more strict with the types and values you expect in a function. Taser helps you check your input types and values and throws an error when they are not the expected values.

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

If you only pass one argument to the main `curry` function, `taser` will return another function that validates a variable using that parameter. 

```
var isString = taser('string');
isString('hello'); // true
isString(1); // Throws Error
```
```
var isAOrB = taser({ type: 'string', values: ['a', 'b' ]});
isAOrB('a'); // true
isAOrB('c'); // Throws Error
```

## Legacy / No Currying

In `v0.0.1`, the value to be checked came first, followed by assertion declaration (string, array, or object). If you wish to use the function in that order, include taser as follows:

```
var taser = require('taser').noCurrying;
taser('hello', 'string');
```

This will also disable currying.
