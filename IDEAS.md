## Taser Ideas

1. Implement Structs to define the structure of complicated objects
2. Implement .not(), so that you can exclude types rather than having to define them all

### 1

```javascript
var Interface = require('taster').Interface;

var objInterface = new Interface({
  'propertyName': {
    // How do you enforce this difference
    'subPropertyName': { type: 'string' }
    type: 'str',
    minLen: 50,
    maxLen: 60,
  }
});
```
### 2

```javascript
var Interface = require('taster').Interface;

var objInterface = new Interface(function (validation){
  return {
    'propertyName': validation('string'),
    'otherPropertyName': validation('number'),
    // Pass the sub properties of an object as the second argument
    'yetAnotherPropertyName': validation('object', {
      'subProperty': validattion('string'),
      'subSubProperty': validattion('object'),
    }),
    'array': validation('array')
  };
});
```
### 3

```
var Interface = require('taser').Interface;

var superInterface = new Interface({
  'propertyName': 'array[string|undefined]',
  'otherPropertyName': 'object'
});
```

## 4

```
var Interface = require('taser').Interface;

var superInterface = new Interface(function (validation) {
  return {
   'propertyName': validation('string'),
   'subPropertyName': validation({ type: 'number', values: [0, 1]),
   'subPropertyName': validation('array[string]'),
   'subPropertyName': validation({ type: 'array[number]', values: [0, 1]),
   'subPropertyName': validation('object', {
      'subSubPropertyName': validation('string'),
      'superThing': validation('number'),
   }),
   'superMethod': validation('function')
  };
});
```
