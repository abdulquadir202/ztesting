exports.notFound = function notFound(req, res, next){
	if(req.session && req.session.user){
		res.status(404).render('404', {layout: 'layout-login', menu: '', title: 'Wrong Turn',sidebar:'',description:'',keywords:'',canonical:'',bodyProp:''});
	}else{
		res.status(404).render('404', {layout: 'layout-login', menu: '', title: 'Wrong Turn',sidebar:'',description:'',keywords:'',canonical:'',bodyProp:''});
	}
};

exports.error = function error(err, req, res, next){
	console.log(err);
	if(req.session && req.session.user){
		res.status(500).render('500', {layout: 'layout-login',menu: '', title: 'Mistakes Were Made',sidebar:'',description:'',keywords:'',canonical:'',bodyProp:''});
	}else{
		res.status(500).render('500', {layout: 'layout-login',menu: '', title: 'Mistakes Were Made',sidebar:'',description:'',keywords:'',canonical:'',bodyProp:''});
	}
};  