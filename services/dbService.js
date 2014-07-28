/**
 * New node file
 * http://mongodb.github.io/node-mongodb-native/markdown-docs/queries.html
 */
var util     = require("util");
var format = require('util').format;
var safe_params = { j: 1, w: 1, wtimeout: 10000 };

var MongoClient = require('mongodb').MongoClient
, format = require('util').format;
var mongoConfig = config.properties.mongo;
var m_db;

var mongoConnectionURL = 'mongodb://'+ mongoConfig.hostname+":" + mongoConfig.port +'/'+ mongoConfig.db;
var events_collection;

exports.connectMongo = function connectMongo(callback) {
	console.log("Trying to connect to Mongo");
	if(!m_db) {
		MongoClient.connect(mongoConnectionURL, function(err, database) {
			m_db = database;
			util.debug("Connected to mongo DB");
			if(err) throw err;
			events_collection = database.collection('events');
			util.debug("Got the Collections");
			callback();
		});
	}else{
		callback();
	}
	
};
//
exports.searchEvents = function searchEvents(qryCriteria, callback){
	console.info("Query Criteria  : "+qryCriteria);
	event_collection.find(JSON.parse(qryCriteria)).toArray(function(err, result) {
		   //console.log(result);	
		   callback(err, result);
	    });
	};
	
// groupByField = $basicInfo.team_name , aggregationType = { $sum : 1 }
exports.aggregateEvents = function aggregateEvents(aggregationQry, callback){
	console.info("Pipeline Aggregation Query "+aggregationQry);
	event_collection.aggregate(JSON.parse(aggregationQry), function(err, result) {
		//console.log(result);
		  callback(err, result);
         });
};
	
//