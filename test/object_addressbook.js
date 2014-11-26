'use strict';

(function (module) {

  var vows = require('vows'),
    assert = require('assert');

  var AddressBook = require('../addressbook/addressbook'),
    Contact = require('../addressbook/contact');

  /**
   * Check factory
   * Does it load?
   * Does the filter works fine?
   * Does the sort works fine?
   * Can i chain it?
   */

  vows.describe('addressbook.AddressBook').addBatch({
    '.factory()': {

      'returns instance of AddressBook': function () {
        assert(AddressBook.factory() instanceof AddressBook);
      }
    },

    '.getData()': {
      'returns array with 5 entries': function () {
        var ab = AddressBook.factory();
        var contacts = ab.getData();

        assert.equal(contacts.length, 5);
      }
    },

    '.sortBy()': {
      'expect Bill as the first name in alphabet': function () {
        var ab = AddressBook.factory();
        var contact = ab.sortBy('name').getData()[0];

        assert.equal(contact.name, 'Bill McKnight');
      }
    },

    '.filter()': {
      'expect 2 females': function () {
        var ab = AddressBook.factory();
        var contacts = ab.filter({gender: Contact.FEMALE}).getData();

        assert.equal(contacts.length, 2);
      }
    }
  }).export(module);

})(module);