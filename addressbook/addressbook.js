'use strict';

(function (module) {

  var Contact = require('./contact'),
    CSVStorage = require('./../storage/csv'),
    getFilterCallback = require('./../utils/filter').getFilterCallback,
    getSortingCallback = require('./../utils/sorting').getSortingCallback,
    config = require('./../config.json'),
    addressBook;

  module.exports = AddressBook;

  /**
   * Loads the address book file and provides some useful methods to access the Contact information.
   *
   * @class AddressBook
   * @param storage
   * @constructor
   */
  function AddressBook(storage) {

    // Optional parameter to provide same functions in the result set.
    this._storage = storage || [];
  }

  /**
   * Singleton method to return an instance of AddressBook.
   *
   * @static
   * @returns {AddressBook}
   */
  AddressBook.factory = function factory() {
    if (!addressBook) {
      addressBook = new AddressBook();
      addressBook.load();
    }

    return addressBook;
  };

  /**
   * Loads the address book data from the given csv file.
   *
   * @param {String} filePath
   * @param {Boolean} forceReload
   */
  AddressBook.prototype.load = function load(filePath, forceReload) {
    forceReload = !!forceReload;

    if (!this._storage.length || forceReload) {
      filePath = filePath || config.addressBookFile;

      var storageHandler = new CSVStorage(filePath);
      var rawData = storageHandler.getData();
      this._importRawData(rawData);
    }

  };

  /**
   * Converts an Array of Arrays into a set of `Contact` instances.
   *
   * @param rawData
   * @private
   */
  AddressBook.prototype._importRawData = function _importRawData(rawData) {
    this._storage = rawData.map(Contact.factory);
  };

  /**
   * Returns the first matching `Contact` instance. null if nothing matched.
   *
   * @param {Object} filter
   * @returns {*}
   */
  AddressBook.prototype.get = function get(filter) {
    var result = this.filter(filter).getData();
    if (result.length) {
      return result[0];
    }

    return null
  };

  /**
   * Returns the set of `Contacts`
   *
   * @returns {Array} Array of `Contact` instances
   */
  AddressBook.prototype.getData = function getData() {
    return this._storage;
  };

  /**
   * Returns a new instance of `AddressBook` containing the result of given filter.
   * Instances of `AddressBook` can the chained while using `sortBy` and `filter` methods.
   *
   * @param filter
   * @returns {AddressBook}
   */
  AddressBook.prototype.filter = function filter(filter) {
    var filteredList = this._storage.filter(getFilterCallback(filter));

    return new AddressBook(filteredList);
  };

  /**
   * Returns a new instance of `AddressBook` with the sorted result set.
   * Instances of `AddressBook` can the chained while using `sortBy` and `filter` methods.
   *
   * @param sortByProperty
   * @returns {AddressBook}
   */
  AddressBook.prototype.sortBy = function sortBy(sortByProperty) {
    var sortedList = this._storage.sort(getSortingCallback(sortByProperty));

    return new AddressBook(sortedList);
  };

})(module);