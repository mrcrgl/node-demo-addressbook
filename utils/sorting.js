'use strict';

(function (module) {

  module.exports.getSortingCallback = getSortingCallback;

  /**
   * Function to provide a dynamic sort of Arrays containing Objects.
   * The given property to sort should match with one of the Object properties.
   * Default sort mode is ascending, if you like to sort descending, just put a minus '-'
   * in front of the property name.
   *
   * Usage: Array.sort(getSortingCallback('property'))
   *
   * @param propertyToSort
   * @returns {Function}
   */
  function getSortingCallback(propertyToSort) {

    var sortOrder = 1;

    if(propertyToSort.indexOf('-') === 0) {
      sortOrder = -1;
      propertyToSort = propertyToSort.substr(1);
    }

    /**
     * Inner function, used as callback for Array.prototype.sort.
     *
     * For more information about the comparator callback:
     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
     *
     * @param objectA
     * @param objectB
     * @returns {number}
     */
    var sortingCallback = function sortingCallback(objectA, objectB) {
      var isSmallerThanB = objectA[propertyToSort] < objectB[propertyToSort]
      var isBiggerThanB = objectA[propertyToSort] > objectB[propertyToSort]

      var result = (isSmallerThanB) ? -1 : (isBiggerThanB) ? 1 : 0;
      return result * sortOrder;
    };

    return sortingCallback;
  }
})(module);