'use strict';

(function (module) {

  var fs = require('fs'),
    path = require('path');

  module.exports = CSVStorage;

  /**
   * The CSVStorage handler is able to parse csv content to javascript friendly Arrays.
   *
   * @param filePath
   * @constructor
   */
  function CSVStorage(filePath) {

    this._filePath = filePath;
    this._fieldSeparator = ',';
    this._lineSeparator = "\n";
    this._data = [];
  }

  /**
   * Read the given file and returns it's content.
   *
   * Encoding of given file: utf8
   *
   * @returns {string}
   * @private
   */
  CSVStorage.prototype._loadFile = function _loadFile() {
    var filePath = path.join(__dirname, '..', this._filePath);
    filePath = path.normalize(filePath);

    var fileContent = fs.readFileSync(filePath, {encoding: 'utf8', flag: 'r'});

    return fileContent;
  };

  /**
   * Method to split csv content to an Array of Arrays.
   * Each row is represented by an entry in the top level Array.
   * The Array in second dimension contains an entry for every column.
   * Separator is `_lineSeparator`.
   *
   * @param csvContent
   * @returns {Array}
   * @private
   */
  CSVStorage.prototype._parseFileContent = function _parseFileContent(csvContent) {
    var unparsedLines = csvContent.split(this._lineSeparator);
    var arrayOfArrays = unparsedLines.map(this._parseLine, this);

    return arrayOfArrays;
  };

  /**
   * Method used by `_parseFileContent()` to parse the given String (csv format) into an Array of columns.
   * Separator is `_fieldSeparator`.
   *
   * @param csvRow
   * @returns {Array}
   * @private
   */
  CSVStorage.prototype._parseLine = function _parseLine(csvRow) {
    var arrayOfFields = csvRow.split(this._fieldSeparator).map(function(s) { return s.trim() });

    return arrayOfFields;
  };

  /**
   * Returns the parsed data. Method will parse the data if not already made.
   *
   * @returns {Array}
   */
  CSVStorage.prototype.getData = function getData() {
    if (!this._data.length) {
      this._data = this._parseFileContent(this._loadFile());
    }

    return this._data;
  };

})(module);