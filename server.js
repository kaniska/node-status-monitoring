/**
 * New node file
 */
  require('./globals.js');
var Hapi = require('hapi'),
  loader = require('node-glob-loader'),
  queueService = require("./services/queueService.js"),
  environment = process.env.NODE_ENV,
  server;

// Create a server with a host and port
server = Hapi.createServer(config.properties.server.hostname, config.properties.server.port);
server.on('internalError', function(request, err) {
	 console.log(err);
  });

loader.load('./routes/*', function (exports) {
    exports(server);
  }).then(function () {
    server.start(function () {
        console.log('Server Started @' + new Date() + ' on ' + config.properties.server.hostname + ':' + config.properties.server.port);
      });
    }).then(function () {
    	queueService.listenForIncomingMessages();
    });


// queueModule.listenForIncomingMessages(io);