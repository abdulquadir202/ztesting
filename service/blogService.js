var env = require('../env'),
	config = require('../config/' + env.name);

var Client = require('node-rest-client').Client;
var client = new Client();

module.exports.getBlog = function auth(blogId, session, callback){

	var args = {
      headers: { "Content-Type": "application/json", "Accepts":"application/json", "x-access-token":session.user.token }
  	};

  	var url =  config.api.url+ "/api/blog/"+ blogId;
  	var req = client.get(url, args, function (data, response) {
  		console.log("data ...."+ JSON.stringify(data));
	    if (data && data.error == undefined){
	   		callback(null, data);
	    }else{
	    	callback({error:'me'}, null);
	    }
  	});
};



module.exports.list = function(req,session, callback){
	if(req.query &&  req.query.psize){
		var psize = parseInt(req.query.psize);
	}else{
		var psize =10;
	}
	if(req.query && req.query.pno){
		var pno = parseInt(req.query.pno);
	}else{
		var pno =1;
	}
    
	var args = {
	  headers: { "Content-Type": "application/json", "Accepts":"application/json", "x-access-token":session.user.token }
  	};

  	var url =  config.api.url + "/api/blogs"+
  	  "?psize="+ psize +
  	  "&pno="+ pno;
  	  if(req.query && req.query.fromDate){
		url = url+"&fromDate="+ req.query.fromDate
		}
		if(req.query && req.query.toDate){
			url = url+"&toDate="+ req.query.toDate
		}
		if(req.query && req.query.q){
			url = url+"&q="+ req.query.q
		}
  	console.log('url== '+ url);
  	var req = client.get(url, args, function (data, response) {
	    if (data && data.error == undefined){
	   		callback(null, data);
	    }else{
	    	callback(data.error, null);
	    }
  	});
};



