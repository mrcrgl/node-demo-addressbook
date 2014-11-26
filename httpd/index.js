'use strict';

(function (module) {

  var express = require('express'),
    routes = require('./routes').routes,
    app = express();

  module.exports = {start: start};

  for (var route in routes) {
    app.get(route, routes[route]);
  }

  /**
   * Function to start the httpd.
   *
   * @param callback
   */
  function start(callback) {
    var server = app.listen(3000, function appListenCallback() {

      var host = server.address().address,
        port = server.address().port;

      console.log('Address book app listening at http://%s:%s', host, port);
      callback(server);
    });

    return server;
  }

})(module);