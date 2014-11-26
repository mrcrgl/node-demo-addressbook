'use strict';

(function(module) {

  var startHTTPd = require('./httpd').start;

  /**
   * Just for cosmetics
   */
  function onSuccessfulStart() {
    console.log("Application initialized.");
  }

  startHTTPd(onSuccessfulStart);

})(module);