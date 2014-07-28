var NodeCache = require("node-cache");
var cache;

exports.initialize = function initialize(callback) {
	if(!cache) {
	 console.log("Cache Initialized")	;
	 cache = new NodeCache();
	 callback();
	}else{
		callback();
	}
}

exports.lookup = function lookup(key,callback) {
	cache.get( key, function( err, val ) {
		callback(err,val);
	});
}

exports.setValue = function setValue(key, val, callback) {
	cache.set( key, val, function( err, success ){
		callback(err, success);
	});
}
