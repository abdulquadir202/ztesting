var routes =  {
	home: '/',

	//fatures: '/features',
	website: '/website',

	ps:{
		index: '/services',
		work:'/services/work',
		workDetail:'/services/work/:id',
		blog:'/services/blog',
		blogDetail:'/services/blog/:id',
		contact:'/services/contact',
		about: '/services/about',
		caseStudies: '/services/case-studies'
	}, 

	stories: '/stories',
	pricing: '/pricing',
	blog: '/blog', 
	blogDetail: '/blog/:name',
	about: '/about',
	vision: '/vision',
	career: '/career',
	jobDetail: '/job/:name',
	contact: '/contact',
	support: '/support',
	zinetgoCustomer: '/customers',

	sms: '/sms',
	wallet: '/wallet',

	login: '/login',
	logout: '/logout',
	signup: '/signup',
	forgotPassword: '/forgot-password',
	verification:'/verify-otp',
	
	signupApprovalPending: '/approval-pending',
	search: '/search',
	dashboard: '/dashboard',
	homeCarosal: '/slider/home',
	homeCarosalAdd: '/slider/home/new',
	business:{
		//business
		orgDetail: '/organisation/detail',
		preference: '/organisation/preference',
		templetes: '/organisation/templates',
		documents: '/organisation/documents/:uname',
		branches: '/branches',
		branchesAdd: '/branches/new',
		bankAccounts: '/bank-accounts',
		bankAccountsAdd: '/bank-accounts/new',
		departments: '/departments',
		integration: '/organisation/integration/:uname',
		departmentsAdd: '/departments/new'
	},
	career:{
		jobsOpenings:'/careers/jobs-list',
		jobsOpeningsAdd: '/careers/add-jobs/new',
		jobsOpeningsDetail:'/careers/job-detail/:id',
		jobsOpeningsEdit: '/careers/job-openings/:id/edit',

		applicants:'/careers/applicant-list',
		applicantsDetail:'/careers/applicant-details/:id'
	},

	contacts:{
		//contacts
		customers: '/admin/customers',
		customersAdd: '/admin/customers/new',
		customersDetail: '/admin/customers/:id',
		vendors: '/vendors',
		vendorsAdd: '/vendors/new',
		visitors: '/visitors',
		visitorscsv:'/visitors/csv',
		visitorsAdd: '/visitors/new',
		visitorsDetail: '/visitors/:id',
        visitorsEdit: '/visitors/:id/edit',
		employee: '/employee',
		employeeDetail: '/employee/:id',
		employeeAdd: '/employee/new',
		employeeEdit: '/employee/:id/edit'
	},
	vendors:{
		//contacts
		VendorsNew: '/admin/vendors',
		VendorsDetail: '/admin/vendors/:uName',
		VendorsLeads: '/admin/vendors/:uName/leads',
		VendorsServices: '/admin/vendors/:uName/services',
		VendorsWallet:'/admin/vendors/:uName/wallet',
		VendorsRoles:'/admin/vendors/:uName/roles',
		VendorsIntegration:'/admin/vendors/:uName/integration'

	},
	//items
	items: '/items',
	itemsAdd: '/items/new',
	itemsDetail: '/items/:id',
	itemsEdit: '/items/:id/edit',

	//accounting
	accounting:{
		entry: {
			bank: '/bank-entry',
			cash: '/cash-entry',
			sales: '/sales-entry',
			purchase: '/purchase-entry'
		},
		ledger:{
			bank:'/bank-ledger',
			cash:'/cash-ledger',
			sales: '/sales-ledger',
			purchase: '/purchase-ledger',
			customer: '/customer-ledger',
			vendor: '/vendor-ledger',
			item: '/item-ledger',

			cashLedgerDetail:'/cash-ledger/:id',
			salesLedgerDetail: '/sales-ledger/:id',

			salesReport: '/sales-report/:id'

		}
	},

	//payrool
	payroll: {
		employees: '/employees',
		employeesAdd: '/employees/new',
		employeesDetail: '/employees/:id',
		leaves: '/leaves',
		leavesAdd: '/leaves/add' 
	},
	//testimony
	testimony: {
		list: '/testimonies',
		add: '/testimony/new',
		edit: '/testimony/edit/:id'
	},
	//expenses
	expenses: {
		list: '/expenses',
		add: '/expenses/new'
	},

	//leads
	leads:{
		leads: '/leads',
		leadscsv:'/leads/csv',
		leadsAdd: '/leads/add',
		leadsDetail: '/leads/:id',
        leadsEdit: '/leads/:id/edit',
        leadsCalendar: '/leads-calendar',
        leadsSubscription: '/subscriptions',
        leadsSubscriptionAdd: '/subscriptions/add',
        leadsSubscriptionDetail: '/subscriptions/:id',
        leadsSubscriptionEdit: '/subscriptions/:id/edit',

		leadSources: '/lead-sources',
		leadSourcesAdd: '/lead-sources/new',
		quotationsGst: '/quotation-add/:id/:item',
		invoice:'/invoice/:id/:item',
		quotationsPreview: '/quotation-preview',
		quotations: '/quotations',
		quotationsAdd: '/quotations/:id/new',
		quotationsDetail:'/quotations/:id',
		quotationsEdit: '/quotations/:id/edit',
		inspections: '/inspections',
		inspectionsAdd: '/inspections/new',
		quotationsgenerate: '/quotation-pdf'
	},

	//jobs
		jobs:{
			jobs: '/jobs',
			jobsAdd: '/jobs/add',
			invoices: '/invoices',
			invoicesAdd: '/invoices/new',
			invoicesDetail: '/invoices/:id'
		},

	//products
		products: {
			list:'/products/catalog',
			add:'/products/catalog/new',
			detail: '/products/catalog/:id',
			edit: '/products/:id/edit',
			variation: '/products/:id/variation',
            upload: '/products/catalog/:id/images',
			categories: {
				list:'/categories',
				add:'/categories/new',
				detail: '/category/:id',
				edit: '/category/:id/edit',
			}
		},

	//orders
	orders:{
		orders: '/orders',
		ordersAdd: '/orders/new',
		ordersDetail: '/orders/:id',
		edit: '/orders/:id/edit'
	},

	//marketing
	marketing:{
		coupons:{
			list: '/coupons',
			add: '/coupons/new',
			couponsDetail: '/coupons/:id',
			edit: '/coupon/:id/edit'
		},
		campaigns:{
			bulkSms: '/sms',
			bulkSmsAdd: '/sms/new'
		}
	},

	//tasks
	tasks:{
		list: '/tasks',
		add: '/tasks/new',
		tasksDetail: '/tasks/:id',
		edit: '/tasks/:id/edit',
	},

	//support
	helpDesk:{
		list: '/support/tickets',
		add: '/support/new',
		detail: '/support/ticket/:id',
		edit: '/support/ticket/:id/edit',
		assetList:'/asset',
		assetDetail: '/asset/:id',
		assetNew:'/asset/new',
		assetEdit: '/asset/:id/edit',
		maintenanceAdd: '/maintenance/new',
		maintenanceList: '/maintenance',
		maintenanceDetail: '/maintenance/:id',
		maintenanceEdit: '/maintenance/:id/edit'
	},


	//wa
	wa:{
		events: {
			list:'/wa/events',
			add:'/wa/events/new',
			detail: '/wa/events/:id',
			upload: '/wa/events/:id/upload-photos'
		},
		activities: {
			list:'/wa/activities',
			add:'/wa/activities/new',
			detail: '/wa/activities/:id',
			edit: '/wa/activities/:id/edit'
		},
		centers: {
			list:'/wa/centers',
			add:'/wa/centers/new',
			detail: '/wa/centers/:id',
		},
		members: {
			list:'/wa/members',
			add:'/wa/members/new',
			detail: '/wa/members/:id',
		},
		magazines: {
			list:'/wa/magazines',
			add:'/wa/magazines/new',
			detail: '/wa/magazines/:id',
		},
		schools: {
			list:'/wa/schools',
			add:'/wa/schools/new',
			detail: '/wa/schools/:id',
		},
		shoppe: {
			list:'/wa/shoppe',
			add:'/wa/shoppe/new',
			detail: '/wa/shoppe/:id',
		},
		presidents_note: {
			list:'/wa/presidents_note',
			add:'/wa/presidents_note/new',
			detail: '/wa/presidents_note/:id',
		},
		committee: {
			list:'/wa/committee',
			add:'/wa/committee/new',
			detail: '/wa/committee/:id',
		}
	},

	//blogs
	blogs:{
		posts: {
			list:'/admin/blog/posts',
			add:'/admin/blog/posts/new',
			detail: '/admin/blog/posts/:id',
			edit: '/admin/blog/posts/:id/edit'

		},
		categories: {
			list:'/admin/blog/categories',
			add:'/admin/blog/categories/new',
			detail: '/admin/blog/categories/:id',
		},
		subscriber : {
			list:'/admin/blog/subscribers'
		}
	},

	//users
	users:{
		authors: {
			list:'/admin/users/',
			add:'/admin/users/new',
			detail: '/admin/users/:id',
			edit: '/admin/users/:id/edit',

		}
	}
};

module.exports = routes;
