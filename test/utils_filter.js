'use strict';

(function (module) {

  var vows = require('vows'),
    assert = require('assert');

  var filter = require('../utils/filter');

  vows.describe('utils.filter.getFilterCallback').addBatch({
    'filter numbers': {
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

      'filter result': function (testArray) {
        var expected = [{a:3, b:1, c:2}];

        assert.deepEqual(testArray.filter(filter.getFilterCallback({a: 3})), expected);
      }
    },

    'filter strings': {
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

      'filter result': function (testArray) {
        var expected = [{a:'c', b:'a', c:'b'}];

        assert.deepEqual(testArray.filter(filter.getFilterCallback({a: 'c'})), expected);
      }
    },

    'filter regular expressions': {
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

      'filter result': function (testArray) {
        var expected = [{a:'c', b:'a', c:'b'}];

        assert.deepEqual(testArray.filter(filter.getFilterCallback({a: /^c$/})), expected);
      }
    }
  }).export(module);

})(module);