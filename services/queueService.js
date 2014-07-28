/**
 * New node file
 */
var util     = require("util");
var redis    = require("redis");
var request    = require("request");

var redisConfig = config.properties.redis;
//util.debug("redis config: "+JSON.stringify(redisConfig));
var redisClient = redis.createClient(redisConfig.port, redisConfig.hostname);
var redisPublisher = redis.createClient(redisConfig.port, redisConfig.hostname);
if(redisConfig.password) {
	redisClient.auth(redisConfig.password);
	redisPublisher.auth(redisConfig.password);
}

/////////////////////////////
var watchers = {};
/// Consume
exports.listenForIncomingMessages = function consumeMessage() {
	console.log("Queue listening for incoming messages ... ");
	redisClient.subscribe("redis-connector", function (channel, count){
		//
	});
	redisClient.on("message", function (channel, message) {
		//dbModule.persistStocksEvent(json);
		console.log("Client1 channel : " + channel + " received the message =>" + message);
		console.log( "About to Update the status of the system : "+JSON.parse(message).eventInfo.system); 
		
		request.get("http://localhost:9000/updateCurrentStatus?systemName="+JSON.parse(message).eventInfo.system);
		
		//ioChannel.sockets.send(json);
		//util.debug( "Sent data to Browser:", json ); 
	});
};

/// Publish
exports.publishMessage = function publishMessage(eventInfo) {
	console.log("Pushing to queue .. "+JSON.stringify(eventInfo));
redisPublisher.publish("redis-connector", JSON.stringify(eventInfo));
};
