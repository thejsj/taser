var taser = require('./lib/taser');

taser.noCurrying = function taserNoCurry(value, validTypesOrValues) {
  return taser(validTypesOrValues, value);
};

module.exports = taser;
