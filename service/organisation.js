var env = require('../env'),
	config = require('../config/' + env.name);

var Client = require('node-rest-client').Client;
var client = new Client();

module.exports.getOrganisation = function auth(session, callback){

	var args = {
      headers: { "Content-Type": "application/json", "Accepts":"application/json", "x-access-token":session.user.token }
  	};

  	var url =  config.api.url+ "/api/org/"+ session.user.profile.orgId;
  	var req = client.get(url, args, function (data, response) {
  		console.log("data "+ JSON.stringify(data));
	    if (data && data.error == undefined){
	   		callback(null, data);
	    }else{
	    	callback({error:'me'}, null);
	    }
  	});
};

module.exports.getInvoice = function auth(session, callback){

	var args = {
      headers: { "Content-Type": "application/json", "Accepts":"application/json", "x-access-token":session.user.token }
  	};

  	var url =  config.api.url+ "/api/invoice-get/";
  	var req = client.get(url, args, function (data, response) {
  		console.log("data "+ JSON.stringify(data));
	    if (data && data.error == undefined){
	   		callback(null, data);
	    }else{
	    	callback({error:'me'}, null);
	    }
  	});
};

module.exports.getQuotation = function auth(session, callback){

	var args = {
      headers: { "Content-Type": "application/json", "Accepts":"application/json", "x-access-token":session.user.token }
  	};

  	var url =  config.api.url+ "/api/quotation-get/";
  	var req = client.get(url, args, function (data, response) {
  		console.log("data "+ JSON.stringify(data));
	    if (data && data.error == undefined){
	   		callback(null, data);
	    }else{
	    	callback({error:'me'}, null);
	    }
  	});
};


module.exports.getSms = function auth(session, callback){
	var args = {
      headers: { "Content-Type": "application/json", "Accepts":"application/json"}
  	};
  	var meCallback = function(error,data){
  		var bal  = data;
  		console.log(bal);
  		sdata = {mbal:bal};
  		var url1 =  config.api.url+ "/api/wallets?token="+session.user.token;
	  	var req = client.get(url1, args, function (data, response) {
		    if (data && data.error == undefined){
	  			sdata.wallet = (data.data[0]? data.data[0].portfolio.wallet: 0);
		   		callback(null, sdata);
		    }else{
		    	callback(data, null);
		    }
	  	});
  	}
  	var url =  config.api.url+ "/api/sms-balance?token="+session.user.token;
  	var req = client.get(url, args, function (data, response) {
  		console.log("data "+ data);
	    if (data && data.error == undefined){
	   		meCallback(null, data);
	    }else{
	    	callback(data, null);
	    }
  	});
};


