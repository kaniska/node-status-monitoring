var Hapi = require('hapi');
var util     = require("util");
var queueService = require("./../services/queueService.js");

module.exports = function (application) {
  application.route({
  	  method: 'POST', 
  	  path: '/parabole/api/events/', 
  	  config: {
  	  handler: function(req, reply) {
  		var payload = req.payload;
  		//console.info("Got Event Notification : "+payload);
  		 if (payload) {
  			var d = new Date();
  			payload['eventInfo']['timestamp'] = d;
  			console.info('Final Payload '+JSON.stringify(payload));
  			queueService.publishMessage(payload);
  		  }
  	    }
  	  } //// end config
  	})
}
