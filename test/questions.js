'use strict';

(function (module) {

  var vows = require('vows'),
    assert = require('assert');

  var questions = require('../addressbook/questions');

  /**
   * is the result the expected one?
   */

  vows.describe('addressbook.questions').addBatch({
    'howManyWoman()': {

      'returns an proper answer': function () {
        assert.equal(questions[1](), 2);
      }
    },

    'whoIsTheOldest()': {

      'returns an proper answer': function () {
        assert.equal(questions[2](), 'Wes Jackson');
      }
    },

    'howMuchOlderIsBillThanPaul()': {

      'returns an proper answer': function () {
        assert.equal(questions[3](), 2862);
      }
    }
  }).export(module);

})(module);