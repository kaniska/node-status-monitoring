/**
 * New node file
 */

exports.getCurrentDate = function getCurrentDate() {
	var date = new Date();
	var day  = date.getDate();
	day = (day < 10 ? "0" : "") + day;
	var year = date.getFullYear();
    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;
	
	var today = year+'.'+month+'.'+ day;
	
	return today;
}

exports.getSomePreviousDate = function getSomePreviousDate(day_diff, month_diff) {
	var date = new Date();
	var day  = date.getDate();
	
	var year = date.getFullYear();
    var month = date.getMonth() + 1;
    
    month = month -month_diff;
	
    if(month <= 1) {
    	day = 31; month = 12; year = year -1;
    } 
    
    day = (day < 10 ? "0" : "") + day;
    month = (month < 10 ? "0" : "") + month;
	var old_date = year+'.'+month+'.'+ day;
	
	return old_date;
}