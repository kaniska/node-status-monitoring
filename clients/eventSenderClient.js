var http = require('http');
var async = require('async');

payload1 = JSON.stringify({
    "eventInfo": {
    	"system" : "ParaCounterpartyInformationSystem",
        "status": "Error"
    }
});

payload2 = JSON.stringify({
    "eventInfo": {
    	"system" : "ParaCounterpartyInformationSystem",
        "status": "Error"
    }
});

sendEvents = function sendEvents(payload, callback) {
	//prepare the header
	var postheaders = {
	    'Content-Type' : 'application/json',
	    'Content-Length' : Buffer.byteLength(payload, 'utf8')
	};
	var optionspost_localhost = {
		    host : 'localhost', // here only the domain name
		    port : 3002,
		    path : '/parabole/api/events/', // the rest of the url with parameters if needed
		    method : 'POST',
		    headers : postheaders
		};
	
	var optionspost_remote = {
		    host : 'aws-ip', // here only the domain name
		    port : 3002,
		    path : '/parabole/api/events/', // the rest of the url with parameters if needed
		    method : 'POST',
		    headers : postheaders 
		};
	
	//console.info('Options prepared:');
	//console.info(optionspost_localhost);
	//console.info('Do the POST call');
	
	//do the POST call
	var reqPost = http.request(optionspost_localhost, function(response) {
	    console.log("statusCode: ", response.statusCode);
	    var data = "";
		response.on('data', function(chunk) {
			data += chunk;
		});
		response.on('end',function() {
			
		});
	});
	// write the json data
	reqPost.write(payload);
	reqPost.end();
	reqPost.on('error', function(e) {
	    console.error(e);
	});
}

async.parallel([
   function(callback){
	   sendEvents(payload1, function(result) {
			console.log(result);
			console.log(" ############# ");
		});
   },
   function(callback){
	   sendEvents(payload2, function(result) {
			console.log(result);
		});
   }
   ],
// optional callback
   function(err, results){
   });