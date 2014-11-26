'use strict';

(function (module) {
  var vows = require('vows'),
    assert = require('assert');

  var CSVStorage = require('../storage/csv');

  var testContent = "Bill McKnight, Male, 16/03/77\n" +
    "Paul Robinson, Male, 15/01/85\n" +
    "Gemma Lane, Female, 20/11/91\n" +
    "Sarah Stone, Female, 20/09/80\n" +
    "Wes Jackson, Male, 14/08/74";

  var storageFilePath = 'addressbook.csv';

  vows.describe('storage.csv.CSVStorage').addBatch({
    '._loadFile()': {
      topic: function () {
        return new CSVStorage(storageFilePath);
      },

      'we get the content': function (storage) {
        var response = storage._loadFile();
        var type = typeof response;

        assert.equal(type, 'string');
      }
    },

    '._parseFileContent()': {
      topic: function () {
        var storage = new CSVStorage(storageFilePath);

        return storage._parseFileContent(testContent);
      },

      'we get an array of arrays': function (parsed) {
        assert.isArray(parsed);
        parsed.forEach(function(subArray) {
          assert.isArray(subArray);
          assert.equal(subArray.length, 3);
        });
      },

      'array has the correct length': function (parsed) {
        assert.equal(parsed.length, 5);
      }
    },
    '._parseLine()': {
      topic: function () { return 0 / 0 },

      'we get a value which': {
        'is not a number': function (topic) {
          assert.isNaN (topic);
        },
        'is not equal to itself': function (topic) {
          assert.notEqual (topic, topic);
        }
      }
    }
  }).export(module);

})(module);