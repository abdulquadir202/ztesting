var env = require('../env'),
	config = require('../config/' + env.name);

var Client = require('node-rest-client').Client;
var client = new Client();

module.exports.save = function(req, callback){

	var args = {
	  data: {
	  	mobile: req.body.mobile,
	  	name: req.body.name,
	  	email: req.body.email,
	  	address: req.body.address,
	  	description: req.body.description
	  },
      headers: { "Content-Type": "application/json", "Accepts":"application/json", "x-access-token":req.session.user.token }
  	};

  	var url =  config.api.url+ "/api/vendor";
  	var req = client.post(url, args, function (data, response) {
  		console.log("data "+ JSON.stringify(data));
	    if (data && data.error == undefined){
	   		callback(null, data);
	    }else{
	    	callback(data, null);
	    }
  	});
};

module.exports.list = function(req, callback){

	var args = {
	  headers: { "Content-Type": "application/json", "Accepts":"application/json", "x-access-token":req.session.user.token }
  	};

  	var url =  config.api.url+ "/api/vendors";
  	var req = client.get(url, args, function (data, response) {
  		console.log("data "+ JSON.stringify(data));
	    if (data && data.error == undefined){
	   		callback(null, data);
	    }else{
	    	callback(data.error, null);
	    }
  	});
};
