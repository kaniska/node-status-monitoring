/**
 * New node file
 */
var fs  = require("fs");
global.config = {
	    properties: JSON.parse(fs.readFileSync("./config.json","utf8"))
	};