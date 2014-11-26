'use strict';

(function (module) {

  var Contact = require('./contact'),
    AddressBook = require('./addressbook'),
    addressBook = AddressBook.factory(),
    daysBetweenDates = require('./../utils/datetime').daysBetweenDates;

  var questions = module.exports = {
    1: howManyWoman,
    2: whoIsTheOldest,
    3: howMuchOlderIsBillThanPaul
  };

  function howManyWoman() {
    return addressBook.filter({gender: Contact.FEMALE }).getData().length;
  }

  function whoIsTheOldest() {
    return addressBook.sortBy('dateOfBirth').getData()[0].toString();
  }

  function howMuchOlderIsBillThanPaul() {
    var bill = addressBook.get({name: /Bill/}),
      paul = addressBook.get({name: /Paul/});

    return daysBetweenDates(bill.getDateOfBirth(), paul.getDateOfBirth());
  }

})(module);