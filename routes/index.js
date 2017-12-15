var util = require('../middleware/utilities'),
	business = require('../service/organisation'),
	blogService = require('../service/blogService'),
	visitorService = require('../service/visitorService'),
	leadService = require('../service/leadService'),	
	env = require('../env'),
	moment = require('moment'),
	config = require('../config/' + env.name),
	router = require('../uiroutes');

module.exports.index = index;
module.exports.ps_website_index = ps_website_index;
module.exports.ps_website_work = ps_website_work;
module.exports.ps_website_contact = ps_website_contact;
module.exports.ps_website_blog = ps_website_blog;
module.exports.ps_website_blog_detail = ps_website_blog_detail;
module.exports.ps_website_about = ps_website_about; 

//module.exports.ps_website_case_study = ps_website_case_study;

module.exports.website = website;
module.exports.stories = stories;
module.exports.pricing = pricing;
module.exports.blog = blog;
module.exports.blogDetail = blogDetail; 

module.exports.about = about;
module.exports.vision = vision;
module.exports.career = career;
module.exports.jobDetail = jobDetail;

module.exports.contact = contact;
module.exports.support = support;
module.exports.zinetgoCustomer = zinetgoCustomer;

module.exports.sms = sms;
module.exports.wallet = wallet;


module.exports.login = login;
module.exports.loginProcess = loginProcess;
module.exports.logOut = logOut;
module.exports.signup = signup;
module.exports.signupApprovalPending = signupApprovalPending;
module.exports.forgotPassword = forgotPassword;
module.exports.sendOtp = sendOtp;
module.exports.verification = verification;
module.exports.verify = verify;

//search
module.exports.search = search;

//dashboard
module.exports.dashboard = dashboard;
//module.exports.dashboardOrders = dashboardOrders;
module.exports.homeCarosal = homeCarosal;
module.exports.homeCarosalAdd = homeCarosalAdd;

//org
module.exports.preferences = preferences;
module.exports.integration = integration;
module.exports.documents = documents;
module.exports.templetes = templetes;
module.exports.orgDetail = orgDetail;
module.exports.branches = branches;
module.exports.branchesAdd = branchesAdd;
module.exports.bankAccounts = bankAccounts;
module.exports.bankAccountsAdd = bankAccountsAdd;
module.exports.departments = departments;
module.exports.departmentsAdd = departmentsAdd;

//jobs
module.exports.jobsOpenings = jobsOpenings;
module.exports.jobsOpeningsAdd = jobsOpeningsAdd;
module.exports.jobsOpeningsDetail = jobsOpeningsDetail;
module.exports.jobsOpeningsEdit =jobsOpeningsEdit;

module.exports.applicants = applicants;
module.exports.applicantsDetail = applicantsDetail;
//contacts
module.exports.customers = customers;
module.exports.customersAdd = customersAdd;
module.exports.customersDetail = customersDetail;

module.exports.vendors = vendors;
module.exports.vendorsAdd = vendorsAdd;
module.exports.visitors = visitors;

module.exports.visitorscsv = visitorscsv;

module.exports.visitorsAdd = visitorsAdd;
module.exports.visitorsDetail = visitorsDetail;
module.exports.visitorsEdit = visitorsEdit;
module.exports.employee = employee;
module.exports.employeeAdd = employeeAdd;
module.exports.employeeDetail = employeeDetail;
module.exports.employeeEdit = employeeEdit;

module.exports.VendorsNew = VendorsNew;
module.exports.VendorsDetail = VendorsDetail;
module.exports.VendorsLead = VendorsLead;
module.exports.VendorsService = VendorsService;
module.exports.VendorsWallet = VendorsWallet;
module.exports.VendorsRoles = VendorsRoles;
module.exports.VendorsIntegration = VendorsIntegration;

//items
module.exports.items = items;
module.exports.itemsAdd = itemsAdd;
module.exports.itemsDetail = itemsDetail;
module.exports.itemsEdit = itemsEdit;

//testimony
module.exports.testimonies = testimonies;
module.exports.testimonyAdd = testimonyAdd;
module.exports.testimonyEdit = testimonyEdit;

//accounting
//entries
module.exports.bankEntry = bankEntry;
module.exports.cashEntry = cashEntry;
module.exports.salesEntry = salesEntry;
module.exports.purchaseEntry = purchaseEntry;
//ledger
module.exports.bankLedger = bankLedger;
module.exports.cashLedger = cashLedger;
module.exports.salesLedger = salesLedger;
module.exports.purchaseLedger = purchaseLedger;
module.exports.customerLedger = customerLedger;
module.exports.vendorLedger = vendorLedger;
//detail
module.exports.cashLedgerDetail = cashLedgerDetail;
module.exports.salesLedgerDetail = salesLedgerDetail;

module.exports.salesReport = salesReport;

//payroll
module.exports.employees = employees;
module.exports.employeesAdd = employeesAdd;
module.exports.employeesDetail = employeesDetail;
module.exports.leaves = leaves;
module.exports.leavesAdd = leavesAdd;

//expense
module.exports.expenseEntry = expenseEntry;
module.exports.expenseLedger = expenseLedger;

//leads
module.exports.leads = leads;
module.exports.leadscsv = leadscsv;
module.exports.leadsAdd = leadsAdd;
module.exports.leadsDetail = leadsDetail;
module.exports.leadsEdit = leadsEdit;
module.exports.leadsCalendar = leadsCalendar;
module.exports.leadSources = leadSources;
module.exports.leadSourcesAdd = leadSourcesAdd;
module.exports.leadsSubscription = leadsSubscription;
module.exports.leadsSubscriptionAdd = leadsSubscriptionAdd;
module.exports.leadsSubscriptionDetail = leadsSubscriptionDetail;
module.exports.leadsSubscriptionEdit = leadsSubscriptionEdit;
module.exports.quotationsPreview = quotationsPreview;
module.exports.quotationsGst = quotationsGst;
module.exports.invoice = invoice;
module.exports.quotationsgenerate = quotationsgenerate;
module.exports.quotations = quotations;
module.exports.quotationsAdd = quotationsAdd;
module.exports.quotationsEdit = quotationsEdit;
module.exports.quotationsDetail = quotationsDetail;
module.exports.inspections = inspections;
module.exports.inspectionsAdd = inspectionsAdd;

//jobs
module.exports.jobs = jobs;
module.exports.jobsAdd = jobsAdd;
module.exports.invoices = invoices;
module.exports.invoicesAdd = invoicesAdd;
module.exports.invoicesDetail = invoicesDetail;


//products
//catalog
module.exports.products = products;
module.exports.productsAdd = productsAdd;
module.exports.productsDetail = productsDetail;
module.exports.productsEdit = productsEdit;
module.exports.productsPhotoUpload = productsPhotoUpload;
module.exports.productsVariations = productsVariations;

module.exports.productCategories = productCategories;
module.exports.productCategoriesAdd = productCategoriesAdd;
module.exports.productCategoryDetail = productCategoryDetail;
module.exports.productCategoryEdit = productCategoryEdit;

//coupon
module.exports.coupons = coupons;
module.exports.couponsAdd = couponsAdd;
module.exports.couponsDetail = couponsDetail;
module.exports.couponsEdit = couponsEdit;

//orders
module.exports.orders = orders;
module.exports.ordersAdd = ordersAdd;
module.exports.ordersDetail = ordersDetail;
module.exports.ordersEdit = ordersEdit;

//marketing
module.exports.smsCampaigns = smsCampaigns;
module.exports.smsCampaignsAdd = smsCampaignsAdd;

//tasks
module.exports.tasks = tasks;
module.exports.tasksAdd = tasksAdd;
module.exports.tasksEdit = tasksEdit;
module.exports.tasksDetail = tasksDetail;

//helpDesk
module.exports.helpDesk = helpDesk;
module.exports.helpDeskAdd = helpDeskAdd;
module.exports.helpDeskDetail = helpDeskDetail;
module.exports.helpDeskEdit = helpDeskEdit;

module.exports.assetNew = assetNew;
module.exports.assetList = assetList;
module.exports.assetDetail = assetDetail;
module.exports.assetEdit = assetEdit;

module.exports.maintenanceAdd = maintenanceAdd;
module.exports.maintenanceList = maintenanceList;
module.exports.maintenanceDetail = maintenanceDetail;
module.exports.maintenanceEdit = maintenanceEdit;
//-------------------------//----- Welfare Association ------//--------------------------//
//events
module.exports.waEvents = waEvents;
module.exports.waEventsAdd = waEventsAdd;
module.exports.eventsPhotoUpload = eventsPhotoUpload;
module.exports.eventsDetail = eventsDetail;

//activities
module.exports.waActivities = waActivities;
module.exports.waActivitiesAdd = waActivitiesAdd;
module.exports.activitiesDetail = activitiesDetail;
module.exports.activitiesEdit = activitiesEdit;

//events
module.exports.waCenters = waCenters;
module.exports.waCentersAdd = waCentersAdd;
module.exports.centersDetail = centersDetail;

//members
module.exports.waMembers = waMembers;
module.exports.waMembersAdd = waMembersAdd;
module.exports.membersDetail = membersDetail;

//magazines
module.exports.waMagazines = waMagazines;
module.exports.waMagazinesAdd = waMagazinesAdd;
module.exports.magazinesDetail = magazinesDetail;

//schools
module.exports.waSchools = waSchools;
module.exports.waSchoolsAdd = waSchoolsAdd;
module.exports.schoolsDetail = schoolsDetail;

//shoppe
module.exports.waShoppe = waShoppe;
module.exports.waShoppeAdd = waShoppeAdd;
module.exports.shoppeDetail = shoppeDetail;

//activities
module.exports.waPresidentsNote = waPresidentsNote;
module.exports.waPresidentsNoteAdd = waPresidentsNoteAdd;
module.exports.presidentsNoteDetail = presidentsNoteDetail;

//committee
module.exports.waCommittee = waCommittee;
module.exports.waCommitteeAdd = waCommitteeAdd;
module.exports.committeeDetail = committeeDetail;


//------------------------------// Blogger //---------------------------------------------------//
//blog
//posts
module.exports.blogPosts = blogPosts;
module.exports.blogPostsAdd = blogPostsAdd;
module.exports.blogPostsDetail = blogPostsDetail;
module.exports.blogPostsEdit = blogPostsEdit;

//categories
module.exports.blogCategories = blogCategories;
module.exports.blogCategoriesAdd = blogCategoriesAdd;
module.exports.blogCategoriesDetail = blogCategoriesDetail;
//blog subscriber
module.exports.blogSubscribers = blogSubscribers;

//users
//authors
module.exports.usersAuthorsList = usersAuthorsList;
module.exports.usersAuthorsAdd = usersAuthorsAdd;
module.exports.usersAuthorsDetail = usersAuthorsDetail;
module.exports.usersAuthorsEdit = usersAuthorsEdit;

//editors
module.exports.usersEditorsList = usersEditorsList;
module.exports.usersEditorsAdd = usersEditorsAdd;
module.exports.usersEditorsDetail = usersEditorsDetail;


function ps_website_index(req,res){
	res.render('ps/website/index', {
		layout: 'layout-ps',
		title: 'The perfect platform to build your online business',
		description: 'At Zinetgo, we shape online businesses of the future. Our expert software delivers customizable templates and provides post-website development services, which include internet marketing and business process management to help small businesses go online, and grow online. Through our dedication to offering the highest quality products and services, and our passion for innovation and continued growth, we remain committed to achieving our vision of becoming industry leaders for small businesses looking to thrive online.',
		keywords: 'online business, website',
		canonical: '/',
		headerWrapper: 'header-wrapper-home',
		bodyClass: 'home-page',
		css: ["/ps/plugins/font-awesome/css/font-awesome.css","/ps/plugins/elegant_font/css/style.css","/ps/plugins/flexslider/flexslider.css","/ps/plugins/owl-carousel/owl.carousel.css","/ps/plugins/owl-carousel/owl.theme.css","/ps/css/styles.css"],
		scripts: ["/ps/plugins/jquery-match-height/jquery.matchHeight-min.js","/ps/plugins/FitVids/jquery.fitvids.js","/ps/js/main.js","/ps/plugins/flexslider/jquery.flexslider-min.js", "/ps/js/flexslider-custom.js", "/ps/plugins/jquery.validate.min.js", "/ps/js/form-validation-custom.js","/ps/plugins/isMobile/isMobile.min.js","/ps/js/form-mobile-fix.js","/ps/plugins/owl-carousel/owl.carousel.js", "/ps/js/owl-custom.js"],
		menu: 'home'
	});
};

function ps_website_work(req,res){
	res.render('ps/website/work', {
		layout: 'layout-ps',
		title: 'The perfect platform to build your online business',
		description: 'At Zinetgo, we shape online businesses of the future. Our expert software delivers customizable templates and provides post-website development services, which include internet marketing and business process management to help small businesses go online, and grow online. Through our dedication to offering the highest quality products and services, and our passion for innovation and continued growth, we remain committed to achieving our vision of becoming industry leaders for small businesses looking to thrive online.',
		keywords: 'online business, website',
		canonical: '/',
		headerWrapper: 'header-wrapper-work',
		bodyClass: 'work-page',
		css:["/ps/plugins/bootstrap/css/bootstrap.min.css","/ps/plugins/font-awesome/css/font-awesome.css","/ps/plugins/elegant_font/css/style.css","/ps/css/styles.css"],
		scripts: ["/ps/plugins/jquery-match-height/jquery.matchHeight-min.js","/ps/plugins/FitVids/jquery.fitvids.js","/ps/js/main.js","/ps/plugins/imagesloaded.pkgd.min.js","/ps/plugins/isotope.pkgd.min.js","/ps/js/isotope-custom.js"],
		menu: 'work'
	});
};

function ps_website_contact(req,res){
	res.render('ps/contact', {
		layout: 'layout-ps',
		title: 'The perfect platform to build your online business',
		description: 'At Zinetgo, we shape online businesses of the future. Our expert software delivers customizable templates and provides post-website development services, which include internet marketing and business process management to help small businesses go online, and grow online. Through our dedication to offering the highest quality products and services, and our passion for innovation and continued growth, we remain committed to achieving our vision of becoming industry leaders for small businesses looking to thrive online.',
		keywords: 'online business, website',
		canonical: '/',
		headerWrapper: 'header-wrapper-contact',
		bodyClass: 'contact-page',
		css:["/ps/plugins/bootstrap/css/bootstrap.min.css","/ps/plugins/font-awesome/css/font-awesome.css","/ps/plugins/elegant_font/css/style.css","/ps/css/styles.css"],
		scripts: ["/ps/plugins/jquery-match-height/jquery.matchHeight-min.js","/ps/plugins/FitVids/jquery.fitvids.js","/ps/js/main.js","/ps/plugins/jquery.validate.min.js","/ps/js/form-validation-custom.js","/ps/plugins/isMobile/isMobile.min.js","/ps/js/form-mobile-fix.js"],
		menu: 'contact'
	});
};

function ps_website_blog(req,res){
	res.render('ps/blog', {
		layout: 'layout-ps',
		title: 'The perfect platform to build your online business',
		description: 'At Zinetgo, we shape online businesses of the future. Our expert software delivers customizable templates and provides post-website development services, which include internet marketing and business process management to help small businesses go online, and grow online. Through our dedication to offering the highest quality products and services, and our passion for innovation and continued growth, we remain committed to achieving our vision of becoming industry leaders for small businesses looking to thrive online.',
		keywords: 'online business, website',
		canonical: '/',
		headerWrapper: 'header-wrapper-blog-home',
		bodyClass: 'blog-home-page',
		css:["/ps/plugins/font-awesome/css/font-awesome.css","/ps/plugins/elegant_font/css/style.css","/ps/css/styles.css"],
		scripts: ["/ps/plugins/jquery-match-height/jquery.matchHeight-min.js","/ps/plugins/FitVids/jquery.fitvids.js","/ps/js/main.js"],
		menu: 'blog'
	});
};

function ps_website_blog_detail(req,res){
	res.render('ps/website/blogs/'+ req.params.id, {
		layout: 'layout-ps',
		title: 'The perfect platform to build your online business',
		description: 'At Zinetgo, we shape online businesses of the future. Our expert software delivers customizable templates and provides post-website development services, which include internet marketing and business process management to help small businesses go online, and grow online. Through our dedication to offering the highest quality products and services, and our passion for innovation and continued growth, we remain committed to achieving our vision of becoming industry leaders for small businesses looking to thrive online.',
		keywords: 'online business, website',
		canonical: '/',
		headerWrapper: null,
		bodyClass: 'blog-post-page no-header-wrapper',
		css:["/ps/plugins/font-awesome/css/font-awesome.css","/ps/plugins/elegant_font/css/style.css","/ps/plugins/rrssb/css/rrssb.css","/ps/css/styles.css"],
		scripts: ["/ps/plugins/jquery-match-height/jquery.matchHeight-min.js","/ps/plugins/FitVids/jquery.fitvids.js","/ps/js/main.js","/ps/plugins/rrssb/js/rrssb.min.js","/ps/plugins/jquery.validate.min.js","/ps/js/form-validation-custom.js","/ps/plugins/isMobile/isMobile.min.js","/ps/js/form-mobile-fix.js"],
		menu: 'blog'
	});
};

function ps_website_about(req,res){
	res.render('ps/about', {
		layout: 'layout-ps',
		title: 'The perfect platform to build your online business',
		description: 'At Zinetgo, we shape online businesses of the future. Our expert software delivers customizable templates and provides post-website development services, which include internet marketing and business process management to help small businesses go online, and grow online. Through our dedication to offering the highest quality products and services, and our passion for innovation and continued growth, we remain committed to achieving our vision of becoming industry leaders for small businesses looking to thrive online.',
		keywords: 'online business, website',
		canonical: '/',
		headerWrapper: 'header-wrapper header-wrapper-about',
		bodyClass: 'about-page',
		css:["/ps/plugins/bootstrap/css/bootstrap.min.css","/ps/plugins/font-awesome/css/font-awesome.css","/ps/plugins/elegant_font/css/style.css","/ps/css/styles.css"],
		scripts: ["/ps/plugins/jquery-match-height/jquery.matchHeight-min.js","/ps/plugins/FitVids/jquery.fitvids.js","/ps/js/main.js"],
		menu: 'about'
	});
};

//product site


function index(req, res){
	res.render('index', {
		layout: 'layout',
		title: 'The perfect platform to build your online business',
		description: 'At Zinetgo, we shape online businesses of the future. Our expert software delivers customizable templates and provides post-website development services, which include internet marketing and business process management to help small businesses go online, and grow online. Through our dedication to offering the highest quality products and services, and our passion for innovation and continued growth, we remain committed to achieving our vision of becoming industry leaders for small businesses looking to thrive online.',
		keywords: 'online business, website',
		canonical: '/',
		bodyProp: 'data-spy="scroll" data-target="#page-nav"'
	});
};
function website(req, res){
	res.render('public/products/website', {
		layout: 'layout',
		title: 'Go online! Grow online',
		description: 'Wish a gift and Gift a wish',
		keywords: 'Wish a gift and Gift a wish',
		canonical: 'Wish a gift and Gift a wish',
		bodyProp: 'class=features-page data-spy=scroll data-target=#page-nav data-gr-c-s-loaded=true'
	});
};
function stories(req, res){
	res.render('stories', {
		layout: 'layout',
		title: 'Go online! Grow online',
		description: 'Wish a gift and Gift a wish',
		keywords: 'Wish a gift and Gift a wish',
		canonical: 'Wish a gift and Gift a wish',
		bodyProp: 'class=stories-page data-spy=scroll data-target=#page-nav data-gr-c-s-loaded=true'
	});
};
function pricing(req, res){
	res.render('pricing', {
		layout: 'layout',
		title: 'Go online! Grow online',
		description: 'Wish a gift and Gift a wish',
		keywords: 'Wish a gift and Gift a wish',
		canonical: 'Wish a gift and Gift a wish',
		bodyProp: 'class=pricing-page data-spy=scroll data-target=#page-nav data-gr-c-s-loaded=true'
	});
};
function blog(req, res){
	res.render('blog', {
		layout: 'layout',
		title: 'Go online! Grow online',
		description: 'Wish a gift and Gift a wish',
		keywords: 'Wish a gift and Gift a wish',
		canonical: 'Wish a gift and Gift a wish',
		bodyProp: 'class=blog-page data-spy=scroll data-target=#page-nav data-gr-c-s-loaded=true'
	});
};
function blogDetail(req, res){
	res.render('blog-detail', {
		layout: 'layout',
		title: 'Go online! Grow online',
		description: 'Wish a gift and Gift a wish',
		keywords: 'Wish a gift and Gift a wish',
		canonical: 'Wish a gift and Gift a wish',
		bodyProp: 'class=blog-single-page data-gr-c-s-loaded=true'
	});
};
function about(req, res){
	res.render('about', {
		layout: 'layout',
		title: 'Go online! Grow online',
		description: 'Wish a gift and Gift a wish',
		keywords: 'Wish a gift and Gift a wish',
		canonical: 'Wish a gift and Gift a wish',
		bodyProp: 'class=about-page data-spy=scroll data-target=#page-nav data-gr-c-s-loaded=true'
	});
};
function vision(req, res){
	res.render('vision', {
		layout: 'layout',
		title: 'Go online! Grow online',
		description: 'Wish a gift and Gift a wish',
		keywords: 'Wish a gift and Gift a wish',
		canonical: 'Wish a gift and Gift a wish',
		bodyProp: 'data-spy="scroll" data-target="#page-nav"'
	});
};
function career(req, res){
	res.render('career', {
		layout: 'layout',
		title: 'Go online! Grow online',
		description: 'Wish a gift and Gift a wish',
		keywords: 'Wish a gift and Gift a wish',
		canonical: 'Wish a gift and Gift a wish',
		bodyProp: 'class=career-page data-spy=scroll data-target=#page-nav data-gr-c-s-loaded=true'
	});
};
function jobDetail(req, res){
	res.render('job-detail', {
		layout: 'layout',
		title: 'Go online! Grow online',
		description: 'Wish a gift and Gift a wish',
		keywords: 'Wish a gift and Gift a wish',
		canonical: 'Wish a gift and Gift a wish',
		bodyProp: 'class=job-single-page data-gr-c-s-loaded=true'
	});
};
function contact(req, res){
	res.render('contact', {
		layout: 'layout',
		title: 'Go online! Grow online',
		description: 'Wish a gift and Gift a wish',
		keywords: 'Wish a gift and Gift a wish',
		canonical: 'Wish a gift and Gift a wish',
		bodyProp: 'class=contact-page data-spy=scroll data-target=#page-nav data-gr-c-s-loaded=true'
	});
};
function support(req, res){
	res.render('support', {
		layout: 'layout',
		title: 'Go online! Grow online',
		description: 'Wish a gift and Gift a wish',
		keywords: 'Wish a gift and Gift a wish',
		canonical: 'Wish a gift and Gift a wish',
		bodyProp: 'class=support-page data-spy=scroll data-target=#page-nav data-gr-c-s-loaded=true'
	});
};
function zinetgoCustomer(req, res){
	res.render('customers', {
		layout: 'layout',
		title: 'Go online! Grow online',
		description: 'Zinetgo.com - our clients/customers',
		keywords: 'zinetgo,zinetgo.com,hurreh,customers',
		canonical: 'Go online! Grow online',
		bodyProp: 'class=support-page data-spy=scroll data-target=#page-nav data-gr-c-s-loaded=true'
	});
};

function login(req, res){
	res.render('login', {layout: 'layout-login',title: 'Login', message: req.flash('error'),status:false});
	//res.render('maintenance', {layout: 'layout-verify',title: 'server maintenance'});
				
};
function loginProcess(req, res){
	var meCallback = function(error, data){
		if(!error){
			res.redirect(router.dashboard);
		}else{
			if(error && error.message && error.message === 'Your account verification pending'){
				res.render('signup-approval-pending', {layout: 'layout-verify',title: error.message, data: error.user});
				// req.user = error.user;
				// req.msg = error.message;
				// res.redirect(router.signupApprovalPending);

			}else{
				req.flash('error', 'Wrong mobile number or password ');
				res.redirect(router.login);
			}
		}
	};
	util.auth(req.body.mobile, req.body.password, req.session, meCallback);
};
function logOut(req, res){
	util.logOut(req.session);
	res.redirect('/');
};
function signup(req, res){
	res.render('signup', {layout: 'layout-login',title: 'Signup', message: req.flash('error')});
};
function signupApprovalPending(req, res){
	console.log(JSON.stringify(req.user));
	res.render('signup-approval-pending', {layout: 'layout-verify',title: 'Account verification pending', data: null});
};
function forgotPassword(req, res){
	res.render('forgot-password', {layout: 'layout-login',title: 'Forgot Password', message: req.flash('error')});
};


function sendOtp(req, res){
    var meCallback = function(error, data){
        if(error && (error !=null || error.error === "User doesn't exists.")){
            res.render('forgot-password', {
                layout: 'layout-login',
                title: 'Forgot Password',
                message: error.error
            });
        }else{
           res.redirect('/verify-otp');
        }
    }
    util.sendOtp(req.body.mobile, meCallback);
};

function verification(req, res){
    res.render('verification', {layout: 'layout-login',title: 'Otp Verify', message: req.flash('error')});
};

function verify(req, res){
	var ndata ={
		otp: req.body.otp,
		newPassword: req.body.newPassword
	}
    var meCallback = function(error, data){
        if(data && data.success && data.success === true){
            res.render('login', {layout: 'layout-login',title: 'Login', message: data.message ,status:true});
        }else{
            console.log("error===="+error.error);
            res.render('verification', {layout: 'layout-login',title: 'Login', message: error.error});
        }
    }
    util.verifyOtp(ndata, meCallback);
};

//search
function search(req, res){
	res.render('search', {layout: 'layout-al',pagescript:null,sidebar: '',menu: '',title: 'Search'});
};

// Dashboard
function dashboard(req, res){
	console.log("user-----"+req.session.user.orgType);
	if(req.session.user && req.session.user.orgType && req.session.user.orgType === 'welfare-association'){
		//welfare associations
		res.render('dashboard/wa-dashboard', {layout: 'layout-al',pagescript:'/js/onground/dashboard/wa-dashboard.js',sidebar: '',menu: 'dashboard',title: 'Dashboard'});

	}else if(req.session.user && req.session.user.orgType && req.session.user.orgType === 'blog'){
		//welfare associations
		res.render('dashboard/blog-dashboard', {layout: 'layout-al',pagescript:'/js/onground/dashboard/blog-dashboard.js',sidebar: '',menu: 'dashboard',title: 'Dashboard'});
	}else if(req.session.user && req.session.user.orgType && req.session.user.orgType === 'business'){
		//business
		if(req.session.user.profile.roles && req.session.user.profile.roles.indexOf('job-mgmt') >= 0){
			res.render('dashboard/default', {layout: 'layout-al',pagescript:'/js/onground/dashboard/default.js',sidebar: '',menu: 'dashboard',title: 'Dashboard',tStatus: req.query.status||''});
		}else{
			res.render('dashboard/orders', {layout: 'layout-al',pagescript:'/js/onground/dashboard/orders.js',sidebar: '',menu: 'dashboard',title: 'Dashboard',tStatus: req.query.status||''});
		}
	}
};
// function dashboardOrders(req, res){
// 	res.render('dashboard/orders', {layout: 'layout-al',pagescript:null,sidebar: '',menu: 'dashboard',title: 'Orders Dashboard'});
// };

// business
function orgDetail(req, res){
	var showOrganisation = function(error, data){
		if(!error){
			res.render('business/org/detail', {layout: 'layout-al',pagescript:'/js/onground/business/org/org-edit.js',sidebar: '',menu: 'business-orgs-profile',title: 'Organisation', data: data});
		}else{
			req.flash('error', 'Something went Wrong. Please try again later.');
			res.redirect(router.dashboard);
		}
	};
	business.getOrganisation(req.session, showOrganisation);
};

function preferences(req, res){
    res.render('business/org/preference', {layout: 'layout-al',pagescript:'/js/onground/business/org/preference-add.js',sidebar: '',menu: 'business-orgs-profile', title: 'Organisation-preferences'});
};

function integration(req, res){
	
    res.render('business/org/integration', {layout: 'layout-al',pagescript:'/js/onground/business/org/integration-add.js',sidebar: '',menu: 'business-orgs-Integration', title: 'Zinetgo-Organisation-Integration',uname:req.params.uname});
};


function templetes(req, res){
    res.render('business/org/templetes', {layout: 'layout-al',pagescript:'/js/onground/business/org/template-add.js',sidebar: '',menu: 'business-orgs-profile', title: 'Organisation-templates'});
};

function documents(req, res){
    res.render('business/org/documents', {layout: 'layout-al',pagescript:'/js/onground/business/org/documents.js',sidebar: '',menu: 'business-orgs-profile-Zinetgo.com', title: 'Organisation-documents',uname:req.params.uname});
};

function branches(req, res){
	res.render('business/org/branches-list', {layout: 'layout-al',pagescript:null,sidebar: '',menu: 'business-orgs-branches-list',title: 'Branches'});
};
function branchesAdd(req, res){
	res.render('business/org/branches-add', {layout: 'layout-al',pagescript:null,sidebar: '',menu: 'business-orgs-branches-add',title: 'Add Branches', message: req.flash('error')});
};
function bankAccounts(req, res){
	res.render('business/org/bank-accounts-list', {layout: 'layout-al',pagescript:null,sidebar: '',menu: 'business-orgs-bank-accounts-list',title: 'Bank Accounts'});
};
function bankAccountsAdd(req, res){
	res.render('business/org/bank-accounts-add', {layout: 'layout-al',pagescript:null,sidebar: '',menu: 'business-orgs-bank-accounts-add',title: 'Add Bank Accounts', message: req.flash('error')});
};
function departments(req, res){
	res.render('business/org/departments-list', {layout: 'layout-al',pagescript:null,sidebar: '',menu: 'business-orgs-departments-list',title: 'Departments'});
};
function departmentsAdd(req, res){
	res.render('business/org/departments-add', {layout: 'layout-al',pagescript:null,sidebar: '',menu: 'business-orgs-departments-add',title: 'Add Departments', message: req.flash('error')});
};
//Job
function jobsOpenings(req, res){
	res.render('careers/job-list', {layout: 'layout-al',pagescript:'/js/onground/careers/job-list.js',sidebar: '',menu: 'job-openings-list',title: 'job-openings', description:'job-list'});
};
function jobsOpeningsAdd(req, res){
	res.render('careers/job-openings-add', {layout: 'layout-al',pagescript:'/js/onground/careers/job-openings-add.js',sidebar: '',menu: 'job-openings-add',title: 'job-openings',description:'job-list', message: req.flash('error')});
};
function jobsOpeningsDetail(req, res){
	res.render('careers/job-openings-detail', {layout: 'layout-al',pagescript:'/js/onground/careers/job-openings-details.js',sidebar: '',menu: 'job-openings-details',title: 'Job Detail', jobId: req.params.id});
};
function jobsOpeningsEdit(req, res){
    res.render('careers/job-openings-edit', {layout: 'layout-al',pagescript:'/js/onground/careers/job-openings-edit.js',sidebar: '',menu: 'job-openings-edit', title: 'Edit job openings', jobId: req.params.id});
};

function applicants(req, res){
	res.render('careers/applicant-list', {layout: 'layout-al',pagescript:'/js/onground/careers/applicant-list.js',sidebar: '',menu: 'applicant-list',title: 'Applicant-list', description:'applicant-list'});
};
function applicantsDetail(req, res){
	res.render('careers/applicant-details', {layout: 'layout-al',pagescript:'/js/onground/careers/applicant-details.js',sidebar: '',menu: 'applicant-detail',title: 'Applicant Detail', applicantId: req.params.id});
};


//contacts
function customers(req, res){
	res.render('contacts/customers/customer-list', {layout: 'layout-al',pagescript:'/js/onground/contacts/customers/customer-list.js',sidebar: '',menu: 'contacts-customers-list',title: 'Customers'});
};
function customersAdd(req, res){
	res.render('contacts/customers/customer-add', {layout: 'layout-al',pagescript:'/js/onground/contacts/customers/customer-add.js',sidebar: '',menu: 'contacts-customers-add',title: 'Add Customers', message: req.flash('error')});
};
function customersDetail(req, res){
	res.render('contacts/customers/customer-detail', {layout: 'layout-al',pagescript:'/js/onground/contacts/customers/customer-detail.js',sidebar: '',menu: 'contacts-customers-detail',title: 'Customer Detail', customerId: req.params.id});
};

function vendors(req, res){
	res.render('contacts/vendors/vendor-list', {layout: 'layout-al',pagescript:'/js/onground/contacts/vendors/vendor-list.js',sidebar: '',menu: 'contacts-vendors-list',title: 'Vendors'});
};
function vendorsAdd(req, res){
	res.render('contacts/vendors/vendor-add', {layout: 'layout-al',pagescript:'/js/onground/contacts/vendors/vendor-add.js',sidebar: '',menu: 'contacts-vendors-add',title: 'Add Vendors'});
};
function visitors(req, res){
	var visitorsData = function(error,data){
		if(!error){
			var from = '';
			var to ='';
			var option = '';
			if(req.query.fromDate){
				from = req.query.fromDate;
			}
			if(req.query.toDate){
				to = req.query.toDate;
			}
			if(req.query.q){
				option = req.query.q;
			}
			res.render('contacts/visitors/visitor-list', {layout: 'layout-al',pagescript:'/js/onground/contacts/visitors/visitor-list.js',sidebar: '',menu: 'contacts-visitors-list',title: 'Visitors', data: data.data, moment:moment,total: data.total,pno: data.pno,psize: data.psize,from:from,to:to,option:option});
		}else{
			req.flash('error', 'Something went Wrong. Please try again later.');
			res.redirect(router.dashboard);
		}
	}
	visitorService.list(req,req.session, visitorsData);
	//res.render('contacts/visitors/visitor-list', {layout: 'layout-al',pagescript:'/js/onground/contacts/visitors/visitor-list.js',sidebar: '',menu: 'contacts-visitors-list',title: 'Visitors'});
};

function visitorscsv(req, res){
	visitorService.csv(req,req.session, res);
	//res.render('contacts/visitors/visitor-list', {layout: 'layout-al',pagescript:'/js/onground/contacts/visitors/visitor-list.js',sidebar: '',menu: 'contacts-visitors-list',title: 'Visitors'});
};
function visitorsAdd(req, res){
	res.render('contacts/visitors/visitor-add', {layout: 'layout-al',pagescript:'/js/onground/contacts/visitors/visitor-add.js',sidebar: '',menu: 'contacts-visitors-add',title: 'Add Visitors'});
};

function visitorsDetail(req, res){
	res.render('contacts/visitors/visitors-detail', {layout: 'layout-al',pagescript:'/js/onground/contacts/visitors/visitors-detail.js',sidebar: '',menu: 'contacts-visitors-detail', title: 'Visitors Detail', visitorId: req.params.id});
};

function visitorsEdit(req, res){
    res.render('contacts/visitors/visitors-edit', {layout: 'layout-al',pagescript:'/js/onground/contacts/visitors/visitors-edit.js',sidebar: '',menu: 'contacts-visitors-edit', title: 'Edit visitors details', visitorId: req.params.id});
};

function VendorsNew(req, res){
	res.render('vendor/vendor-inactive', {layout: 'layout-al',pagescript:'/js/onground/vendors/vendor-inactive.js',sidebar: '',menu: 'vendors-'+req.query.status+'-list',title: 'Vendors',status:req.query.status});
};

function VendorsDetail(req, res){
	res.render('vendor/vendor-detail', {layout: 'layout-al',pagescript:'/js/onground/vendors/vendors-detail.js',sidebar: '',menu: 'vendors-detail',title: 'Vendors',uname:req.params.uName});
};

function VendorsWallet(req, res){
	res.render('vendor/vendor-wallet', {layout: 'layout-al',pagescript:'/js/onground/vendors/vendors-wallet.js',sidebar: '',menu: 'vendors-wallet-zinetgo',title: 'Vendors-wallet-Zinetgo',uname:req.params.uName});
};
function VendorsRoles(req, res){
	res.render('vendor/vendor-roles', {layout: 'layout-al',pagescript:'/js/onground/vendors/vendor-roles.js',sidebar: '',menu: 'vendors-roles-zinetgo',title: 'Vendors-roles-Zinetgo',uname:req.params.uName});
};
function VendorsIntegration(req, res){
	res.render('vendor/integration', {layout: 'layout-al',pagescript:'/js/onground/vendors/vendors-integration.js',sidebar: '',menu: 'vendors-integrations-zinetgo',title: 'Vendors-integrations-Zinetgo',uname:req.params.uName});
};
function VendorsLead(req, res){
	res.render('vendor/vendor-jobs', {layout: 'layout-al',pagescript:'/js/onground/vendors/vendors-leads.js',sidebar: '',menu: 'vendors-leads',title: 'Vendors',uname:req.params.uName});
};


function VendorsService(req, res){
	res.render('vendor/vendor-services', {layout: 'layout-al',pagescript:'/js/onground/vendors/vendors-services.js',sidebar: '',menu: 'vendors-services',title: 'Vendors',uname:req.params.uName});
};



function vendors(req, res){
	res.render('contacts/vendors/vendor-list', {layout: 'layout-al',pagescript:'/js/onground/contacts/vendors/vendor-list.js',sidebar: '',menu: 'contacts-vendors-list',title: 'Vendors'});
};


function employee(req, res){
	res.render('contacts/employees/employee-list', {layout: 'layout-al',pagescript:'/js/onground/contacts/employees/employee-list.js',sidebar: '',menu: 'contacts-employee-list',title: 'Employees'});
};
function employeeAdd(req, res){
	res.render('contacts/employees/employee-add', {layout: 'layout-al',pagescript:'/js/onground/contacts/employees/employee-add.js',sidebar: '',menu: 'contacts-employee-add', title: 'Add Employees'});
};

function employeeDetail(req, res){
	res.render('contacts/employees/employee-detail', {layout: 'layout-al',pagescript:'/js/onground/contacts/employees/employee-detail.js',sidebar: '',menu: 'contacts-employee-detail', title: 'Employee Detail', employeeId: req.params.id});
};
function employeeEdit(req, res){
    res.render('contacts/employees/employee-edit', {layout: 'layout-al',pagescript:'/js/onground/contacts/employees/employee-edit.js',sidebar: '',menu: 'contacts-employee-edit', title: 'Edit employee details', employeeId: req.params.id});
};

//items
function items(req, res){
	res.render('items/item-list', {layout: 'layout-al',pagescript:'/js/onground/items/item-list.js',sidebar: '',menu: 'items-list',title: 'Items'});
};
function itemsAdd(req, res){
	res.render('items/item-add', {layout: 'layout-al',pagescript:'/js/onground/items/item-add.js',sidebar: '',menu: 'items-add',title: 'Add Items'});
};
function itemsDetail(req, res){
	res.render('items/item-detail', {layout: 'layout-al',pagescript:'/js/onground/items/item-detail.js',sidebar: '',menu: 'item-detail', title: 'Item Detail', itemId: req.params.id});
};
function itemsEdit(req, res){
	res.render('items/item-edit', {layout: 'layout-al',pagescript:'/js/onground/items/item-edit.js',sidebar: '',menu: 'item-edit', title: 'Item edit-Zinetgo.com', itemId: req.params.id});
};

//testimony
function testimonies(req, res){
	res.render('testimony/testimony-list', {layout: 'layout-al',pagescript:'/js/onground/testimony/testimony-list.js',sidebar: '',menu: 'testimonies-list',title: 'Testimonies'});
};
function testimonyAdd(req, res){
	res.render('testimony/testimony-add', {layout: 'layout-al',pagescript:'/js/onground/testimony/testimony-add.js',sidebar: '',menu: 'testimonies-add',title: 'Add Testimonies', message: req.flash('error')});
};
function testimonyEdit(req, res){
	res.render('testimony/testimony-edit', {layout: 'layout-al',pagescript:'/js/onground/testimony/testimony-edit.js',sidebar: '',menu: 'testimonies-edit',title: 'Edit Testimonies', message: req.flash('error'), testimonyId: req.params.id});
};


//accounting
// Entries

function cashEntry(req, res){
	res.render('accounting/entry/cash-entry', {layout: 'layout-al',pagescript:'/js/onground/accounting/entry/cash-entry.js',sidebar: '',menu: 'accounting-entry-cash',title: 'Cash Entry'});
};
function bankEntry(req, res){
	res.render('accounting/entry/bank-entry', {layout: 'layout-al',pagescript:'/js/onground/accounting/entry/bank-entry.js',sidebar: '',menu: 'accounting-entry-bank',title: 'Bank Entry'});
};
function salesEntry(req, res){
	res.render('accounting/entry/sales-entry', {layout: 'layout-al',pagescript:'/js/onground/accounting/entry/sales-entry.js',sidebar: '',menu: 'accounting-entry-sales',title: 'Sales Entry'});
};
function purchaseEntry(req, res){
	res.render('accounting/entry/purchase-entry', {layout: 'layout-al',pagescript:'/js/onground/accounting/entry/purchase-entry.js',sidebar: '',menu: 'accounting-entry-purchase',title: 'Purchase Entry'});
};
// Ledgers
function cashLedger(req, res){
	res.render('accounting/ledger/cash-ledger', {layout: 'layout-al',pagescript:null,sidebar: '',menu: 'accounting-ledger-cash',title: 'Cash Ledger'});
};
function bankLedger(req, res){
	res.render('accounting/ledger/bank-ledger', {layout: 'layout-al',pagescript:null,sidebar: '',menu: 'accounting-ledger-bank',title: 'Bank Ledger'});
};
function salesLedger(req, res){
	res.render('accounting/ledger/sales-ledger', {layout: 'layout-al',pagescript:null,sidebar: '',menu: 'accounting-ledger-sales',title: 'Sales Ledger'});
};
function purchaseLedger(req, res){
	res.render('accounting/ledger/purchase-ledger', {layout: 'layout-al',pagescript:null,sidebar: '',menu: 'accounting-ledger-purchase',title: 'Purchase Ledger'});
};
function customerLedger(req, res){
	res.render('accounting/ledger/customer-ledger', {layout: 'layout-al',pagescript:null,sidebar: '',menu: 'accounting-ledger-customer',title: 'Customers Ledger'});
};
function vendorLedger(req, res){
	res.render('accounting/ledger/vendor-ledger', {layout: 'layout-al',pagescript:null,sidebar: '',menu: 'accounting-ledger-vendor',title: 'Vendor Ledger'});
};
//details
function cashLedgerDetail(req, res){
	res.render('accounting/ledger/cash-ledger-detail', {layout: 'layout-al',pagescript:null,sidebar: '',menu: 'accounting-ledger-cash',title: 'Cash Ledger Detail', cashEntryId: req.params.id});
};
function salesLedgerDetail(req, res){
	res.render('accounting/ledger/sales-ledger-detail', {layout: 'layout-al',pagescript:null,sidebar: '',menu: 'accounting-ledger-sales',title: 'Sales Ledger Detail', salesEntryId: req.params.id});
};

function salesReport(req, res){
	res.render('accounting/ledger/sales-report', {layout: 'layout-report',menu: 'accounting-ledger-report',title: 'Sales Report',salesEntryId: req.params.id});
};

//payroll
function employees(req, res){
	res.render('payroll/employees-list', {layout: 'layout-al',pagescript:null,sidebar: '',menu: 'payroll-employees-list',title: 'Employees'});
};
function employeesAdd(req, res){
	res.render('payroll/employees-add', {layout: 'layout-al',pagescript:null,sidebar: '',menu: 'payroll-employees-add', title: 'Add Employees'});
};
function employeesDetail(req, res){
	res.render('payroll/employees-detail', {layout: 'layout-al',pagescript:null,sidebar: '',menu: 'payroll-employees-detail', title: 'Employees Detail', employeeId: req.params.id});
};
function leaves(req, res){
	res.render('payroll/leaves-list', {layout: 'layout-al',pagescript:null,sidebar: '',menu: 'payroll-leaves',title: 'Leaves'});
};
function leavesAdd(req, res){
	res.render('payroll/leaves-add', {layout: 'layout-al',pagescript:null,sidebar: '',menu: 'payroll-leaves-add',title: 'Leaves Add'});
};

//expenses
function expenseEntry(req, res){
	res.render('accounting/entry/expense-entry', {layout: 'layout-al',pagescript:'/js/onground/accounting/entry/expense-entry.js',sidebar: '',menu: 'accounting-entry-expense',title: 'Expenses Entry'});
};
function expenseLedger(req, res){
	res.render('accounting/ledger/expense-ledger', {layout: 'layout-al',pagescript:null,sidebar: '',menu: 'accounting-ledger-expense',title: 'Expenses Ledger'});
};

//home carosal
function homeCarosal(req, res){
	res.render('home-carosal-list', {layout: 'layout-al',pagescript:'/js/onground/dashboard/home-carosal-list.js',sidebar: '',menu: 'carosal-home',title: 'Home carosal'});
};
//home carosal
function homeCarosalAdd(req, res){
	res.render('home-carosal/home-carosal-add', {layout: 'layout-al',pagescript:'/js/onground/dashboard/home-carosal-add.js',sidebar: '',menu: 'carosal-homes-add',title: 'Add Home carosal'});
};

//leads
function leads(req, res){
	var leadsData = function(error,data){
		if(!error){
			var from = '';
			var to ='';
			var option = '';
			if(req.query.fromDate){
				from = req.query.fromDate;
			}
			if(req.query.toDate){
				to = req.query.toDate;
			}
			if(req.query.q){
				option = req.query.q;
			}
			res.render('job-management/leads-list', {layout: 'layout-al',pagescript:'/js/onground/job-management/leads-list.js',sidebar: '',menu: 'job-management-leads-leads-list',title: 'Leads', data: data.data, moment:moment,total: data.total,pno: data.pno,psize: data.psize,from:from,to:to,option:option});
		}else{
			req.flash('error', 'Something went Wrong. Please try again later.');
			res.redirect(router.dashboard);
		}
	}
	leadService.list(req,req.session, leadsData);
	//res.render('contacts/visitors/visitor-list', {layout: 'layout-al',pagescript:'/js/onground/contacts/visitors/visitor-list.js',sidebar: '',menu: 'contacts-visitors-list',title: 'Visitors'});
};
function leadscsv(req, res){
	leadService.csv(req,req.session, res);
	//res.render('contacts/visitors/visitor-list', {layout: 'layout-al',pagescript:'/js/onground/contacts/visitors/visitor-list.js',sidebar: '',menu: 'contacts-visitors-list',title: 'Visitors'});
};

/*function leads(req, res){
	res.render('job-management/leads-list', {layout: 'layout-al',pagescript:'/js/onground/job-management/leads-list.js',sidebar: '',menu: 'job-management-leads-leads-list',title: 'Leads'});
};*/
function leadsAdd(req, res){
	res.render('job-management/leads-add', {layout: 'layout-al',pagescript:'/js/onground/job-management/leads-add.js',sidebar: '',menu: 'job-management-leads-leads-add',title: 'Add Leads'});
};
function leadsDetail(req, res){
	res.render('job-management/leads-detail', {layout: 'layout-al',pagescript:'/js/onground/job-management/leads-detail.js',sidebar: '',menu: 'job-management-leads-leads-detail', title: 'Leads Detail', leadId: req.params.id});
};

function leadsEdit(req, res){
    res.render('job-management/leads-edit', {layout: 'layout-al',pagescript:'/js/onground/job-management/leads-edit.js',sidebar: '',menu: 'job-management-leads-leads-edit', title: 'Edit lead details', leadId: req.params.id});
};

function leadsCalendar(req, res){
    res.render('job-management/leads-calendar', {layout: 'layout-al',pagescript:'/assets/apps/scripts/calendar.js',sidebar: '',menu: 'job-management-leads-calendar', title: 'Edit calendar'});
};


function leadSources(req, res){
	res.render('job-management/lead-sources-list', {layout: 'layout-al',pagescript:null,sidebar: '',menu: 'job-management-leads-lead-sources-list',title: 'Lead Sources'});
};
function leadSourcesAdd(req, res){
	res.render('job-management/lead-sources-add', {layout: 'layout-al',pagescript:null,sidebar: '',menu: 'job-management-leads-lead-sources-add',title: 'Add Lead Source'});
};
function quotationsPreview(req, res){
	res.render('job-management/quotation-preview', {layout: 'layout-al',pagescript:null,sidebar: '',menu: 'job-management-leads-quotation-preview',title: 'Quotations-Zinetgo.com'});
};
function quotationsGst(req, res){
	var showOrganisation = function(error, data){
		if(!error){
			res.render('job-management/quotation-gst', {layout: 'layout-al',pagescript:'/js/onground/job-management/quotation-gst.js',sidebar: '',menu: 'job-management-leads-quotation-gst',title: 'Quotations-Zinetgo.com',leadId :req.params.id,item:req.params.item, data: data});
			//res.render('business/org/detail', {layout: 'layout-al',pagescript:'/js/onground/business/org/org-edit.js',sidebar: '',menu: 'business-orgs-profile',title: 'Organisation', data: data});
		}else{
			req.flash('error', 'Something went Wrong. Please try again later.');
			res.redirect(router.dashboard);
		}
	};
	business.getQuotation(req.session, showOrganisation);
	
};
function invoice(req, res){
	var showOrganisation = function(error, data){
		if(!error){
			res.render('job-management/invoice', {layout: 'layout-al',pagescript:'/js/onground/job-management/invoice.js',sidebar: '',menu: 'job-management-leads-invoice',title: 'Invoice-Zinetgo.com',leadId :req.params.id,item:req.params.item, data: data});
			//res.render('business/org/detail', {layout: 'layout-al',pagescript:'/js/onground/business/org/org-edit.js',sidebar: '',menu: 'business-orgs-profile',title: 'Organisation', data: data});
		}else{
			req.flash('error', 'Something went Wrong. Please try again later.');
			res.redirect(router.dashboard);
		}
	};
	business.getInvoice(req.session, showOrganisation);
	
};
function quotations(req, res){
	res.render('job-management/quotation-list', {layout: 'layout-al',pagescript:'/js/onground/job-management/quotation-list.js',sidebar: '',menu: 'job-management-leads-quotation-list',title: 'Quotations'});
};
function quotationsAdd(req, res){
	res.render('job-management/quote-add', {layout: 'layout-al',pagescript:'/js/onground/job-management/quotation-add.js',sidebar: '',menu: 'job-management-leads-quotation-add',title: 'Add Quotation', leadId:req.params.id});
};
function quotationsDetail(req, res){
	res.render('job-management/quotation-detail',{layout: 'layout-al',pagescript:'/js/onground/job-management/quotation-detail.js',sidebar:'',menu: 'job-management-leads-quotation-detail', title:'Quotation Detail', quoteId:req.params.id});
};
function quotationsEdit(req, res){
	res.render('job-management/quote-edit',{layout: 'layout-al',pagescript:null,sidebar:'',menu: 'job-management-leads-quotation-edit', title:'Quotation Edit', quoteId:req.params.id});
};
function quotationsgenerate(req, res){
	var showpdf = function(error, data){
		res.render('job-management/quotation-gst',{layout: 'layout-al',pagescript:null,sidebar:'',menu: 'job-management-leads-quotation-edit', title:'Quotation Edit', url :data.filename});
	};
	pdfService.list(req.session, showpdf);
	
};
function inspections(req, res){
	res.render('job-management/inspection-list', {layout: 'layout-al',pagescript:null,sidebar: '',menu: 'job-management-leads-inspections-list',title: 'Inspections'});
};
function inspectionsAdd(req, res){
	res.render('job-management/inspection-add', {layout: 'layout-al',pagescript:null,sidebar: '',menu: 'job-management-leads-inspections-add',title: 'Add Inspections'});
};


function leadsSubscription(req, res){
	res.render('job-management/leadsSubscription-list', {layout: 'layout-al',pagescript:'/js/onground/job-management/leadsSubscription-list.js',sidebar: '',menu: 'job-management-leadsSubscription-list',title: 'Subscriptions'});
};
function leadsSubscriptionAdd(req, res){
	res.render('job-management/leadsSubscription-add', {layout: 'layout-al',pagescript:'/js/onground/job-management/leadsSubscription-add.js',sidebar: '',menu: 'job-management-leadsSubscription-add',title: 'Add Subscriptions'});
};
function leadsSubscriptionDetail(req, res){
	res.render('job-management/leadsSubscription-detail', {layout: 'layout-al',pagescript:'/js/onground/job-management/leadsSubscription-detail.js',sidebar: '',menu: 'job-management-leadsSubscription-detail', title: 'Subscriptions Detail', subscribeId: req.params.id});
};
function leadsSubscriptionEdit(req, res){
    res.render('job-management/leadsSubscription-edit', {layout: 'layout-al',pagescript:'/js/onground/job-management/leadsSubscription-edit.js',sidebar: '',menu: 'job-management-leadsSubscription-edit', title: 'Edit Subscriptions details', subscribeId: req.params.id});
};

//jobs
function jobs(req, res){
	res.render('job-management/jobs-list', {layout: 'layout-al',pagescript:null,sidebar: '',menu: 'job-management-jobs-jobs-list',title: 'Jobs'});
};
function jobsAdd(req, res){
	res.render('job-management/jobs-add', {layout: 'layout-al',pagescript:null,sidebar: '',menu: 'job-management-jobs-jobs-add',title: 'Add Jobs'});
};
function invoices(req, res){
	res.render('job-management/invoices-list', {layout: 'layout-al',pagescript:'/js/onground/job-management/invoices-list.js',sidebar: '',menu: 'job-management-jobs-invoices-list',title: 'Invoices'});
};

function invoicesDetail(req, res){
	res.render('job-management/invoice-detail', {layout: 'layout-al',pagescript:'/js/onground/job-management/invoices-detail.js',sidebar: '',menu: 'job-management-jobs-invoices-list',title: 'Invoices',invoiceId:req.params.id});
};

function invoicesAdd(req, res){
	res.render('job-management/invoices-add', {layout: 'layout-al',pagescript:null,sidebar: '',menu: 'job-management-jobs-invoices-add',title: 'Add Invoices'});
};

//products
function products(req, res){
	res.render('products/products-list', {layout: 'layout-al',pagescript:'/js/onground/products/products-list.js',sidebar: '',menu: 'products-list',title: 'Products'});
};
function productsAdd(req, res){
	res.render('products/products-add', {layout: 'layout-al',pagescript:'/js/onground/products/products-add.js',sidebar: '',menu: 'products-add', title: 'Add product', message: req.flash('error')});
};
function productsDetail(req, res){
	res.render('products/products-detail', {layout: 'layout-al',pagescript:'/js/onground/products/products-detail.js',sidebar: '',menu: 'products-detail', title: 'Product Detail', productId: req.params.id});
};


function productsEdit(req, res){
    res.render('products/product-edit', {layout: 'layout-al',pagescript:'/js/onground/products/products-edit.js',sidebar: '',menu: 'products-edit', title: 'Edit product details', productId: req.params.id});
};

function productsPhotoUpload(req, res){
    res.render('media/product-images', {layout: 'layout-al',pagescript:null,sidebar: '',menu: 'products-upload-photos', title: 'Upload media items', productId: req.params.id});
};

function productsVariations(req, res){
	var uname = req.params.id;
	var id= req.query.id;
    res.render('products/product-variations', {layout: 'layout-al',pagescript:'/js/onground/products/product-variations.js',sidebar: '',menu: 'products-variation', title: 'Edit product variation', uname: uname, id: id,unit: req.query.unit});
};


//product categories
function productCategories(req, res){
	res.render('products/category-list', {layout: 'layout-al',pagescript:'/js/onground/products/category-list.js',sidebar: '',menu: 'products-categories-list',title: 'Categories list'});
};
function productCategoriesAdd(req, res){
	res.render('products/category-add', {layout: 'layout-al',pagescript:'/js/onground/products/category-add.js',sidebar: '',menu: 'products-categories-add', title: 'Add category', message: req.flash('error')});
};
function productCategoryDetail(req, res){
	res.render('products/category-detail', {layout: 'layout-al',pagescript:'/js/onground/products/category-detail.js',sidebar: '',menu: 'category-detail', title: 'Category Detail', categoryId: req.params.id});
};

function productCategoryEdit(req, res){
	res.render('products/category-edit', {layout: 'layout-al',pagescript:'/js/onground/products/category-edit.js',sidebar: '',menu: 'category-edit', title: 'Category Detail', categoryId: req.params.id});
};


//coupons
function coupons(req, res){
	res.render('marketing/coupons/coupon-list', {layout: 'layout-al',pagescript:'/js/onground/marketing/coupon/coupon-list.js',sidebar: '',menu: 'coupons-list',title: 'Coupons'});
};
function couponsAdd(req, res){
	res.render('marketing/coupons/coupon-add', {layout: 'layout-al',pagescript:'/js/onground/marketing/coupon/coupon-add.js',sidebar: '',menu: 'coupons-add', title: 'Add coupon', message: req.flash('error')});
};
function couponsDetail(req, res){
	res.render('marketing/coupons/coupon-detail', {layout: 'layout-al',pagescript:'/js/onground/marketing/coupon/coupon-detail.js',sidebar: '',menu: 'coupons-detail', title: 'Coupon Detail', couponId: req.params.id});
};
function couponsEdit(req, res){
    res.render('marketing/coupons/coupon-edit', {layout: 'layout-al',pagescript:'/js/onground/marketing/coupon/coupon-edit.js',sidebar: '',menu: 'coupons-edit', title: 'Edit coupon details', couponId: req.params.id});
};

//orders
function orders(req, res){
	res.render('order-management/order-list', {layout: 'layout-al',pagescript:'/js/onground/order-management/order-list.js',sidebar: '',menu: 'order-management-orders-list',title: 'Orders'});
};
function ordersAdd(req, res){
	res.render('order-management/order-add', {layout: 'layout-al',pagescript:'/js/onground/order-management/order-add.js',sidebar: '',menu: 'order-management-orders-add',title: 'Add Order', message: req.flash('error')});
};
function ordersDetail(req, res){
	res.render('order-management/order-detail', {layout: 'layout-al',pagescript:'/js/onground/order-management/order-detail.js',sidebar: '',menu: 'order-management-orders-detail', title: 'Order Detail', orderId: req.params.id});
};
function ordersEdit(req, res){
    res.render('order-management/order-edit', {layout: 'layout-al',pagescript:'/js/onground/order-management/order-edit.js',sidebar: '',menu: 'order-management-orders-edit', title: 'Edit order details', orderId: req.params.id});
};

//marketing
function smsCampaigns(req, res){
	res.render('marketing/campaigns/sms/bulksms-list', {layout: 'layout-al',pagescript:'/js/onground/marketing/campaigns/sms/bulksms-add.js',sidebar: '',menu: 'marketing-campaigns-sms-list',title: 'SMS Campaigns'});
};
function smsCampaignsAdd(req, res){
	res.render('marketing/campaigns/sms/bulksms-add', {layout: 'layout-al',pagescript:null,sidebar: '',menu: 'marketing-campaigns-sms-add',title: 'Add SMS Campaign'});
};

//tasks
function tasks(req, res){
	res.render('task-management/task-list', {layout: 'layout-al',pagescript:'/js/onground/task-management/task-list.js',sidebar: '',menu: 'task-management-task-list',title: 'Task'});
};
function tasksAdd(req, res){
	res.render('task-management/task-add', {layout: 'layout-al',pagescript:'/js/onground/task-management/task-add.js',sidebar: '',menu: 'task-management-task-add', title: 'Add Task', message: req.flash('error')});
};
function tasksEdit(req, res){
	res.render('task-management/task-edit', {layout: 'layout-al',pagescript:'/js/onground/task-management/task-edit.js',sidebar: '',menu: 'task-management-task-edit', title: 'Edit Task', message: req.flash('error'), taskId: req.params.id});
};
function tasksDetail(req, res){
	res.render('task-management/task-detail', {layout: 'layout-al',pagescript:'/js/onground/task-management/task-detail.js',sidebar: '',menu: 'task-management-task-detail',title: 'Task Detail', taskId: req.params.id});
};

function wallet(req, res){
	res.render('wallet', {layout: 'layout-al',pagescript:'/js/onground/business/org/wallet.js',sidebar: '',menu: 'wallet',title: 'wallet-zinetgo'});
};

function sms(req, res){
	var showSmSbal = function(error, data){
		if(!error){
			res.render('sms-balance', {layout: 'layout-al',pagescript:'/js/onground/business/org/sms-balance.js',sidebar: '',menu: 'sms-balance',title: 'sms-balance',data:data.mbal,wallet:data.wallet});
		}else{
			req.flash('error', 'Something went Wrong. Please try again later.');
			res.redirect(router.dashboard);
		}
	};
	business.getSms(req.session, showSmSbal);
};


//helpDesk
function helpDesk(req, res){
	res.render('support/support-list', {layout: 'layout-al',pagescript:'/js/onground/support/support-list.js',sidebar: '',menu: 'support-support-list',title: 'Support'});
};
function helpDeskAdd(req, res){
	res.render('support/support-add', {layout: 'layout-al',pagescript:'/js/onground/support/support-add.js',sidebar: '',menu: 'support-support-add', title: 'Add Support'});
};
function helpDeskDetail(req, res){
	res.render('support/support-detail', {layout: 'layout-al',pagescript:'/js/onground/support/support-detail.js',sidebar: '',menu: 'support-support-detail', title: 'Support Detail', tokenId: req.params.id});
};
function helpDeskEdit(req, res){
	res.render('support/support-edit', {layout: 'layout-al',pagescript:'/js/onground/support/support-edit.js',sidebar: '',menu: 'support-support-edit', title: 'Support Edit', tokenId: req.params.id});
};
function assetList(req, res){
	res.render('asset/asset-list', {layout: 'layout-al',pagescript:'/js/onground/helpassets/help-asset-list.js',sidebar: '',menu: 'asset-list',title: 'Asset'});
};
function assetNew(req, res){
	res.render('asset/asset-add', {layout: 'layout-al',pagescript:'/js/onground/helpassets/help-asset-add.js',sidebar: '',menu: 'asset-add', title: 'Add Asset'});
};
function assetDetail(req, res){
	res.render('asset/asset-detail', {layout: 'layout-al',pagescript:'/js/onground/helpassets/help-asset-detail.js',sidebar: '',menu: 'asset-detail', title: 'Detail Asset', assetId: req.params.id});
};
function assetEdit(req, res){
	res.render('asset/asset-edit', {layout: 'layout-al',pagescript:'/js/onground/helpassets/help-asset-edit.js',sidebar: '',menu: 'asset-edit', title: 'Edit Asset', assetId: req.params.id});
};

function maintenanceList(req, res){
	res.render('maintenance/maintenance-list', {layout: 'layout-al',pagescript:'/js/onground/maintenance/maintenance-list.js',sidebar: '',menu: 'maintenance-list',title: 'Maintenance'});
};
function maintenanceAdd(req, res){
	res.render('maintenance/maintenance-add', {layout: 'layout-al',pagescript:'/js/onground/maintenance/maintenance-add.js',sidebar: '',menu: 'maintenance-add', title: 'Add Maintenance'});
};
function maintenanceDetail(req, res){
	res.render('maintenance/maintenance-detail', {layout: 'layout-al',pagescript:'/js/onground/maintenance/maintenance-detail.js',sidebar: '',menu: 'maintenance-detail', title: 'Detail Maintenance', maintenanceId: req.params.id});
};
function maintenanceEdit(req, res){
	res.render('maintenance/maintenance-edit', {layout: 'layout-al',pagescript:'/js/onground/maintenance/maintenance-add.js',sidebar: '',menu: 'maintenance-edit', title: 'Edit Maintenance', maintenanceId: req.params.id});
};


//----------------------- welfare associations -------------------------------------------------//
//events
function waEvents(req, res){
	res.render('wa/events-list', {layout: 'layout-al',pagescript:null,sidebar: '',menu: 'events-list',title: 'Events'});
};
function waEventsAdd(req, res){
	res.render('wa/events-add', {layout: 'layout-al',pagescript:null,sidebar: '',menu: 'events-add', title: 'Add Event'});
};
function eventsPhotoUpload(req, res){
	res.render('media/bulk-upload', {layout: 'layout-al',pagescript:null,sidebar: '',menu: 'events-upload-photos', title: 'Upload media items', eventId: req.params.id});
};
function eventsDetail(req, res){
	res.render('wa/events-detail', {layout: 'layout-al',pagescript:null,sidebar: '',menu: 'events-detail', title: 'Event Detail', eventId: req.params.id});
};

//Activities
function waActivities(req, res){
	res.render('wa/activities-list', {layout: 'layout-al',pagescript:null,sidebar: '',menu: 'activities-list',title: 'Activities'});
};
function waActivitiesAdd(req, res){
	res.render('wa/activities-add', {layout: 'layout-al',pagescript:null,sidebar: '',menu: 'activities-add', title: 'Add Activity'});
};
function activitiesDetail(req, res){
	res.render('wa/activities-detail', {layout: 'layout-al',pagescript:null,sidebar: '',menu: 'activities-detail', title: 'Activities Detail', activityId: req.params.id});
};

function activitiesEdit(req, res){
    res.render('wa/activities-edit', {layout: 'layout-al',pagescript:null,sidebar: '',menu: 'activities-edit', title: 'Edit activity details', activityId: req.params.id});
};
//Centers
function waCenters(req, res){
	res.render('wa/centers-list', {layout: 'layout-al',pagescript:null,sidebar: '',menu: 'centers-list',title: 'Centers'});
};
function waCentersAdd(req, res){
	res.render('wa/centers-add', {layout: 'layout-al',pagescript:null,sidebar: '',menu: 'centers-add', title: 'Add Center'});
};
function centersDetail(req, res){
	res.render('wa/centers-detail', {layout: 'layout-al',pagescript:null,sidebar: '',menu: 'centers-detail', title: 'Centers Detail', centerId: req.params.id});
};

//Members
function waMembers(req, res){
	res.render('wa/members-list', {layout: 'layout-al',pagescript:null,sidebar: '',menu: 'members-list',title: 'Members'});
};
function waMembersAdd(req, res){
	res.render('wa/members-add', {layout: 'layout-al',pagescript:null,sidebar: '',menu: 'members-add', title: 'Add Member'});
};
function membersDetail(req, res){
	res.render('wa/members-detail', {layout: 'layout-al',pagescript:null,sidebar: '',menu: 'members-detail', title: 'Members Detail', memberId: req.params.id});
};

//Magazines
function waMagazines(req, res){
	res.render('wa/magazines-list', {layout: 'layout-al',pagescript:null,sidebar: '',menu: 'magazines-list',title: 'Magazines'});
};
function waMagazinesAdd(req, res){
	res.render('wa/magazines-add', {layout: 'layout-al',pagescript:null,sidebar: '',menu: 'magazines-add', title: 'Add Magazine'});
};
function magazinesDetail(req, res){
	res.render('wa/magazines-detail', {layout: 'layout-al',pagescript:null,sidebar: '',menu: 'magazines-detail', title: 'Magazine Detail', magazineId: req.params.id});
};

//Schools
function waSchools(req, res){
	res.render('wa/schools-list', {layout: 'layout-al',pagescript:null,sidebar: '',menu: 'schools-list',title: 'Schools'});
};
function waSchoolsAdd(req, res){
	res.render('wa/schools-add', {layout: 'layout-al',pagescript:null,sidebar: '',menu: 'schools-add', title: 'Add School'});
};
function schoolsDetail(req, res){
	res.render('wa/schools-detail', {layout: 'layout-al',pagescript:null,sidebar: '',menu: 'schools-detail', title: 'School Detail', schoolId: req.params.id});
};

//Shoppe
function waShoppe(req, res){
	res.render('wa/shoppe-list', {layout: 'layout-al',pagescript:null,sidebar: '',menu: 'shoppe-list',title: 'Shoppe'});
};
function waShoppeAdd(req, res){
	res.render('wa/shoppe-add', {layout: 'layout-al',pagescript:null,sidebar: '',menu: 'shoppe-add', title: 'Add Shoppe'});
};
function shoppeDetail(req, res){
	res.render('wa/shoppe-detail', {layout: 'layout-al',pagescript:null,sidebar: '',menu: 'shoppe-detail', title: 'Shoppe Detail', shoppeId: req.params.id});
};

//PresidentsNote
function waPresidentsNote(req, res){
	res.render('wa/presidents_note-list', {layout: 'layout-al',pagescript:null,sidebar: '',menu: 'presidents_note-list',title: 'Presidents Note'});
};
function waPresidentsNoteAdd(req, res){
	res.render('wa/presidents_note-add', {layout: 'layout-al',pagescript:null,sidebar: '',menu: 'presidents_note-add', title: 'Add President Note'});
};
function presidentsNoteDetail(req, res){
	res.render('wa/presidents_note-detail', {layout: 'layout-al',pagescript:null,sidebar: '',menu: 'presidents_note-detail', title: 'Presidents Note Detail', presidentsNoteId: req.params.id});
};

//Committee
function waCommittee(req, res){
	res.render('wa/committee-list', {layout: 'layout-al',pagescript:null,sidebar: '',menu: 'committee-list',title: 'Committee'});
};
function waCommitteeAdd(req, res){
	res.render('wa/committee-add', {layout: 'layout-al',pagescript:null,sidebar: '',menu: 'committee-add', title: 'Add Committee'});
};
function committeeDetail(req, res){
	res.render('wa/committee-detail', {layout: 'layout-al',pagescript:null,sidebar: '',menu: 'committee-detail', title: 'Committee Detail', committeeId: req.params.id});
};


//------------------------------// Blogger //----------------------------//--------------------------//

//Blog
/*function blogPosts(req, res){
	res.render('blog/posts-list', {layout: 'layout-al',pagescript:'/js/onground/blog/posts-list.js',sidebar: '',menu: 'blog-posts-list',title: 'Posts'});
};*/


function blogPosts(req, res){
	var blogsData = function(error,data){
		if(!error){
			var from = '';
			var to ='';
			var option = '';
			if(req.query.fromDate){
				from = req.query.fromDate;
			}
			if(req.query.toDate){
				to = req.query.toDate;
			}
			if(req.query.q){
				option = req.query.q;
			}
			res.render('blog/posts-list', {layout: 'layout-al',pagescript:'/js/onground/blog/posts-list.js',sidebar: '',menu: 'blog-posts-list',title: 'Post', data: data.data, moment:moment,total: data.total,pno: data.pno,psize: data.psize,from:from,to:to,option:option});
		}else{
			req.flash('error', 'Something went Wrong. Please try again later.');
			res.redirect(router.dashboard);
		}
	}
	blogService.list(req,req.session, blogsData);
	//res.render('contacts/visitors/visitor-list', {layout: 'layout-al',pagescript:'/js/onground/contacts/visitors/visitor-list.js',sidebar: '',menu: 'contacts-visitors-list',title: 'Visitors'});
};


function blogPostsAdd(req, res){
	res.render('blog/posts-add', {layout: 'layout-al',pagescript:'/js/onground/blog/posts-add.js',sidebar: 'closed',menu: 'blog-posts-add', title: 'Add Post'});
};
function blogPostsDetail(req, res){
	//res.render('blog/posts-detail', {layout: 'layout-al',pagescript:null,sidebar: '',menu: 'posts-detail', title: 'Posts Detail', blogId: req.params.id});
	var blogDetail = function(error, data){
		console.log('user... '+JSON.stringify(data));
		if(!error){
			res.render('blog/posts-detail', {layout: 'layout-al',pagescript:'/js/onground/blog/posts-detail.js',sidebar: 'closed',menu: 'blog-posts-detail',title: 'Posts Detail', blogId: req.params.id, data: data.data});
		}else{
			req.flash('error', 'Something went Wrong. Please try again later.');
			res.redirect(router.dashboard);
		}
	};
	blogService.getBlog(req.params.id, req.session, blogDetail);
};
function blogPostsEdit(req, res){
	var blogEdit = function(error, data){
		console.log('data... '+data);
		if(!error){
			res.render('blog/posts-edit', {layout: 'layout-al',pagescript:'/js/onground/blog/posts-edit.js',sidebar: 'closed',menu: 'blog-posts-edit',title: 'Posts Edit', blogId: req.params.id, data: data.data});
		}else{
			req.flash('error', 'Something went Wrong. Please try again later.');
			res.redirect(router.dashboard);
		}
	};
	blogService.getBlog(req.params.id, req.session, blogEdit);
};
 
function blogCategories(req, res){
	res.render('blog/categories-list', {layout: 'layout-al',pagescript:'/js/onground/blog/categories-list.js',sidebar: '',menu: 'blog-categories-list',title: 'Blog Categories'});
};
function blogCategoriesAdd(req, res){
	res.render('blog/categories-add', {layout: 'layout-al',pagescript:'/js/onground/blog/categories-add.js',sidebar: '',menu: 'blog-categories-add', title: 'Add Blog Categories'});
};
function blogCategoriesDetail(req, res){
	res.render('blog/categories-detail', {layout: 'layout-al',pagescript:'/js/onground/blog/categories-detail.js',sidebar: '',menu: 'blog-categories-detail', title: 'Categories Detail', categoriesId: req.params.id});
};

//blogSubscribers
function blogSubscribers(req, res){
	res.render('blog/subscription-list', {layout: 'layout-al',pagescript:'/js/onground/blog/subscription-list.js',sidebar: '',menu: 'blog-subscribers-list', title: 'Subscribers List'});
};

//Users
//Authors
function usersAuthorsList(req, res){
	res.render('users/authors-list', {layout: 'layout-al',pagescript:'/js/onground/users/authors-list.js',sidebar: '',menu: 'authors-list',title: 'Authors-Zinetgo'});
};
function usersAuthorsAdd(req, res){
	res.render('users/authors-add', {layout: 'layout-al',pagescript:'/js/onground/users/authors-add.js',sidebar: '',menu: 'authors-add', title: 'Add Author'});
};
function usersAuthorsDetail(req, res){
	res.render('users/authors-detail', {layout: 'layout-al',pagescript:'/js/onground/users/authors-detail.js',sidebar: '',menu: 'authors-detail', title: 'Authors Detail', authorId: req.params.id});
};

function usersAuthorsEdit(req, res){
	res.render('users/user-edit', {layout: 'layout-al',pagescript:'/js/onground/users/authors-edit.js',sidebar: '',menu: 'authors-edit', title: 'Authors Detail', authorId: req.params.id});
};

//Editors
function usersEditorsList(req, res){
	res.render('users/editors-list', {layout: 'layout-al',pagescript:null,sidebar: '',menu: 'editors-list',title: 'Editors'});
};
function usersEditorsAdd(req, res){
	res.render('users/editors-add', {layout: 'layout-al',pagescript:null,sidebar: '',menu: 'editors-add', title: 'Add Editor'});
};
function usersEditorsDetail(req, res){
	res.render('users/editors-detail', {layout: 'layout-al',pagescript:null,sidebar: '',menu: 'editors-detail', title: 'Editors Detail', editorId: req.params.id});
};
