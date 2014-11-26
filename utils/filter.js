'use strict';

(function (module) {

  module.exports.getFilterCallback = getFilterCallback;


  /**
   * Function to provide a dynamic filter for Arrays of Objects.
   *
   * Example `filterObject`:
   *  {name: /Bill/}  // Regexp match of Bill
   *  {name: 'Bill'}  // Requires equality to 'Bill'
   *  {name: 'Bill', gender: 'Male'}  // Combined filter
   *
   * Usage: Array.filter(getFilterCallback({name: /Bill/}))
   *
   * The usage example returns an Array of Objects where the property `name` contains 'Bill'
   *
   * @param filterObject
   * @returns {Function}
   */
  function getFilterCallback(filterObject) {

    /**
     * This inner function is a dynamic callback function for the built in Array.prototype.filter method.
     * It returns true if the value object contains a matching property concerning the filter, otherwise false.
     *
     * For more information about the callback:
     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
     *
     * @param object
     * @param index
     * @returns {boolean}
     */
    var filterCallback = function filterCallback(object, index) {
      for (var prop in filterObject) {
        var value = object[prop],
          expression = filterObject[prop];

        // Validate the expression. It needs to be type of RegExp or String.
        if ("string" !== typeof expression && !expression instanceof RegExp) {
          throw "Invalid filter expression. Required to be of type String or RegExp: %s", expression
        }

        // Continue if the requested filter is undefined
        if (undefined === value) {
          continue;
        }

        // Check if value has a "match" method and check against the filter.
        if (expression instanceof RegExp && expression.exec(value)) {
          return true;
        }

        var isStringOrNumber = ("string" === typeof expression || "number" === typeof expression)

        // If the expression is a String, just use the comparison operator.
        if (isStringOrNumber && expression === value) {
          return true;
        }
      }

      return false;
    };

    return filterCallback;
  }

})(module);