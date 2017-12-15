require('newrelic');
var express = require('express'), 
	partials = require('express-partials'),
	app = express(),
	routes = require('./routes'),
	errorHandlers = require('./middleware/errorhandlers'),
	log = require('./middleware/log'),
	cookieParser = require('cookie-parser'),
	bodyParser = require('body-parser'),
	csrf = require('csurf'),
	session = require('express-session'),
	util = require('./middleware/utilities'),
	flash = require('connect-flash'),
	env = require('./env'),
	config = require('./config/' + env.name), 
	router = require('./uiroutes'); 

app.set('view engine', 'ejs');
app.set('view options', {defaultLayout: 'layout'});

app.use(partials());
app.use(log.logger);
app.use(express.static(__dirname + '/static'));
app.use(cookieParser(config.secret));
app.use(session({
	secret: config.secret,
	saveUninitialized: true,
	resave: true,
	cookie: { maxAge: 180 * 60 * 1000 }
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(csrf());
app.use(util.csrf);
app.use(util.authenticated);
app.use(flash());
app.use(util.templateRoutes);
app.use(util.templateApi);
app.use(util.defaults);
//routes

console.log(JSON.stringify(router.home));

// Professional services routes
app.get(router.ps.index, routes.ps_website_index);
app.get(router.ps.work, routes.ps_website_work);
app.get(router.ps.contact, routes.ps_website_contact);
app.get(router.ps.blog, routes.ps_website_blog);
app.get(router.ps.blogDetail, routes.ps_website_blog_detail);
app.get(router.ps.about, routes.ps_website_about);


app.get(router.home, routes.login);

app.get(router.website, routes.website);


app.get(router.stories, routes.stories);
app.get(router.pricing, routes.pricing);
app.get(router.blog, routes.blog);
app.get(router.blogDetail, routes.blogDetail);
app.get(router.about, routes.about);
app.get(router.vision, routes.vision);
app.get(router.career, routes.career);
app.get(router.jobDetail, routes.jobDetail);
app.get(router.contact, routes.contact);
app.get(router.support, routes.support);
app.get(router.zinetgoCustomer, routes.zinetgoCustomer);

app.get(router.sms, routes.sms);
app.get(router.wallet, routes.wallet);


app.get(router.login, routes.login);
app.post(router.login, routes.loginProcess);
app.get(router.logout, routes.logOut);
app.get(router.signup, routes.signup);
app.get(router.signupApprovalPending, routes.signupApprovalPending);
app.get(router.forgotPassword, routes.forgotPassword);
app.get(router.verification, routes.verification);
app.post(router.verification, routes.verify);
app.post(router.forgotPassword, routes.sendOtp);


//dashboard
app.get(router.dashboard, [util.requireAuthentication], routes.dashboard);
//app.get(router.dashboard.orders, [util.requireAuthentication], routes.dashboardOrders);
app.get(router.homeCarosal, [util.requireAuthentication], routes.homeCarosal);
app.get(router.homeCarosalAdd, [util.requireAuthentication], routes.homeCarosalAdd);

//search
app.get(router.search, [util.requireAuthentication], routes.search);
app.post(router.search, [util.requireAuthentication], routes.search);
//business
app.get(router.business.orgDetail, [util.requireAuthentication], routes.orgDetail);
app.get(router.business.preference, [util.requireAuthentication], routes.preferences);
app.get(router.business.integration, [util.requireAuthentication], routes.integration);
app.get(router.business.templetes, [util.requireAuthentication], routes.templetes);
app.get(router.business.documents, [util.requireAuthentication], routes.documents);

app.get(router.business.branches, [util.requireAuthentication], routes.branches);
app.get(router.business.branchesAdd, [util.requireAuthentication], routes.branchesAdd);
app.get(router.business.bankAccounts, [util.requireAuthentication], routes.bankAccounts);
app.get(router.business.bankAccountsAdd, [util.requireAuthentication], routes.bankAccountsAdd);
app.get(router.business.departments, [util.requireAuthentication], routes.departments);
app.get(router.business.departmentsAdd, [util.requireAuthentication], routes.departmentsAdd);

//job
app.get(router.career.jobsOpenings, [util.requireAuthentication], routes.jobsOpenings);
app.get(router.career.jobsOpeningsAdd, [util.requireAuthentication], routes.jobsOpeningsAdd);
app.get(router.career.jobsOpeningsDetail, [util.requireAuthentication], routes.jobsOpeningsDetail);
app.get(router.career.jobsOpeningsEdit, [util.requireAuthentication], routes.jobsOpeningsEdit);

app.get(router.career.applicants, [util.requireAuthentication], routes.applicants);
app.get(router.career.applicantsDetail, [util.requireAuthentication], routes.applicantsDetail);
//contacts
app.get(router.contacts.customers, [util.requireAuthentication], routes.customers);
app.get(router.contacts.customersAdd, [util.requireAuthentication], routes.customersAdd);
app.get(router.contacts.customersDetail, [util.requireAuthentication], routes.customersDetail);

app.get(router.contacts.vendors, [util.requireAuthentication], routes.vendors);
app.get(router.contacts.visitorscsv, [util.requireAuthentication], routes.visitorscsv);
app.get(router.contacts.vendorsAdd, [util.requireAuthentication], routes.vendorsAdd);
app.get(router.contacts.visitors, [util.requireAuthentication], routes.visitors);
app.get(router.contacts.visitorsAdd, [util.requireAuthentication], routes.visitorsAdd);
app.get(router.contacts.visitorsDetail, [util.requireAuthentication], routes.visitorsDetail);
app.get(router.contacts.visitorsEdit, [util.requireAuthentication], routes.visitorsEdit);

app.get(router.contacts.employee, [util.requireAuthentication], routes.employee);
app.get(router.contacts.employeeAdd, [util.requireAuthentication], routes.employeeAdd);
app.get(router.contacts.employeeDetail, [util.requireAuthentication], routes.employeeDetail);
app.get(router.contacts.employeeEdit, [util.requireAuthentication], routes.employeeEdit);


app.get(router.vendors.VendorsNew, [util.requireAuthentication], routes.VendorsNew);
app.get(router.vendors.VendorsDetail, [util.requireAuthentication], routes.VendorsDetail);
app.get(router.vendors.VendorsLeads, [util.requireAuthentication], routes.VendorsLead);
app.get(router.vendors.VendorsServices, [util.requireAuthentication], routes.VendorsService);
app.get(router.vendors.VendorsWallet, [util.requireAuthentication], routes.VendorsWallet);
app.get(router.vendors.VendorsRoles, [util.requireAuthentication], routes.VendorsRoles);
app.get(router.vendors.VendorsIntegration, [util.requireAuthentication], routes.VendorsIntegration);



// //items
app.get(router.items, [util.requireAuthentication], routes.items);
app.get(router.itemsAdd, [util.requireAuthentication], routes.itemsAdd);
app.get(router.itemsDetail, [util.requireAuthentication], routes.itemsDetail);
app.get(router.itemsEdit, [util.requireAuthentication], routes.itemsEdit);

// //accounting
// //entry
app.get(router.accounting.entry.bank, [util.requireAuthentication], routes.bankEntry);
app.get(router.accounting.entry.cash, [util.requireAuthentication], routes.cashEntry);
app.get(router.accounting.entry.sales, [util.requireAuthentication], routes.salesEntry);
app.get(router.accounting.entry.purchase, [util.requireAuthentication], routes.purchaseEntry);
// //ledger
app.get(router.accounting.ledger.bank, [util.requireAuthentication], routes.bankLedger);
app.get(router.accounting.ledger.cash, [util.requireAuthentication], routes.cashLedger);
app.get(router.accounting.ledger.sales, [util.requireAuthentication], routes.salesLedger);
app.get(router.accounting.ledger.purchase, [util.requireAuthentication], routes.purchaseLedger);
app.get(router.accounting.ledger.customer, [util.requireAuthentication], routes.customerLedger);
app.get(router.accounting.ledger.vendor, [util.requireAuthentication], routes.vendorLedger);
// details
app.get(router.accounting.ledger.cashLedgerDetail, [util.requireAuthentication], routes.cashLedgerDetail);
app.get(router.accounting.ledger.salesLedgerDetail, [util.requireAuthentication], routes.salesLedgerDetail);
app.get(router.accounting.ledger.salesReport, [util.requireAuthentication], routes.salesReport);


//payroll
app.get(router.payroll.employees, [util.requireAuthentication], routes.employees);
app.get(router.payroll.employeesAdd, [util.requireAuthentication], routes.employeesAdd);
app.get(router.payroll.employeesDetail, [util.requireAuthentication], routes.employeesDetail);
app.get(router.payroll.leaves, [util.requireAuthentication], routes.leaves);
app.get(router.payroll.leavesAdd, [util.requireAuthentication], routes.leavesAdd);

// //expense
app.get(router.expenses.add, [util.requireAuthentication], routes.expenseEntry);
app.get(router.expenses.list, [util.requireAuthentication], routes.expenseLedger);

// //leads
app.get(router.leads.leads, [util.requireAuthentication], routes.leads);

app.get(router.leads.leadscsv, [util.requireAuthentication], routes.leadscsv);

app.get(router.leads.leadsAdd, [util.requireAuthentication], routes.leadsAdd);
app.get(router.leads.leadsDetail, [util.requireAuthentication], routes.leadsDetail);
app.get(router.leads.leadsCalendar, [util.requireAuthentication], routes.leadsCalendar);
app.get(router.leads.leadsEdit, [util.requireAuthentication], routes.leadsEdit);

app.get(router.leads.leadsSubscription, [util.requireAuthentication], routes.leadsSubscription);
app.get(router.leads.leadsSubscriptionAdd, [util.requireAuthentication], routes.leadsSubscriptionAdd);
app.get(router.leads.leadsSubscriptionDetail, [util.requireAuthentication], routes.leadsSubscriptionDetail);
app.get(router.leads.leadsSubscriptionEdit, [util.requireAuthentication], routes.leadsSubscriptionEdit);

app.get(router.leads.leadSources, [util.requireAuthentication], routes.leadSources);
app.get(router.leads.leadSourcesAdd, [util.requireAuthentication], routes.leadSourcesAdd);
app.get(router.leads.quotationsPreview, [util.requireAuthentication], routes.quotationsPreview);
app.get(router.leads.quotationsGst, [util.requireAuthentication], routes.quotationsGst);
app.get(router.leads.invoice, [util.requireAuthentication], routes.invoice);
app.get(router.leads.quotationsgenerate, [util.requireAuthentication], routes.quotationsgenerate);
app.get(router.leads.quotations, [util.requireAuthentication], routes.quotations);
app.get(router.leads.quotationsAdd, [util.requireAuthentication], routes.quotationsAdd);
app.get(router.leads.quotationsDetail, [util.requireAuthentication], routes.quotationsDetail);
app.get(router.leads.inspections, [util.requireAuthentication], routes.inspections);
app.get(router.leads.inspectionsAdd, [util.requireAuthentication], routes.inspectionsAdd);

// //jobs
app.get(router.jobs.jobs, [util.requireAuthentication], routes.jobs);
app.get(router.jobs.jobsAdd, [util.requireAuthentication], routes.jobsAdd);
app.get(router.jobs.invoices, [util.requireAuthentication], routes.invoices);
app.get(router.jobs.invoicesAdd, [util.requireAuthentication], routes.invoicesAdd);
app.get(router.jobs.invoicesDetail, [util.requireAuthentication], routes.invoicesDetail);

// //products
app.get(router.products.list, [util.requireAuthentication], routes.products);
app.get(router.products.add, [util.requireAuthentication], routes.productsAdd);
app.get(router.products.detail, [util.requireAuthentication], routes.productsDetail);
app.get(router.products.edit, [util.requireAuthentication], routes.productsEdit);
app.get(router.products.upload, [util.requireAuthentication], routes.productsPhotoUpload);
app.get(router.products.variation, [util.requireAuthentication], routes.productsVariations);

app.get(router.products.categories.list, [util.requireAuthentication], routes.productCategories);
app.get(router.products.categories.add, [util.requireAuthentication], routes.productCategoriesAdd);
app.get(router.products.categories.detail, [util.requireAuthentication], routes.productCategoryDetail);
app.get(router.products.categories.edit, [util.requireAuthentication], routes.productCategoryEdit);


// //orders
app.get(router.orders.orders, [util.requireAuthentication], routes.orders);
app.get(router.orders.ordersAdd, [util.requireAuthentication], routes.ordersAdd);
app.get(router.orders.ordersDetail, [util.requireAuthentication], routes.ordersDetail);
app.get(router.orders.edit, [util.requireAuthentication], routes.ordersEdit);

// //marketing
app.get(router.marketing.campaigns.bulkSms, [util.requireAuthentication], routes.smsCampaigns);
app.get(router.marketing.campaigns.bulkSmsAdd, [util.requireAuthentication], routes.smsCampaignsAdd);

app.get(router.marketing.coupons.list, [util.requireAuthentication], routes.coupons);
app.get(router.marketing.coupons.add, [util.requireAuthentication], routes.couponsAdd);
app.get(router.marketing.coupons.couponsDetail, [util.requireAuthentication], routes.couponsDetail);
app.get(router.marketing.coupons.edit, [util.requireAuthentication], routes.couponsEdit);

//testimony
app.get(router.testimony.list, [util.requireAuthentication], routes.testimonies);
app.get(router.testimony.add, [util.requireAuthentication], routes.testimonyAdd);
app.get(router.testimony.edit, [util.requireAuthentication], routes.testimonyEdit);

//tasks
app.get(router.tasks.list, [util.requireAuthentication], routes.tasks);
app.get(router.tasks.add, [util.requireAuthentication], routes.tasksAdd);
app.get(router.tasks.edit, [util.requireAuthentication], routes.tasksEdit);
app.get(router.tasks.tasksDetail, [util.requireAuthentication], routes.tasksDetail);

//helpDesk
app.get(router.helpDesk.list, [util.requireAuthentication], routes.helpDesk);
app.get(router.helpDesk.add, [util.requireAuthentication], routes.helpDeskAdd);
app.get(router.helpDesk.detail, [util.requireAuthentication], routes.helpDeskDetail);
app.get(router.helpDesk.edit, [util.requireAuthentication], routes.helpDeskEdit);
app.get(router.helpDesk.assetNew, [util.requireAuthentication], routes.assetNew);
app.get(router.helpDesk.assetList, [util.requireAuthentication], routes.assetList);
app.get(router.helpDesk.assetDetail, [util.requireAuthentication], routes.assetDetail);
app.get(router.helpDesk.assetEdit, [util.requireAuthentication], routes.assetEdit);

app.get(router.helpDesk.maintenanceAdd, [util.requireAuthentication], routes.maintenanceAdd);
app.get(router.helpDesk.maintenanceList, [util.requireAuthentication], routes.maintenanceList);
app.get(router.helpDesk.maintenanceDetail, [util.requireAuthentication], routes.maintenanceDetail);
app.get(router.helpDesk.maintenanceEdit, [util.requireAuthentication], routes.maintenanceEdit);

// media
app.get(router.tasks.list, [util.requireAuthentication], routes.tasks);

//--------------------------------// Welfare association //---------------------------------------//
//events
app.get(router.wa.events.list, [util.requireAuthentication], routes.waEvents);
app.get(router.wa.events.add, [util.requireAuthentication], routes.waEventsAdd);
app.get(router.wa.events.detail, [util.requireAuthentication], routes.eventsDetail);
app.get(router.wa.events.upload, [util.requireAuthentication], routes.eventsPhotoUpload);

//activities
app.get(router.wa.activities.list, [util.requireAuthentication], routes.waActivities);
app.get(router.wa.activities.add, [util.requireAuthentication], routes.waActivitiesAdd);
app.get(router.wa.activities.detail, [util.requireAuthentication], routes.activitiesDetail);
app.get(router.wa.activities.edit, [util.requireAuthentication], routes.activitiesEdit);

//centers
app.get(router.wa.centers.list, [util.requireAuthentication], routes.waCenters);
app.get(router.wa.centers.add, [util.requireAuthentication], routes.waCentersAdd);
app.get(router.wa.centers.detail, [util.requireAuthentication], routes.centersDetail);

//members
app.get(router.wa.members.list, [util.requireAuthentication], routes.waMembers);
app.get(router.wa.members.add, [util.requireAuthentication], routes.waMembersAdd);
app.get(router.wa.members.detail, [util.requireAuthentication], routes.membersDetail);

//Magazines
app.get(router.wa.magazines.list, [util.requireAuthentication], routes.waMagazines);
app.get(router.wa.magazines.add, [util.requireAuthentication], routes.waMagazinesAdd);
app.get(router.wa.magazines.detail, [util.requireAuthentication], routes.magazinesDetail);

//schools
app.get(router.wa.schools.list, [util.requireAuthentication], routes.waSchools);
app.get(router.wa.schools.add, [util.requireAuthentication], routes.waSchoolsAdd);
app.get(router.wa.schools.detail, [util.requireAuthentication], routes.schoolsDetail);

//shoppe
app.get(router.wa.shoppe.list, [util.requireAuthentication], routes.waShoppe);
app.get(router.wa.shoppe.add, [util.requireAuthentication], routes.waShoppeAdd);
app.get(router.wa.shoppe.detail, [util.requireAuthentication], routes.shoppeDetail);

//presidents note
app.get(router.wa.presidents_note.list, [util.requireAuthentication], routes.waPresidentsNote);
app.get(router.wa.presidents_note.add, [util.requireAuthentication], routes.waPresidentsNoteAdd);
app.get(router.wa.presidents_note.detail, [util.requireAuthentication], routes.presidentsNoteDetail);

//Committee
app.get(router.wa.committee.list, [util.requireAuthentication], routes.waCommittee);
app.get(router.wa.committee.add, [util.requireAuthentication], routes.waCommitteeAdd);
app.get(router.wa.committee.detail, [util.requireAuthentication], routes.committeeDetail);

//---------------------------------// Blogger //-------------------------------------------------//
//Blog
//Posts 
app.get(router.blogs.posts.list, [util.requireAuthentication], routes.blogPosts);
app.get(router.blogs.posts.add, [util.requireAuthentication], routes.blogPostsAdd);
app.get(router.blogs.posts.detail, [util.requireAuthentication], routes.blogPostsDetail);
app.get(router.blogs.posts.edit, [util.requireAuthentication], routes.blogPostsEdit);

//categories
app.get(router.blogs.categories.list, [util.requireAuthentication], routes.blogCategories);
app.get(router.blogs.categories.add, [util.requireAuthentication], routes.blogCategoriesAdd);
app.get(router.blogs.categories.detail, [util.requireAuthentication], routes.blogCategoriesDetail);

//blogSubscribers
app.get(router.blogs.subscriber.list, [util.requireAuthentication], routes.blogSubscribers);


//Users
//authors
app.get(router.users.authors.list, [util.requireAuthentication], routes.usersAuthorsList);
app.get(router.users.authors.add, [util.requireAuthentication], routes.usersAuthorsAdd);
app.get(router.users.authors.detail, [util.requireAuthentication], routes.usersAuthorsDetail);
app.get(router.users.authors.edit, [util.requireAuthentication], routes.usersAuthorsEdit);


app.get('/error', function(req, res, next){
 	next(new Error('A contrived error'));
});
app.use(errorHandlers.error);
app.use(errorHandlers.notFound);

app.listen(config.port);
console.log("App server running on port 3000");
