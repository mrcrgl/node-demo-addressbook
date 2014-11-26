'use strict';

(function (module) {

  var views = require('./views');

  /**
   * Object of routes, bound with the appropriate view.
   *
   * @type {Object}
   */
  var routes = module.exports.routes = {};

  routes['/questions'] = views.questionListView;
  routes['/questions/:id'] = views.questionView;

})(module);