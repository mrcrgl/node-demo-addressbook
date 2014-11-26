'use strict';

(function (module) {

  var vows = require('vows'),
    assert = require('assert');

  var Contact = require('../addressbook/contact');

  /**
   * Check validation of setters
   * Check factory
   */

  vows.describe('addressbook.Contact').addBatch({
    '.factory()': {

      'returns a good instance of Contact': function () {
        var data = ['Max', 'Male', '31/12/81'];
        assert(Contact.factory(data) instanceof Contact);
      },

      'throws Error on bad birthday': function () {
        var data = ['Max', 'Male', '22/10/1981'];
        assert.throws(function() {
          Contact.factory(data);
        });
      },

      'throws Error on bad gender': function () {
        var data = ['Max', 'Undefined', '11/11/81'];
        assert.throws(function() {
          Contact.factory(data);
        });
      },

      'throws Error on bad name': function () {
        var data = [null, 'Undefined', '11/11/81'];
        assert.throws(function() {
          Contact.factory(data);
        });
      }
    }

  }).export(module);

})(module);