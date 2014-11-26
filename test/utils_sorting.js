'use strict';

(function (module) {

  var vows = require('vows'),
    assert = require('assert');

  var sorting = require('../utils/sorting');

  vows.describe('utils.sorting.getSortingCallback').addBatch({
    'with numbers': {
      topic: function () {
        var testArray = [
          {
            a: 1,
            b: 2,
            c: 3
          },
          {
            a: 3,
            b: 1,
            c: 2
          },
          {
            a: 2,
            b: 3,
            c: 1
          }
        ];

        return testArray;
      },

      'sort ascending': function (testArray) {
        var expected = [testArray[1], testArray[0], testArray[2]];

        assert.deepEqual(testArray.sort(sorting.getSortingCallback('b')), expected);
      },

      'sort descending': function (testArray) {
        var expected = [testArray[2], testArray[1], testArray[0]];

        assert.deepEqual(testArray.sort(sorting.getSortingCallback('-b')), expected);
      }
    },

    'with strings': {
      topic: function () {
        var testArray = [
          {
            a: 'a',
            b: 'b',
            c: 'c'
          },
          {
            a: 'c',
            b: 'a',
            c: 'b'
          },
          {
            a: 'b',
            b: 'c',
            c: 'a'
          }
        ];

        return testArray;
      },

      'sort ascending': function (testArray) {
        var expected = [testArray[1], testArray[0], testArray[2]];

        assert.deepEqual(testArray.sort(sorting.getSortingCallback('b')), expected);
      },

      'sort descending': function (testArray) {
        var expected = [testArray[2], testArray[1], testArray[0]];

        assert.deepEqual(testArray.sort(sorting.getSortingCallback('-b')), expected);
      }
    }
  }).export(module);


})(module);