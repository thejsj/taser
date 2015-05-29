# Taser

`assert` on steroids.

Write better code, by being more strict with the types and values you expect in a function. Taser helps you check your input types and values and throws an error when they are not the expected values.

## Examples

### Checking for a single type

You can check a value for a specific type.

```javascript
var sayHello = function (str) {
  taser(str, ['string']);
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
  taser(arrayOrObject, ['array', 'object']);
  taser(arrayOrObject, ['function']);
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
  taser(num, {
    type: 'number',
    values: [1, 2, 3, 4, 5]
  });
  console.log('Number:', num);
};
logNumberBetweenOneAndFive(1); // 1
logNumberBetweenOneAndFive(4); // 4
logNumberBetweenOneAndFive(7); // Throws an error
logNumberBetweenOneAndFive('3'); // Throws an error
```
