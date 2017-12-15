//var config = require('../config/dev');
var Client = require('node-rest-client').Client;
var client = new Client();
var env = require('../env'),
config = require('../config/' + env.name);
var fs = require('fs');
var json2csv = require('json2csv');

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

  	var url =  config.api.url + "/api/leads"+
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

module.exports.csv = function(req,session, res){
	var meCallback = function(error,data){
		if(data && data !=null){
			var fields = ['createdOn','leadId', 'customer.name','customer.mobile','item.name','dueDate','employee.name','address','leadStatus'];


		    var csv = json2csv({ data: data, fields: fields });
		    var fname = new Date()+'.csv';
		    fs.writeFile(fname, csv, function(err) {
		      if (err) throw err;
		      res.download(fname, "leads-data.csv");
		    });
		}
	}
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

  	var url =  config.api.url + "/api/leads/csv"+
  	  "?psize="+ psize +
  	  "&pno="+ pno;
  	  if(req.query && req.query.fromDate){
		url = url+"&fromDate="+req.query.fromDate
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
	   		meCallback(null, data.data);
	    }else{
	    	meCallback(data.error, null);
	    }
  	});
};
