'use strict';

(function (module) {

  module.exports = {
    parseDate: parseDate,
    daysBetweenDates: daysBetweenDates
  };

  var datePattern = /^(\d{2})\/(\d{2})\/(\d{2})$/;

  /**
   * Function to parse the lazy US-style date into a proper javascript Date instance.
   *
   * Supported formats:
   *   31/03/77 (dd/mm/yy)
   *
   * @param string
   * @returns {Date}
   */
  function parseDate(string) {
    if (string.match(datePattern)) {
      var parts = string.split('/'),
        now = new Date(),
        day = parseInt(parts[0]),
        /* In javascript, months starts at 0 */
        month = parseInt(parts[1]) - 1,
        year = parseInt(parts[2]);

      /**
       * To guess the correct century, we expect that the
       * result needs to be in the past.
       * It isn't save enough but I don't see another solution by now.
       */
      year += (year + 2000 > now.getFullYear()) ? 1900 : 2000;

      return new Date(year, month, day);

    }

    throw new Error("unsupported date format: '%s'", string);
  }

  /**
   * Function to get the number of days between two Date instances.
   *
   * @param dateA
   * @param dateB
   * @returns {number}
   */
  function daysBetweenDates(dateA, dateB) {
    if (!dateA instanceof Date || !dateB instanceof Date) {
      throw "AttributeError: expected two Dates, got: %s, %s", typeof dateA, typeof dateB;
    }

    var timeA = dateA.getTime(),
      timeB = dateB.getTime();

    // We expect that dateA is bigger than dateB.
    if (timeB > timeA) {
      var temp = timeA;
      timeA = timeB;
      timeB = temp;
    }

    var timeDiff = Math.abs(timeA - timeB),
      diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

    return diffDays;
  }

})(module);