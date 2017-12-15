var populateCustomers = function(apiUrl, allOption, selectedId){
	$.ajax({
        url: apiUrl,
        type: 'GET',
        success: function(data) {
            if (data.data) {
                $('#customerId').html('');
                if(allOption){
                    $('#customerId').append('<option value="-1">All Customers</option>');
                }
                for (i = 0; i < data.data.length; i++) {
                    var row = data.data[i];
                    $('#customerId').append('<option value="' + row.id + '"' + (row.id === selectedId? "selected": "" ) +'>' + row.name + ' - ' + row.mobile + '</option>');
                }
                $("#customerId").select2({
				  placeholder: "Select a customer",
				  allowClear: allOption? false: true
				});
            }
        },
        error: function(data) {
            toastr.options.closeButton = true;
            toastr.error("Something went wrong. Please try again with all the fields.");
        }
    });
}

var populatePortfolio = function(apiUrl, allOption, selectedId){
    $.ajax({
        url: apiUrl,
        type: 'GET',
        success: function(data) {
            if (data.data) {
                $('#portfolioId').html('');
                if(allOption){
                    $('#portfolioId').append('<option value="-1">All Vendors</option>');
                }
                for (i = 0; i < data.data.length; i++) {
                    var row = data.data[i];
                    $('#portfolioId').append('<option value="' + row.portfolio.id + '"' + (row.portfolio.id === selectedId? "selected": "" ) +'>' + row.portfolio.name + ' - ' + row.portfolio.mobile + '</option>');
                    $('#itemId').append('<option value="' + row.id + '"' + (row.id === selectedId? "selected": "" ) +'>' + row.name+ '</option>');
                }
                $("#portfolioId").select2({
                  placeholder: "Select a vendor",
                  allowClear: allOption? false: true
                });
                $("#itemId").select2({
                  placeholder: "Select a service",
                  allowClear: allOption? false: true
                });
            }
        },
        error: function(data) {
            toastr.options.closeButton = true;
            toastr.error("Something went wrong. Please try again with all the fields.");
        }
    });
}

var populateItemByMp = function(apiUrl, allOption, selectedId){
    $.ajax({
        url: apiUrl,
        type: 'GET',
        success: function(data) {
            if (data.data) {
                $('#itemId').html('');
                if(allOption){
                    $('#itemId').append('<option value="-1">Services</option>');
                }
                for (i = 0; i < data.data.length; i++) {
                    var row = data.data[i];
                    $('#itemId').append('<option value="' + row.id + '"' + (row.id === selectedId? "selected": "" ) +'>' + row.name+ '</option>');
                }
                $("#itemId").select2({
                  placeholder: "Select a service",
                  allowClear: allOption? false: true
                });
            }
        },
        error: function(data) {
            toastr.options.closeButton = true;
            toastr.error("Something went wrong. Please try again with all the fields.");
        }
    });
}

var populateProducts = function(url, allOption) {
    $.ajax({
        url: url,
        type: 'GET',
        success: function(data) {
            if(data.data) {
                $('#productId').html('');
                if(allOption) {
                    $('#productId').append('<option value="-1">All Products</option>');
                }
                for (i=0; i<data.data.length; i++) {
                    var row =  data.data[i];
                    $('#productId').append('<option value="' +row.id + '">' +row.name +  '</option>');
                }
                $("#productId").select2({
                    placeholder: "Select Product",
                    allowClear: allOption? false: true
                });
            }
        },
        error: function(data) {
            toaster.options.closeButton = true;
            toaster.error("Something went wrong. Please try again with all the fields.");
        }
    });
}

var populateAssets = function(apiUrl, allOption, selectedId){
    $.ajax({
        url: apiUrl,
        type: 'GET',
        success: function(data) {
            if (data.data) {
                $('#assetId').html('');
                if(allOption){
                    $('#assetId').append('<option value="-1">All Assets</option>');
                }
                for (i = 0; i < data.data.length; i++) {
                    var row = data.data[i];
                    $('#assetId').append('<option value="' + row.id + '"' + (row.id === selectedId? "selected": "" ) +'>' + row.assetId  + ' - ' + row.description + '</option>');
                }
                $("#assetId").select2({
                  placeholder: "Select a assetId",
                  allowClear: allOption? false: true
                });
            }
        },
        error: function(data) {
            toastr.options.closeButton = true;
            toastr.error("Something went wrong. Please try again with all the fields.");
        }
    });
}

var populateVendors = function(apiUrl, allOption,selectedId){
    $.ajax({
        url: apiUrl,
        type: 'GET',
        success: function(data) {
            if (data.data) {
                $('#vendorId').html('');
                if(allOption){
                    $('#vendorId').append('<option value="-1">All Vendors</option>');
                }
                for (i = 0; i < data.data.length; i++) {
                    var row = data.data[i];
                    $('#vendorId').append('<option value="' + row.id + '"' + (row.id === selectedId? "selected": "" ) +'>' + row.name + ' - ' + row.mobile + '</option>');
                }
            }
        },
        error: function(data) {
            //alert(data);
            toastr.options.closeButton = true;
            toastr.error("Something went wrong. Please try again with all the fields.");
        }
    });
}


var populateEmployees = function(apiUrl, allOption, selectedId){
    $.ajax({
        url: apiUrl,
        type: 'GET',
        success: function(data) {
            if (data.data) {
                $('#employeeId').html('');
                if(allOption){
                    $('#employeeId').append('<option value="-1">All Employees</option>');
                }
                for (i = 0; i < data.data.length; i++) {
                    var row = data.data[i];
                    $('#employeeId').append('<option value="' + row.id + '"' + (row.id === selectedId? "selected": "" ) +'>' + row.name + ' - ' + row.mobile + '</option>');
                }
                $("#employeeId").select2({
                  placeholder: "Select an employee",
                  allowClear: allOption? false: true,
                  width: "100%"
                });
            }
        },
        error: function(data) {
            toastr.options.closeButton = true;
            toastr.error("Something went wrong. Please try again with all the fields.");
        }
    });
}

var populateEmployee = function(apiUrl, allOption, selectedId){
    $.ajax({
        url: apiUrl,
        type: 'GET',
        success: function(data) {
            if (data.data) {
                $('.employee').html('');
                if(allOption){
                    $('.employee').append('<option value="-1">All Employees</option>');
                }
                for (i = 0; i < data.data.length; i++) {
                    var row = data.data[i];
                    $('.employee').append('<option value="' + row.id + '"' + (row.id === selectedId? "selected": "" ) +'>' + row.name + ' - ' + row.mobile + '</option>');
                }
                $(".employee").select2({
                  placeholder: "Select an employee",
                  allowClear: allOption? false: true,
                  width: "100%"
                });
            }
        },
        error: function(data) {
            toastr.options.closeButton = true;
            toastr.error("Something went wrong. Please try again with all the fields.");
        }
    });
}


var populateCategories = function(apiUrl, allOption,selectedId){
    $.ajax({
        url: apiUrl,
        type: 'GET',
        success: function(data) {
            if (data.data) {
                $('#categoryId').html('');
                if(allOption){
                    $('#categoryId').append('<option value="-1">All Categories</option>');
                }
                for (i = 0; i < data.data.length; i++) {
                    var row = data.data[i];
                    $('#categoryId').append('<option value="' + row.id + '"' + (row.id === selectedId? "selected": "" ) +'>' + row.name  + '</option>');
                }
                $("#categoryId").select2({
                  placeholder: "Select an category",
                  allowClear: allOption? false: true
                });
            }
        },
        error: function(data) {
            toastr.options.closeButton = true;
            toastr.error("Something went wrong. Please try again with all the fields.");
        }
    });
}

var populateActivityType = function(apiUrl, allOption,selectedId){
    $.ajax({
        url: apiUrl,
        type: 'GET',
        success: function(data) {
            if (data.data) {
                $('#activityTypeId').html('');
                if(allOption){
                    $('#activityTypeId').append('<option value="-1">All Categories</option>');
                }
                for (i = 0; i < data.data.length; i++) {
                    var row = data.data[i];
                    $('#activityTypeId').append('<option value="' + row.id + '"' + (row.id === selectedId? "selected": "" ) +'>' + row.activityType + '</option>');
                }
                $("#activityTypeId").select2({
                  placeholder: "Select an type",
                  allowClear: allOption? false: true
                });
            }
        },
        error: function(data) {
            toastr.options.closeButton = true;
            toastr.error("Something went wrong. Please try again with all the fields.");
        }
    });
}


var populateLeadSources = function(apiUrl, allOption){
    $.ajax({
        url: apiUrl,
        type: 'GET',
        success: function(data) {
            if (data.data) {
                $('#aggregatorId').html('');
                if(allOption){
                    $('#aggregatorId').append('<option value="-1">All Lead Sources</option>');
                }
                for (i = 0; i < data.data.length; i++) {
                    var row = data.data[i];
                    $('#aggregatorId').append('<option value="' + row.id + '">' + row.name + ' - ' + row.website + '</option>');
                }
                $("#aggregatorId").select2({
                  placeholder: "Select a Lead Source",
                  allowClear: allOption? false: true
                });
            }
        },
        error: function(data) {
            toastr.options.closeButton = true;
            toastr.error("Something went wrong. Please try again with all the fields.");
        }
    });
}

var populateLeads = function(apiUrl, allOption){
    $.ajax({
        url: apiUrl,
        type: 'GET',
        success: function(data) {
            if (data.data) {
                $('#leadId').html('');
                if(allOption){
                    $('#leadId').append('<option value="-1">All Leads</option>');
                }
                for (i = 0; i < data.data.length; i++) {
                    var row = data.data[i];
                    $('#leadId').append('<option value="' + row.id + '">' + row.leadId + '</option>');
                }
            }
        },
        error: function(data) {
            //alert(data);
            toastr.options.closeButton = true;
            toastr.error("Something went wrong. Please try again with all the fields.");
        }
    });
}


var populateCenters = function(apiUrl, allOption){
    $.ajax({
        url: apiUrl,
        type: 'GET',
        success: function(data) {
            if (data.data) {
                $('#centerId').html('');
                if(allOption){
                    $('#centerId').append('<option value="-1">All Centers</option>');
                }
                for (i = 0; i < data.data.length; i++) {
                    var row = data.data[i];
                    $('#centerId').append('<option value="' + row.id + '">' + row.name + '</option>');
                }
                $("#centerId").select2({
                  placeholder: "Select a center",
                  allowClear: allOption? false: true
                });
            }
        },
        error: function(data) {
            toastr.options.closeButton = true;
            toastr.error("Something went wrong. Please try again with all the fields.");
        }
    });
}

var populateModes = function(url,allOption){
	$('#modeType').change(function() {
        if ($(this).val() === 'bank') {
            $('#bankOption').removeClass('hide');
            //$('#cashOption').addClass('hide');
            populateBankList(url,allOption);

        } else {
            $('#bankOption').addClass('hide');
           // $('#cashOption').addClass('hide');
        }
    });
}

var populateTransactionTypes = function(allOption){
    $('#type').change(function() {
        if ($(this).val() === 'receipt') {
            $('#customerOption').removeClass('hide');
            $('#vendorOption').addClass('hide');

            $("#customerId").select2({
              placeholder: "Select a customer",
              allowClear: allOption? false: true
            });

        } else if ($(this).val() === 'payment') {
            $('#customerOption').addClass('hide');
            $('#vendorOption').removeClass('hide');

            $("#vendorId").select2({
              placeholder: "Select a vendor",
              allowClear: allOption? false: true
            });
            
        } else {
            $('#customerOption').addClass('hide');
            $('#vendorOption').addClass('hide');
        }
    });
}

var populateItems = function(apiUrl, allOption, selectedId){
    $.ajax({
        url: apiUrl,
        type: 'GET',
        success: function(data) {
            if (data.data) {
                $('#itemId').html('');
                if(allOption){
                    $('#itemId').append('<option value="-1">All Items</option>');
                }
                for (i = 0; i < data.data.length; i++) {
                    var row = data.data[i];
                    $('#itemId').append('<option value="' + row.id + '"'+ (row.id === selectedId? "selected": "") +'>' + row.name + (row.price != undefined ? ' - ' + row.price : '') + '</option>');
                }
                $("#itemId").select2({
                  placeholder: "Select an item",
                  allowClear: allOption? false: true
                });
            }
        },
        error: function(data) {
            toastr.options.closeButton = true;
            toastr.error("Something went wrong. Please try again with all the fields.");
        }
    });
}


function formatState (state) {
  if (!state.id) { return state.text; }
  var $state = $(
    '<span><img src="vendor/images/flags/' + state.element.value.toLowerCase() + '.png" class="img-flag" /> ' + state.text + '</span>'
  );
  return $state;
};


var populateBankList = function (url, allOption){
    $.ajax({
        url: url,
        type: 'GET',
        success: function(data) {
            if (data.data) {
                $('#bankAccount').html('');
                if(allOption){
                    $('#bankAccount').append('<option value="-1">All Banks</option>');
                }
                for (i = 0; i < data.data.length; i++) {
                    var row = data.data[i];
                    $('#bankAccount').append('<option value="' + row.id + '">' + row.bankName + ' - ' + row.accountNo + '</option>');
                }
                $("#bankAccount").select2({
				  placeholder: "Select a bank account",
				  allowClear: allOption? false: true
				});
            }
        },
        error: function(data) {
            toastr.options.closeButton = true;
            toastr.error("Something went wrong. Please try again with all the fields.");
        }
    });
}

var populateExpenseCategories = function (url, allOption){
    $.ajax({
        url: url,
        type: 'GET',
        success: function(data) {
            if (data.data) {
                $('#expenseCategoryId').html('');
                if(allOption){
                    $('#expenseCategoryId').append('<option value="-1">All Expense Categories</option>');
                }
                for (i = 0; i < data.data.length; i++) {
                    var row = data.data[i];
                    $('#expenseCategoryId').append('<option value="' + row.id + '">' + row.cName + '</option>');
                }
                $("#expenseCategoryId").select2({
                  placeholder: "Select a category",
                  allowClear: allOption? false: true
                });
            }
        },
        error: function(data) {
            toastr.options.closeButton = true;
            toastr.error("Something went wrong. Please try again with all the fields.");
        }
    });
}

var populateEventTypes = function (url, allOption){
    $.ajax({
        url: url,
        type: 'GET',
        success: function(data) {
            if (data.data) {
                $('#eventTypeId').html('');
                if(allOption){
                    $('#eventTypeId').append('<option value="-1">All Event Types</option>');
                }
                for (i = 0; i < data.data.length; i++) {
                    var row = data.data[i];
                    $('#eventTypeId').append('<option value="' + row.id + '">' + row.name + '</option>');
                }
                $("#eventTypeId").select2({
                  placeholder: "Select an event type",
                  allowClear: allOption? false: true
                });
            }
        },
        error: function(data) {
            toastr.options.closeButton = true;
            toastr.error("Something went wrong. Please try again with all the fields.");
        }
    });
}

var populateMembers = function (url, allOption){
    $.ajax({
        url: url,
        type: 'GET',
        success: function(data) {
            if (data.data) {
                $('#memberId').html('');
                if(allOption){
                    $('#memberId').append('<option value="-1">All Members</option>');
                }
                for (i = 0; i < data.data.length; i++) {
                    var row = data.data[i];
                    $('#memberId').append('<option value="' + row.id + '">' + row.name + '</option>');
                }
                $("#memberId").select2({
                  placeholder: "Select a member",
                  allowClear: allOption? false: true
                });
            }
        },
        error: function(data) {
            toastr.options.closeButton = true;
            toastr.error("Something went wrong. Please try again with all the fields.");
        }
    });
}

var populateActivityTypes = function (url, allOption){
    $.ajax({
        url: url,
        type: 'GET',
        success: function(data) {
            if (data.data) {
                $('#activityTypeId').html('');
                if(allOption){
                    $('#activityTypeId').append('<option value="-1">All Activity Types</option>');
                }
                for (i = 0; i < data.data.length; i++) {
                    var row = data.data[i];
                    $('#activityTypeId').append('<option value="' + row.id + '">' + row.activityType + '</option>');
                }
                $("#activityTypeId").select2({
                  placeholder: "Select an activity type",
                  allowClear: allOption? false: true
                });
            }
        },
        error: function(data) {
            toastr.options.closeButton = true;
            toastr.error("Something went wrong. Please try again with all the fields.");
        }
    });
}

var populateProductCategory = function (url, allOption){
    $.ajax({
        url: url,
        type: 'GET',
        success: function(data) {
            if (data.data) {
                $('#categoryId').html('');
                if(allOption){
                    $('#categoryId').append('<option value="-1">All Categories</option>');
                }
                for (i = 0; i < data.data.length; i++) {
                    var row = data.data[i];
                    $('#categoryId').append('<option value="' + row.id + '">' + row.name + '</option>');
                }
                $("#categoryId").select2({
                  placeholder: "Select a category",
                  allowClear: allOption? false: true
                });
            }
        },
        error: function(data) {
            toastr.options.closeButton = true;
            toastr.error("Something went wrong. Please try again with all the fields.");
        }
    });
}

var populateCenterTypes = function (url, allOption){
    $.ajax({
        url: url,
        type: 'GET',
        success: function(data) {
            if (data.data) {
                $('#centerTypeId').html('');
                if(allOption){
                    $('#centerTypeId').append('<option value="-1">All Center Types</option>');
                }
                for (i = 0; i < data.data.length; i++) {
                    var row = data.data[i];
                    $('#centerTypeId').append('<option value="' + row.id + '">' + row.name + '</option>');
                }
                $("#centerTypeId").select2({
                  placeholder: "Select an Center type",
                  allowClear: allOption? false: true
                });
            }
        },
        error: function(data) {
            toastr.options.closeButton = true;
            toastr.error("Something went wrong. Please try again with all the fields.");
        }
    });
}

var populateEmpDesignation = function (url, allOption){
    $.ajax({
        url: url,
        type: 'GET',
        success: function(data) {
            if (data.data) {
                $('#designationId').html('');
                if(allOption){
                    $('#designationId').append('<option value="-1">All Designations</option>');
                }
                for (i = 0; i < data.data.length; i++) {
                    var row = data.data[i];
                    $('#designationId').append('<option value="' + row.id + '">' + row.name + '</option>');
                }
                $("#designationId").select2({
                  placeholder: "Select a designation",
                  allowClear: allOption? false: true
                });
            }
        },
        error: function(data) {
            toastr.options.closeButton = true;
            toastr.error("Something went wrong. Please try again with all the fields.");
        }
    });
}

var populateEmpDepartment = function (url, allOption){
    $.ajax({
        url: url,
        type: 'GET',
        success: function(data) {
            if (data.data) {
                $('#departmentId').html('');
                if(allOption){
                    $('#departmentId').append('<option value="-1">All Departments</option>');
                }
                for (i = 0; i < data.data.length; i++) {
                    var row = data.data[i];
                    $('#departmentId').append('<option value="' + row.id + '">' + row.name + '</option>');
                }
                $("#departmentId").select2({
                  placeholder: "Select a department",
                  allowClear: allOption? false: true
                });
            }
        },
        error: function(data) {
            toastr.options.closeButton = true;
            toastr.error("Something went wrong. Please try again with all the fields.");
        }
    });
}

var populateTaskCategory = function(apiUrl, allOption){
    $.ajax({
        url: apiUrl,
        type: 'GET',
        success: function(data) {
            if (data.data) {
                $('#taskCategoryId').html('');
                if(allOption){
                    $('#taskCategoryId').append('<option value="-1">All Categories</option>');
                }
                for (i = 0; i < data.data.length; i++) {
                    var row = data.data[i];
                    $('#taskCategoryId').append('<option value="' + row.id + '">' + row.name +  '</option>');
                }
                $("#taskCategoryId").select2({
                  placeholder: "Select a Category",
                  allowClear: allOption? false: true
                });
            }
        },
        error: function(data) {
            toastr.options.closeButton = true;
            toastr.error("Something went wrong. Please try again with all the fields.");
        }
    });
}

var populateLeaveType = function(url, allOption){
    $.ajax({
        url: url,
        type: 'GET',
        success: function(data) {
            if (data.data) {
                $('#leaveTypeId').html('');
                if(allOption){
                    $('#leaveTypeId').append('<option value="-1">All Types</option>');
                }
                for (i = 0; i < data.data.length; i++) {
                    var row = data.data[i];
                    $('#leaveTypeId').append('<option value="' + row.id + '">' + row.name +  '</option>');
                }
                $("#leaveTypeId").select2({
                  placeholder: "Select a Category",
                  allowClear: allOption? false: true
                });
            }
        },
        error: function(data) {
            toastr.options.closeButton = true;
            toastr.error("Something went wrong. Please try again with all the fields.");
        }
    });
}


var populateSalaryComponent = function (url, allOption){
    $.ajax({
        url: url,
        type: 'GET',
        success: function(data) {
            if (data.data) {
                $('#salaryComponentId').html('');
                if(allOption){
                    $('#salaryComponentId').append('<option value="-1">All salary Components</option>');
                }
                for (i = 0; i < data.data.length; i++) {
                    var row = data.data[i];
                    $('#salaryComponentId').append('<option value="' + row.id + '">' + row.name + '</option>');
                }
                $("#salaryComponentId").select2({
                  placeholder: "Select a Salary Component",
                  allowClear: allOption? false: true
                });
            }
        },
        error: function(data) {
            toastr.options.closeButton = true;
            toastr.error("Something went wrong. Please try again with all the fields.");
        }
    });
}


var populateBlogCategories = function(apiUrl, allOption, selectedId){
    $.ajax({
        url: apiUrl,
        type: 'GET',
        success: function(data) {
            if (data.data) {
                $('#blogCategoriesId').html('');
                if(allOption){
                    $('#blogCategoriesId').append('<option value="-1">All Categories</option>');
                }
                for (i = 0; i < data.data.length; i++) {
                    var row = data.data[i];
                    $('#blogCategoriesId').append('<option value="' + row.id + '"' + (row.id === selectedId? "selected": "" ) +'>' + (row.displayName || row.name) + '</option>');
                }
                $("#blogCategoriesId").select2({
                  placeholder: "Select a category",
                  allowClear: allOption? false: true
                });
            }
        },
        error: function(data) {
            toastr.options.closeButton = true;
            toastr.error("Something went wrong. Please try again with all the fields.");
        }
    });
}


var populateItemCategory = function (url, allOption, noneOption){
    $.ajax({
        url: url,
        type: 'GET',
        success: function(data) {
            if (data.data) {
                $('#itemCategoryId').html('');
                if(allOption){
                    $('#itemCategoryId').append('<option value="-1">All Categories</option>');
                }
                if(noneOption){
                    $('#itemCategoryId').append('<option value=""></option>');
                }
                for (var i = 0; i < data.data.length; i++) {
                    var row = data.data[i];
                    $('#itemCategoryId').append('<option value="' + row.id + '">' + row.name + '</option>');
                }
                $("#itemCategoryId").select2({
                  placeholder: "Select a Category",
                  allowClear: allOption? false: true
                });
            }
        },
        error: function(data) {
            toastr.options.closeButton = true;
            toastr.error("Something went wrong. Please try again with all the fields.");
        }
    });
}

var populateTrunetoItem = function(apiUrl, allOption, selectedId){
    $.ajax({
        url: apiUrl,
        type: 'GET',
        success: function(data) {
            if (data.data) {
                $('#mpServiceId').html('');
                if(allOption){
                    $('#mpServiceId').append('<option value="-1">All Services</option>');
                }
                for (i = 0; i < data.data.length; i++) {
                    var row = data.data[i];
                    $('#mpServiceId').append('<option value="' + row.id + '"' + (row.id === selectedId? "selected": "" ) +'>' + row.name + '</option>');
                }
                $("#mpServiceId").select2({
                  placeholder: "Select a service",
                  allowClear: allOption? false: true
                });
            }
        },
        error: function(data) {
            toastr.options.closeButton = true;
            toastr.error("Something went wrong. Please try again with all the fields.");
        }
    });
}

var addBank = function(url, refreshUrl){
	$("#addBankInfo").on('click', function(event) {
        //var url = '<%= api.serverUrl %>/api/mode?psize=2000&token=<%= user.token %>';
        var data = {
            bankName: $('#mBankName').val(),
            accountNo: $('#mBankAccountNo').val()
        };

        $.ajax({
            url: url,
            type: 'POST',
            dataType: "json",
            data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
            success: function(data) {
                toastr.options.closeButton = true;
                toastr.success("New bank added successfully.");

                populateBankList(refreshUrl,false);
                //window.location.replace("/sales-entry");
            },
            error: function(data) {
                //alert(data);
                toastr.options.closeButton = true;
                toastr.error("Something went wrong. Please try again with all the fields.");
            }
        });
        event.preventDefault();
    });
}

var addCustomer = function(url, refreshUrl){
	$("#addCustomer").on('click', function(event) {
        //var url = '<%= api.serverUrl %>/api/customer?psize=2000&token=<%= user.token %>';
        var data = {
            name: $('#mCustomerName').val(),
            mobile: $('#mCustomerMobile').val() !== ''? $('#mCustomerMobile').val() : null,
            email: $('#mCustomerEmail').val() !== ''? $('#mCustomerEmail').val() : null,
            address: $('#mCustomerAddress').val() !== ''? $('#mCustomerAddress').val() : null
        };

        $.ajax({
            url: url,
            type: 'POST',
            dataType: "json",
            data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
            success: function(data) {
                toastr.options.closeButton = true;
                toastr.success("New Customer added successfully.");

                populateCustomers(refreshUrl,false,data.result.id);
                //window.location.replace("/sales-entry");
            },
            error: function(data) {
                toastr.options.closeButton = true;
                toastr.error(data.responseJSON.error);
            }
        });
        event.preventDefault();
    });
}


var addVariation = function(url, refreshUrl){
    $("#addVariation").on('click', function(event) {
        //var url = '<%= api.serverUrl %>/api/customer?psize=2000&token=<%= user.token %>';
        var data = {
            displayName: $('#vName').val(),
            price: $('#vPrice').val(),
            quantity: $('#vQuantity').val()
        };

        $.ajax({
            url: url,
            type: 'POST',
            dataType: "json",
            data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
            success: function(data) {
                toastr.options.closeButton = true;
                toastr.success("New Customer added successfully.");
                location.reload();
                //populateCustomers(refreshUrl,false);
                //window.location.replace("/sales-entry");
            },
            error: function(data) {
                //alert(data);
                toastr.options.closeButton = true;
                toastr.error("Something went wrong. Please try again with all the fields.");
            }
        });
        event.preventDefault();
    });
}

var addVendor = function(url, refreshUrl){  
    $("#addVendor").on('click', function(event) {
        //var url = '<%= api.serverUrl %>/api/vendor?psize=2000&token=<%= user.token %>';
        var data = {
            mobile: $('#mVendorMobile').val(),
            name: $('#mVendorName').val(),
            email: $('#mVendorEmail').val(),
            address: $('#mVendorAddress').val(),
            description:$('#mVendorDescription').val()
        };

        $.ajax({
            url: url,
            type: 'POST',
            dataType: "json",
            data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
            success: function(data) {
                toastr.options.closeButton = true;
                toastr.success("New Vendor added successfully.");
                //window.location.replace("/vendors");
                populateVendors(refreshUrl,false);
            },
            error: function(data) {
                //alert(data);
                toastr.options.closeButton = true;
                toastr.error("Something went wrong. Please try again with all the fields.");
            }
        });
        event.preventDefault();
    });
}


var addEmployee = function(url, refreshUrl){  
    $("#addEmployee").on('click', function(event) {
        //var url = '<%= api.serverUrl %>/api/vendor?psize=2000&token=<%= user.token %>';
        var data = {
            name: $('#mEmployeeName').val(),
            mobile: $('#mEmployeeMobile').val(),
            email: $('#mEmployeeEmail').val(),
            type: $('#mEmployeeType').val()
        };

        $.ajax({
            url: url,
            type: 'POST',
            dataType: "json",
            data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
            success: function(data) {
                toastr.options.closeButton = true;
                toastr.success("New Employee added successfully.");
                //window.location.replace("/sales-entry");
                populateEmployees(refreshUrl,false);
            },
            error: function(data) {
                //alert(data);
                toastr.options.closeButton = true;
                toastr.error("Something went wrong. Please try again with all the fields.");
            }
        });
        event.preventDefault();
    });
}

var addVendor = function(url, refreshUrl){  
    $("#addVendor").on('click', function(event) {
        //var url = '<%= api.serverUrl %>/api/vendor?psize=2000&token=<%= user.token %>';
        var data = {
            name: $('#mVendorName').val(),
            mobile: $('#mVendorMobile').val(),
            email: $('#mVendorEmail').val(),
            address: $('#mVendorAddress').val(),
            description: $('#mVendorDescription').val()
        };

        $.ajax({
            url: url,
            type: 'POST',
            dataType: "json",
            data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
            success: function(data) {
                toastr.options.closeButton = true;
                toastr.success("New Vendor added successfully.");
                //window.location.replace("/sales-entry");
                populateVendors(refreshUrl,false);
            },
            error: function(data) {
                //alert(data);
                toastr.options.closeButton = true;
                toastr.error("Something went wrong. Please try again with all the fields.");
            }
        });
        event.preventDefault();
    });
}

var addCategory = function(url, refreshUrl){  
    $("#addCategory").on('click', function(event) {
        //var url = '<%= api.serverUrl %>/api/vendor?psize=2000&token=<%= user.token %>';
        var data = {
            name: $('#cName').val()
        };

        $.ajax({
            url: url,
            type: 'POST',
            dataType: "json",
            data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
            success: function(data) {
                toastr.options.closeButton = true;
                toastr.success("New Category added successfully.");
                //window.location.replace("/sales-entry");
                populateCategories(refreshUrl,false);
            },
            error: function(data) {
                //alert(data);
                toastr.options.closeButton = true;
                toastr.error("Something went wrong. Please try again with all the fields.");
            }
        });
        event.preventDefault();
    });
}

var addActivityType = function(url, refreshUrl){  
    $("#addActivityType").on('click', function(event) {
        //var url = '<%= api.serverUrl %>/api/vendor?psize=2000&token=<%= user.token %>';
        var data = {
            name: $('#activityType').val()
        };

        $.ajax({
            url: url,
            type: 'POST',
            dataType: "json",
            data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
            success: function(data) {
                toastr.options.closeButton = true;
                toastr.success("New activity type added successfully.");
                //window.location.replace("/sales-entry");
                populateCategories(refreshUrl,false);
            },
            error: function(data) {
                //alert(data);
                toastr.options.closeButton = true;
                toastr.error("Something went wrong. Please try again with all the fields.");
            }
        });
        event.preventDefault();
    });
}

var addExpenseCategories = function(url, refreshUrl){  
    $("#addExpenseCategories").on('click', function(event) {
        //var url = '<%= api.serverUrl %>/api/vendor?psize=2000&token=<%= user.token %>';
        var data = {
            cName: $('#mExpenseCategoryName').val()
        };

        $.ajax({
            url: url,
            type: 'POST',
            dataType: "json",
            data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
            success: function(data) {
                toastr.options.closeButton = true;
                toastr.success("Expense Categories added successfully.");
                //window.location.replace("/sales-entry");
                populateExpenseCategories(refreshUrl,false);
            },
            error: function(data) {
                //alert(data);
                toastr.options.closeButton = true;
                toastr.error("Something went wrong. Please try again with all the fields.");
            }
        });
        event.preventDefault();
    });
}

var addEventTypes = function(url, refreshUrl){  
    $("#addEventType").on('click', function(event) {
        //var url = '<%= api.serverUrl %>/api/vendor?psize=2000&token=<%= user.token %>';
        var data = {
            name: $('#mEventTypeName').val()
        };

        $.ajax({
            url: url,
            type: 'POST',
            dataType: "json",
            data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
            success: function(data) {
                toastr.options.closeButton = true;
                toastr.success("Event Type added successfully.");
                //window.location.replace("/sales-entry");
                populateEventTypes(refreshUrl,false);
            },
            error: function(data) {
                //alert(data);
                toastr.options.closeButton = true;
                toastr.error("Something went wrong. Please try again with all the fields.");
            }
        });
        event.preventDefault();
    });
}


var addActivityTypes = function(url, refreshUrl){  
    $("#addActivityType").on('click', function(event) {
        //var url = '<%= api.serverUrl %>/api/vendor?psize=2000&token=<%= user.token %>';
        var data = {
            activityType: $('#activityType').val(),
            description: $('#activityTypeDescription').val(),
        };

        $.ajax({
            url: url,
            type: 'POST',
            dataType: "json",
            data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
            success: function(data) {
                toastr.options.closeButton = true;
                toastr.success("Activity Type added successfully.");
                //window.location.replace("/sales-entry");
                populateActivityTypes(refreshUrl,false);
            },
            error: function(data) {
                //alert(data);
                toastr.options.closeButton = true;
                toastr.error("Something went wrong. Please try again with all the fields.");
            }
        });
        event.preventDefault();
    });
}

var addProductCategory = function(url, refreshUrl){  
    $("#addProductCategories").on('click', function(event) {
        //var url = '<%= api.serverUrl %>/api/vendor?psize=2000&token=<%= user.token %>';
        var data = {
            name: $('#categoryName').val(),
        };

        $.ajax({
            url: url,
            type: 'POST',
            dataType: "json",
            data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
            success: function(data) {
                toastr.options.closeButton = true;
                toastr.success("New Category added successfully.");
                //window.location.replace("/sales-entry");
                populateProductCategory(refreshUrl,false);
            },
            error: function(data) {
                //alert(data);
                toastr.options.closeButton = true;
                toastr.error("Something went wrong. Please try again with all the fields.");
            }
        });
        event.preventDefault();
    });
}


var addCenterTypes = function(url, refreshUrl){  
    $("#addCenterType").on('click', function(event) {
        //var url = '<%= api.serverUrl %>/api/vendor?psize=2000&token=<%= user.token %>';
        var data = {
            name: $('#centerType').val(),
        };

        $.ajax({
            url: url,
            type: 'POST',
            dataType: "json",
            data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
            success: function(data) {
                toastr.options.closeButton = true;
                toastr.success("Center Type added successfully.");
                //window.location.replace("/sales-entry");
                populateCenterTypes(refreshUrl,false);
            },
            error: function(data) {
                //alert(data);
                toastr.options.closeButton = true;
                toastr.error("Something went wrong. Please try again with all the fields.");
            }
        });
        event.preventDefault();
    });
}


var addEmpDesignation = function(url, refreshUrl){  
    $("#addEmpDesignation").on('click', function(event) {
        //var url = '<%= api.serverUrl %>/api/vendor?psize=2000&token=<%= user.token %>';
        var data = {
            name: $('#mDesignationName').val()
        };


        $.ajax({
            url: url,
            type: 'POST',
            dataType: "json",
            data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
            success: function(data) {
                toastr.options.closeButton = true;
                toastr.success(" New Designation added successfully.");
                //window.location.replace("/sales-entry");
                populateEmpDesignation(refreshUrl,false);
            },
            error: function(data) {
                //alert(data);
                toastr.options.closeButton = true;
                toastr.error("Something went wrong. Please try again with all the fields.");
            }
        });
        event.preventDefault();
    });
}


var addEmpDepartment = function(url, refreshUrl){  
    $("#addEmpDepartment").on('click', function(event) {
        //var url = '<%= api.serverUrl %>/api/vendor?psize=2000&token=<%= user.token %>';
        var data = {
            name: $('#mDepartmentName').val()
        };


        $.ajax({
            url: url,
            type: 'POST',
            dataType: "json",
            data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
            success: function(data) {
                toastr.options.closeButton = true;
                toastr.success(" New Department added successfully.");
                //window.location.replace("/sales-entry");
                populateEmpDepartment(refreshUrl,false);
            },
            error: function(data) {
                //alert(data);
                toastr.options.closeButton = true;
                toastr.error("Something went wrong. Please try again with all the fields.");
            }
        });
        event.preventDefault();
    });
}

var addItem = function(url, refreshUrl){
    $("#addItem").on('click', function(event) {
        var data = {
            name: $('#mItemName').val(),
            price: $('#mItemPrice').val(),
            type: $('#mItemType').val(),
            unit: $('#mItemUnit').val(),
            description: $('#mItemDescription').val()
        };

        $.ajax({
            url: url,
            type: 'POST',
            dataType: "json",
            data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
            success: function(data) {
                toastr.options.closeButton = true;
                toastr.success("New Item added successfully.");

                populateItems(refreshUrl,false);
                //window.location.replace("/sales-entry");
            },
            error: function(data) {
                //alert(data);
                toastr.options.closeButton = true;
                toastr.error("Something went wrong. Please try again with all the fields.");
            }
        });
        event.preventDefault();
    });
}

var addTaskCategory = function(url, refreshUrl){  
    $("#addTaskCategory").on('click', function(event) {
        //var url = '<%= api.serverUrl %>/api/vendor?psize=2000&token=<%= user.token %>';
        var data = {
            name: $('#tName').val()
        };

        $.ajax({
            url: url,
            type: 'POST',
            dataType: "json",
            data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
            success: function(data) {
                toastr.options.closeButton = true;
                toastr.success("New Task Category added successfully.");
                //window.location.replace("/sales-entry");
                populateTaskCategory(refreshUrl,false);
            },
            error: function(data) {
                //alert(data);
                toastr.options.closeButton = true;
                toastr.error("Something went wrong. Please try again with all the fields.");
            }
        });
        event.preventDefault();
    });
}

var addMembers = function(url, refreshUrl){  
    $("#addMembers").on('click', function(event) {
        //var url = '<%= api.serverUrl %>/api/vendor?psize=2000&token=<%= user.token %>';
        var data = {
            name: $('#memberName').val(),
            mobile: $('#memberMobile').val(),
            dateOfBirth: $('#dateOfBirth').val(),
            startDate: $('#startDate').val(),
            designation: $('#designation').val()
        };

        $.ajax({
            url: url,
            type: 'POST',
            dataType: "json",
            data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
            success: function(data) {
                toastr.options.closeButton = true;
                toastr.success("New Committee Member added successfully.");
                //window.location.replace("/sales-entry");
                populateMembers(refreshUrl,false);
            },
            error: function(data) {
                //alert(data);
                toastr.options.closeButton = true;
                toastr.error("Something went wrong. Please try again with all the fields.");
            }
        });
        event.preventDefault();
    });
}

var addLeave = function(url, refreshUrl){
    $("#addLeaveType").on('click', function(event) {
        //var url = '<%= api.serverUrl %>/api/mode?psize=2000&token=<%= user.token %>';
        var data = {
            name: $('#name').val(),
            maxNagativeBal: $('#maxNagativeBal').val(),
            salaryComponentId: $('#salaryComponentId').val(),
            maxDaysAlloted: $('#maxDaysAlloted').val()
        };

        $.ajax({
            url: url,
            type: 'POST',
            dataType: "json",
            data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
            success: function(data) {
                toastr.options.closeButton = true;
                toastr.success("New bank added successfully.");

                populateLeaveType(refreshUrl,false);
                //window.location.replace("/sales-entry");
            },
            error: function(data) {
                //alert(data);
                toastr.options.closeButton = true;
                toastr.error("Something went wrong. Please try again with all the fields.");
            }
        });
        event.preventDefault();
    });
}

var addBlogCategories = function(url, refreshUrl){  
    $("#addBlogCategories").on('click', function(event) {
        //var url = '<%= api.serverUrl %>/api/vendor?psize=2000&token=<%= user.token %>';
        var data = {
            name: $('#blogCategoryName').val(),
        };

        $.ajax({
            url: url,
            type: 'POST',
            dataType: "json",
            data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
            success: function(data) {
                toastr.options.closeButton = true;
                toastr.success("New Category added successfully.");
                //window.location.replace("/sales-entry");
                populateBlogCategories(refreshUrl,false);
            },
            error: function(data) {
                //alert(data);
                toastr.options.closeButton = true;
                toastr.error("Something went wrong. Please try again with all the fields.");
            }
        });
        event.preventDefault();
    });
}

var addItemCategory = function(url, refreshUrl){  
    $("#addItemCategories").on('click', function(event) {
        //var url = '<%= api.serverUrl %>/api/vendor?psize=2000&token=<%= user.token %>';
        var data = {
            name: $('#itemCategoryName').val(),
        };

        $.ajax({
            url: url,
            type: 'POST',
            dataType: "json",
            data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
            success: function(data) {
                toastr.options.closeButton = true;
                toastr.success("New Category added successfully.");
                //window.location.replace("/sales-entry");
                populateItemCategory(refreshUrl,false);
            },
            error: function(data) {
                //alert(data);
                toastr.options.closeButton = true;
                toastr.error("Something went wrong. Please try again with all the fields.");
            }
        });
        event.preventDefault();
    });
}

var buildUrl = function(serverUrl, api, token, psize ,data){
	var url = serverUrl + '/api/' + api + '/?token=' + token;
	if(psize )
		url = url + '&psize=' + psize;
    if(data){
        url = url + '&sId=' + data;
    }
	return url;
}

var alertMessages = {
    //internaleServerError: 'Internal server error! Please try again in some time. Call us at <a href="tel:+918026644556"><i class="fa fa-phone-square"></i> +91 80 2664 4556</a> or email to <a href="mailto:care@onground.in"><i class="fa fa-envelope"></i> care@onground.in</a> for any help.',
    //validationError: 'Form validation failed! Please correct them and submit again. Call us at <a href="tel:+918026644556"><i class="fa fa-phone-square"></i> +91 80 2664 4556</a> or email to <a href="mailto:care@onground.in"><i class="fa fa-envelope"></i> care@onground.in</a> for any help.',
    internaleServerError: 'Internal server error! Please try again.',
    validationError: 'Form validation failed! Please try again.',
    successMessage: ''
};

var showAlertMessage = function(msgType, message, alertType, faIcon){
    $('#form-alerts').html('');
    var msg = '';
    console.log(message);
    switch(msgType){
        case 'internaleServerError':
            msg = message.responseJSON.error;
            break;
        case 'validationError':
            msg = alertMessages.validationError;
            break;
        case 'successMessage':
            msg = message;
            break;
        default:
            msg = alertMessages.internaleServerError;
    }

    $.bootstrapGrowl(
        msg, {
        ele: 'body', // which element to append to
        type: alertType, // (null, 'info', 'danger', 'success', 'warning')
        offset: {
            from: 'top',
            amount: 0
        }, // 'top', or 'bottom'
        align: 'center', // ('left', 'right', or 'center')
        width: 350, // (integer, or 'auto')
        delay: 15000, // Time while the message will be displayed. It's not equivalent to the *demo* timeOut!
        allow_dismiss: true, // If true then will display a cross to close the popup.
        stackup_spacing: 10 // spacing between consecutively stacked growls.
    });

    // App.alert({ 
    //     message: msg,
    //     type: alertType,
    //     closeInSeconds: 60,
    //     container: '#form-alerts', // alerts parent container place: 'append', // append or prepent in container type: 'success', // alert's type message: 'Test alert', // alert's message
    //     close: true, // make alert closable reset: false, // close all previouse alerts first focus: true, // auto scroll to the alert after shown closeInSeconds: 10000, // auto close after defined seconds
    //     icon: 'fa ' + faIcon // put icon class before the message 
    // });
}

var getDate = function(dateString){
    var newDateStr = '';
    if(dateString != null && dateString != ''){
        var dateParts = dateString.split("-");
        // format it in yyyy/mm/dd
        if(dateParts && dateParts.length == 3){
            newDateStr = dateParts[2] + '/' + dateParts[1] + '/' + dateParts[0];
            return newDateStr;
        }
    }else{
        return null;    
    }
}

var getDateTime = function(dateString){
    var newDateStr = '';
    if(dateString != null && dateString != ''){
        newDateStr =  moment(dateString, "DD MMMM YYYY - HH:mm").format("YYYY-MM-DD HH:mm");
            return newDateStr;
    }else{
        return null;    
    }
}


var scrollToTop = function(selector){
    var body = $("html, body");
    body.stop().animate({scrollTop:0}, '500', 'swing', function() { 
        //alert("Finished animating");
    });
}

var titleCase = function(str) {
    return str.toLowerCase().split(' ').map(function(word) {
        return (word.charAt(0).toUpperCase() + word.slice(1));
    }).join(' ');
}

var formatModes = function(modeStr) {
    return (modeStr != undefined ? (modeStr == 'bank' ? '<span class="label label-sm label-info"> '+ titleCase(modeStr) + ' </span>':'<span class="label label-sm label-warning"> '+ titleCase(modeStr) + ' </span>') : '');
}

var formatItemTypes = function(itemType) {
    return (itemType != undefined ? (itemType == 'product' ? '<span class="label label-sm label-success"> '+ titleCase(itemType) + ' </span>':'<span class="label label-sm label-info"> '+ titleCase(itemType) + ' </span>') : '');
}

var formatTransactionTypes = function(typeStr) {
    return (typeStr != undefined ? (typeStr == 'receipt' ? '<span class="label label-sm label-success"> '+ titleCase(typeStr) + ' </span>':'<span class="label label-sm label-danger"> '+ titleCase(typeStr) + ' </span>') : '');
}

var formatExpenseFor = function(forStr) {
    var str = '';
    if(forStr != undefined && forStr != null){
        if(forStr === 'self'){
            str = '<span class="label label-sm label-info"> '+ titleCase(forStr);
        }else if(forStr === 'customer'){
            str = '<span class="label label-sm label-success"> '+ titleCase(forStr);
        }else if(forStr === 'vendor'){
            str = '<span class="label label-sm label-warning"> '+ titleCase(forStr);
        }else if(forStr === 'employee'){
            str = '<span class="label label-sm label-danger"> '+ titleCase(forStr);
        }
    }
    return str;
}

var formatStatus = function(forStr) {
    var str = '';
    if(forStr != undefined && forStr != null){
        if(forStr === 'To-do'){
            str = '<span class="label label-sm label-danger"> '+ titleCase(forStr);
        }else if(forStr === 'In Progress'){
            str = '<span class="label label-sm label-warning"> '+ titleCase(forStr);
        }else if(forStr === 'Completed'){
            str = '<span class="label label-sm label-success"> '+ titleCase(forStr);
        }
    }
    return str;
}

var formatLeadRows = function(leadStatus){
    var style = '';
    if(leadStatus != undefined && leadStatus != null){
        if(leadStatus === 'NEW'){
            style = '';
        }else if(leadStatus === 'CONVERTED'){
            style = 'style="background-color:green;color:white;"';
        }else if(leadStatus === 'PAID'){
            style = 'style="background-color:#28348c;color:white;"';
        }else if(leadStatus === 'ON HOLD'){
            style = 'style="background-color:orange;color:white;"';
        }else if(leadStatus === 'CANCELLED'){
            style = 'style="background-color:red;color:white;"';
        }
    }
    return style;
}

var formatLeadStatus = function(oStatus) {
    var str = '';
    if(oStatus != undefined && oStatus != null){
        if(oStatus === 'NEW'){
            str = '<span class="label label-sm label-info"> '+ titleCase(oStatus);
        }else if(oStatus === 'CONVERTED'){
            str = '<span class="label label-sm" style="background-color:#1bbc9b;"> '+ titleCase('Confirmed');
        }else if(oStatus === 'PAID'){
            str = '<span class="label label-sm" style="background-color:#05bbd8;"> '+ titleCase('Paid Online');
        }else if(oStatus === 'ON HOLD'){
            str = '<span class="label label-sm label-warning"> '+ titleCase(oStatus);
        }else if(oStatus === 'CANCELLED'){
            str = '<span class="label label-sm label-danger"> '+ titleCase(oStatus);
        }
    }
    return str;

    // <option value="NEW" selected="true">New</option>
    // <option value="INSPECTION PENDING">Inspection Pending</option>
    // <option value="INSPECTION IN PROGRESS">Inspection in Progress</option>
    //     <option value="QUOTE PENDING">Quote Pending</option>
    // <option value="QUOTE SEND">Quote Send</option>
    // <option value="QUOTE APPROVED">Quote Approved</option>
    // <option value="ON HOLD">On Hold</option>
    // <option value="CANCELLED">Cancelled</option>
    // <option value="CONVERTED">Converted</option>
}

var formatTaskStatus = function(oStatus) {
    var str = '';
    if(oStatus != undefined && oStatus != null){
        if(oStatus === 'To-do'){
            str = '<span class="label label-sm label-danger"> '+ titleCase(oStatus);
        }else if(oStatus === 'Completed'){
            str = '<span class="label label-sm" style="background-color:#1bbc9b;"> '+ titleCase('Completed');
        }else if(oStatus === 'In-Progress'){
            str = '<span class="label label-sm label-warning"> '+ titleCase('In-Progress');
        }else if(oStatus === 'Cancelled'){
            str = '<span class="label label-sm" style="background-color:blue;"> '+ titleCase('Cancelled');
        }
    }
    return str;
}

var formatVisitorStatus = function(oStatus) {
    var str = '';
    if(oStatus != undefined && oStatus != null){
        if(oStatus === 'visit'){
            str = '<span class="label label-sm label-info"> '+ titleCase('visit');
        }else if(oStatus === 'confirmed'){
            str = '<span class="label label-sm" style="background-color:#1bbc9b;"> '+ titleCase('Confirmed');
        }else if(oStatus === 'measurement'){
            str = '<span class="label label-sm label-warning"> '+ titleCase('Measurement');
        }else if(oStatus === 'unsuccessful'){
            str = '<span class="label label-sm label-danger"> '+ titleCase('Unsuccessful');
        }else if(oStatus === 'quotation'){
            str = '<span class="label label-sm" style="background-color:blue;"> '+ titleCase('Quotation');
        }
    }
    return str;

    // <option value="NEW" selected="true">New</option>
    // <option value="INSPECTION PENDING">Inspection Pending</option>
    // <option value="INSPECTION IN PROGRESS">Inspection in Progress</option>
    //     <option value="QUOTE PENDING">Quote Pending</option>
    // <option value="QUOTE SEND">Quote Send</option>
    // <option value="QUOTE APPROVED">Quote Approved</option>
    // <option value="ON HOLD">On Hold</option>
    // <option value="CANCELLED">Cancelled</option>
    // <option value="CONVERTED">Converted</option>
}


var formatOrderStatus = function(oStatus) {
    var str = '';
    if(oStatus != undefined && oStatus != null){
        if(oStatus === 'open'){
            str = '<span class="label label-sm label-danger"> '+ titleCase(oStatus);
        }else if(oStatus === 'packing'){
            str = '<span class="label label-sm label-info"> '+ titleCase(oStatus);
        }else if(oStatus === 'shipping'){
            str = '<span class="label label-sm label-warning"> '+ titleCase(oStatus);
        }else if(oStatus === 'dispatched'){
            str = '<span class="label label-sm label-warning"> '+ titleCase(oStatus);
        }else if(oStatus === 'delivered'){
            str = '<span class="label label-sm label-success"> '+ titleCase(oStatus);
        }else if(oStatus === 'cancelled'){
            str = '<span class="label label-sm label-danger"> '+ titleCase(oStatus);
        }
    }
    return str;
}


var initDateRange = function(apiUrl) {
    if (!jQuery().daterangepicker) {
        return;
    }
    $('#date-range').daterangepicker({
        "ranges": {
            'Today': [moment(), moment()],
            'Yesterday': [moment().subtract('days', 1), moment().subtract('days', 1)],
            'Last 7 Days': [moment().subtract('days', 6), moment()],
            'Last 30 Days': [moment().subtract('days', 29), moment()],
            'This Month': [moment().startOf('month'), moment().endOf('month')],
            'Last Month': [moment().subtract('month', 1).startOf('month'), moment().subtract('month', 1).endOf('month')]
        },
        format: 'MM/DD/YYYY',
        separator: ' to ',
        startDate: moment().subtract('days', 29),
        endDate: moment(),
        "locale": {
            "format": "MM/DD/YYYY",
            "separator": " - ",
            "applyLabel": "Apply",
            "cancelLabel": "Cancel",
            "fromLabel": "From",
            "toLabel": "To",
            "customRangeLabel": "Custom",
            "daysOfWeek": ["Su","Mo","Tu","We","Th","Fr","Sa"],
            "monthNames": ["January","February","March",
                "April","May","June","July","August","September","October","November","December"
            ],
            "firstDay": 1
        },
        opens: (App.isRTL() ? 'right' : 'left'),
    }, function(start, end, label) {
        $('#date-range span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
        // alert(start.format('YYYY/MM/DD'));
        // alert(end.format('YYYY/MM/DD'));
        //alert(label);
        if(apiUrl != undefined){
            if(apiUrl.includes('bank-ledger')){
                filterBankLedgerData(apiUrl, start.format('YYYY/MM/DD'), end.format('YYYY/MM/DD'), null, null);
            }else if(apiUrl.includes('cash-ledger')){
                    filterCashLedgerData(apiUrl, start.format('YYYY/MM/DD'), end.format('YYYY/MM/DD'), null, null);
            }else if(apiUrl.includes('customer-ledger')){
                filterCustomersLedgerData(apiUrl, start.format('YYYY/MM/DD'), end.format('YYYY/MM/DD'), null, null);
            }else if (apiUrl.includes('expenses')){
                filterExpensesLedgerData(apiUrl, start.format('YYYY/MM/DD'), end.format('YYYY/MM/DD'), null, null);
            }else if(apiUrl.includes('sales-ledger')){
                filterSalesLedgerData(apiUrl, start.format('YYYY/MM/DD'), end.format('YYYY/MM/DD'), null, null);
            }else if(apiUrl.includes('vendor-ledger')){
                filterVendorLedgerData(apiUrl, start.format('YYYY/MM/DD'), end.format('YYYY/MM/DD'), null, null);
            }else if(apiUrl.includes('purchase-ledger')){
                filterPurchaseLedgerData(apiUrl, start.format('YYYY/MM/DD'), end.format('YYYY/MM/DD'), null, null);
            }else if(apiUrl.includes('dashboard/orders')) {
                filterOrderDashboardData(apiUrl, start.format('YYYY/MM/DD'), end.format('YYYY/MM/DD'), null);
            }else if(apiUrl.includes('dashboard')){
                filterLeadDashboardData(apiUrl, start.format('YYYY/MM/DD'), end.format('YYYY/MM/DD'), null);
            }else if(apiUrl.includes('orders')){
                filterOrderData(apiUrl, start.format('YYYY/MM/DD'), end.format('YYYY/MM/DD'), null, null);
            }else if(apiUrl.includes('leads')){
                filterLeadsListData(apiUrl, start.format('YYYY/MM/DD'), end.format('YYYY/MM/DD'), null, null);
            }else if(apiUrl.includes('events')){
                filterEventsData(apiUrl, start.format('YYYY/MM/DD'), end.format('YYYY/MM/DD'), null, null);
            }else if(apiUrl.includes('visitors')){
                filterVisitorData(apiUrl, start.format('YYYY/MM/DD'), end.format('YYYY/MM/DD'), null, null);
            }else if(apiUrl.includes('blog')){
                filterBlogsListData(apiUrl, start.format('YYYY/MM/DD'), end.format('YYYY/MM/DD'), null, null);
            }

        }
    });

    $('#date-range span').html(moment().subtract('days', 29).format('MMMM D, YYYY') + ' - ' + moment().format('MMMM D, YYYY'));
    $('#date-range').show();
}

var getIdPath = function(id){
    return id.split('-').join('/');
};

$('.group-checkable').change(function() {
    if($(this).is(":checked")) {
        $('.btn-delete').removeClass('hidden');
    }else{
        $('.btn-delete').addClass('hidden');
    }
});


// var sendSMS = function(url, refreshUrl){
//     $("#sendSMS").on('click', function(event) {
//         //var url = '<%= api.serverUrl %>/api/mode?psize=2000&token=<%= user.token %>';
//         var data = {
//             mobile: $('#mMobile').val(),
//             message: $('#mMessage').val()
//         };

//         $.ajax({
//             url: url,
//             type: 'POST',
//             dataType: "json",
//             data: JSON.stringify(data),
//             contentType: "application/json; charset=utf-8",
//             success: function(data) {
//                 toastr.options.closeButton = true;
//                 toastr.success("Your message submitted successfully.");

//                // populateBankList(refreshUrl,false);
//                 //window.location.replace("/sales-entry");
//             },
//             error: function(data) {
//                 //alert(data);
//                 toastr.options.closeButton = true;
//                 toastr.error("Something went wrong. Please try again with all the fields.");
//             }
//         });
//         event.preventDefault();
//     });
// }

/*$('#sendSMSBtn').on('click', function() {
    $('#sendSMSModal').modal();
    $("#mMobile").val( $('#smsMobile').val() );
    $("#mMessage").val( $('#smsMessage').val() );
});
*/

function showStuff (id){
   $("#"+id).removeClass("hidden");
}


function getToken(){
    return $('#apiToken').val();
}

function getAPIUrl(){
    return $('#apiUrl').val();
}