'use strict';

(function (module) {

  var questions = require('./../addressbook/questions');

  module.exports = {
    questionListView: questionListView,
    questionView: questionView
  };

  /**
   * Displays a set of answers of predefined questions.
   *
   * Response format (each): {questionId}.{Answer}\n
   *
   * @param req
   * @param res
   */
  function questionListView(req, res) {

    var responseBody = [];

    for (var questionId in questions) {
      var row = [questionId, questions[questionId]()].join('.') + "\n";

      responseBody.push(row);
    }

    res.header("Content-Type", "text/plain");
    return res.send(responseBody.join(''));
  }

  /**
   * Displays the answer of the requested question.
   *
   * Response format: {questionId}.{Answer}\n
   *
   * @param req
   * @param res
   */
  function questionView(req, res) {
    var questionId = req.params.id;

    if (isNaN(questionId) || Object.keys(questions).indexOf(questionId) === -1) {
      return res.status(404).send('Not found.');
    }

    var responseBody = [questionId, questions[questionId]()].join('.') + "\n";

    res.header("Content-Type", "text/plain");
    return res.send(responseBody);
  }

})(module);