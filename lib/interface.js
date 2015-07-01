var buildInterface = function buildInterface (taser) {
  var Interface = function TaserInterface (input) {
    /*!
     * Interfaces won't depend on the tacer function. Instead, taser will have our
     * interface as a depdency in order to check if a particular value is an
     * interface and check if
     */
    taser(['object', 'function'], input);
    this.input = input;
  };

  return Interface;
};

module.exports = buildInterface;
