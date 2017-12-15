var env = require('../env'),
	config = require('../config/' + env.name),
	router = require('../uiroutes');
var Client = require('node-rest-client').Client;
var client = new Client();

module.exports.csrf = function csrf(req, res, next){
	res.locals.token = req.csrfToken();
	next();
};

module.exports.authenticated = function authenticated(req, res, next){
	req.session.isAuthenticated = req.session.isAuthenticated ? true : false;
	res.locals.isAuthenticated = req.session.isAuthenticated;
	if (req.session.isAuthenticated) {
		res.locals.user = req.session.user;
	}
	next();
};

module.exports.requireAuthentication = function requireAuthentication(req, res, next){
	if (req.session.isAuthenticated) {
		next();
	}else {
		res.redirect(router.login);
	}
};

module.exports.auth = function auth(mobile, password, session, callback){

	var args = {
      data: { mobile: parseInt(mobile), password: password, apiKey:  config.api.key},
      headers: { "Content-Type": "application/json" }
  };
  var req = client.post(config.api.url+ "/login", args, function (data, response) {
  	console.log(" >>> ", JSON.stringify(data));
  	if (data && data.success == true){
   		console.log("data "+ data);
    	session.isAuthenticated = true;
			session.user = data;
			callback(null, data);
    }else{
    	callback(data, null);
    }
  });
};

module.exports.sendOtp = function sendOtp(mobile, callback){

	var args = {
        data: { mobile: mobile,apiKey: config.api.key},
        headers: { "Content-Type": "application/json" }
    };

    console.log('url = '+ config.api.url+"/forgot-password?apikey="+config.api.key);
    //console.log('args = '+ JSON.stringify(args));
    client.post(config.api.url+"/api/forgot-password?apikey="+config.api.key, args, function (data, response) {
        //console.log("data got "+ JSON.stringify(data));
        if (data && data.error){
            console.log("data "+ data);
            callback(data, null);
        }else{
            callback(null, data);
        }
    });
};
module.exports.verifyOtp = function verifyOtp(data1, callback){
	var args = {
        data: { otp: data1.otp,newPassword:data1.newPassword, apiKey: config.api.key},
        headers: { "Content-Type": "application/json" }
    };
    client.post(config.api.url+ "/api/reset?apikey="+config.api.key, args, function (data, response) {
        console.log("data "+ JSON.stringify(data));
        if (data && data.success === true){
            console.log("data "+ data);
            callback(null, data);
        }else{
            callback(data, null);
        }
    });
 };  
module.exports.logOut = function logOut(session){
	client.get(config.api.url+ "/api/logout?token="+ session.user.token, function (data, response) {
	  	if (data){
	   		console.log("data "+ data);
	    		session.isAuthenticated = false;
				delete session.user;
	    }else{
	    	throw new Error();
	    }
	});
};

module.exports.templateRoutes = function templateRoutes(req, res, next){
	res.locals.routes = router;
	next();
};

module.exports.templateApi = function templateApi(req, res, next){
	res.locals.api = config.api;
	next();
};

module.exports.defaults = function defaults(req, res, next){
	res.locals.defaults = config.defaults;
	next();
};