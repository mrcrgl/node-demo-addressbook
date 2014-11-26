'use strict';

(function (module) {

  var vows = require('vows'),
    assert = require('assert');

  var datetime = require('../utils/datetime');

  vows.describe('utils.datetime.parseDate').addBatch({
    'good dates': {
      topic: function () {

        var arrayOfGoodDates = [
          '16/03/77',
          '15/01/85',
          '20/11/91',
          '20/09/80',
          '14/08/74'
        ];

        return arrayOfGoodDates;
      },

      'filter result': function (dateArray) {
        for (var date in dateArray) {
          assert(function() {
            datetime.parseDate(date);
          });
        }
      }
    },

    'bad dates': {
      topic: function () {

        var arrayOfBadDates = [
          '12/31/77',
          '15/01/1985',
          '20.11.91',
          '20.09.1980'
        ];

        return arrayOfBadDates;
      },

      'return bad dates': function (dateArray) {
        for (var date in dateArray) {
          assert.throws(function() {
            datetime.parseDate(date);
          });
        }
      }
    }
  }).export(module);

  vows.describe('utils.datetime.daysBetweenDates').addBatch({
    'calculate days between two dates': {
      topic: function () {
        return [new Date(1965, 10, 29), new Date(2004, 11, 12)];
      },

      'one direction': function (dates) {
        var expected = 14258;

        assert.deepEqual(datetime.daysBetweenDates(dates[0], dates[1]), expected);
      },

      'other direction': function (dates) {
        var expected = 14258;

        assert.deepEqual(datetime.daysBetweenDates(dates[1], dates[0]), expected);
      }
    }
  }).export(module);

})(module);