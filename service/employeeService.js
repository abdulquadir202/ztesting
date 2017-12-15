var env = require('../env'),
	config = require('../config/' + env.name);

var Client = require('node-rest-client').Client;
var client = new Client();

module.exports.save = function(req, callback){

	var args = {
	  data: {
	  	name: req.body.name,
	  	mobile: req.body.mobile,
	  	email: req.body.email,
	  	type: req.body.type,
	  	designation: req.body.designation
	  },
      headers: { "Content-Type": "application/json", "Accepts":"application/json", "x-access-token":req.session.user.token }
  	};

  	var url =  config.api.url+ "/api/employee";
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

  	var url =  config.api.url+ "/api/employees";
  	var req = client.get(url, args, function (data, response) {
  		console.log("data "+ JSON.stringify(data));
	    if (data && data.error == undefined){
	   		callback(null, data);
	    }else{
	    	callback(data.error, null);
	    }
  	});
};
