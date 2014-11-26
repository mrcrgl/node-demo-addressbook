'use strict';

(function (module) {

  var parseDate = require('./../utils/datetime').parseDate;

  /**
   * The `Contact` objects represents a single contact in the address book.
   *
   * @constructor
   */
  function Contact() {

    this.name = '';
    this.gender = '';
    this.dateOfBirth = null;
  }

  /**
   * @readOnly MALE
   * @static
   * @final
   * @type {string}
   * @default 'Male'
   */
  Contact.MALE = 'Male';

  /**
   * @readOnly FEMALE
   * @static
   * @final
   * @type {string}
   * @default 'Female'
   */
  Contact.FEMALE = 'Female';

  /**
   * Static method which returns a single instance of `Contact`, initialized with the given data.
   * Required `rawData` layout: Array(name, gender, dateOfBirth)
   *
   * @param {Array} rawData
   * @returns {Contact}
   */
  Contact.factory = function factory(rawData) {
    var contact = new Contact();

    contact.setName(rawData[0]);
    contact.setGender(rawData[1]);
    contact.setDateOfBirth(parseDate(rawData[2]));

    return contact;
  };

  /**
   * Returns the String representation of this object.
   *
   * @returns {string}
   */
  Contact.prototype.toString = function toString() {
    return this.name;
  };

  /**
   * Getter of: name
   *
   * @returns {string}
   */
  Contact.prototype.getName = function getName() {
    return this.name;
  };

  /**
   * Setter of: name
   *
   * @param {String} name
   */
  Contact.prototype.setName = function setName(name) {
    if (!name instanceof String) {
      throw new Error("ValueError: instance of String expected, got: %s", typeof name);
    }

    this.name = name;
  };

  /**
   * Getter of: gender
   *
   * @returns {string}
   */
  Contact.prototype.getGender = function getGender() {
    return this.gender;
  };

  /**
   * Setter of: gender
   *
   * Valid options (constants):
   *   - Contact.MALE
   *   - Contact.FEMALE
   *
   * @param {String} gender
   */
  Contact.prototype.setGender = function setGender(gender) {
    if (gender !== Contact.MALE && gender !== Contact.FEMALE) {
      throw new Error("ValueError: expected one of: [%s, %s]", Contact.MALE, Contact.FEMALE);
    }

    this.gender = gender;
  };

  /**
   * Getter of: dateOfBirth
   *
   * @returns {Date}
   */
  Contact.prototype.getDateOfBirth = function getDateOfBirth() {
    return this.dateOfBirth;
  };

  /**
   * Setter of: dateOfBirth
   *
   * @param {Date} date
   */
  Contact.prototype.setDateOfBirth = function setDateOfBirth(date) {
    if (!date instanceof Date) {
      throw new Error("ValueError: instance of Date expected, got: %s", typeof date);
    }

    this.dateOfBirth = date;
  };


  module.exports = Contact;

})(module);