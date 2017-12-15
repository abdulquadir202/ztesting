var filterQuotationsListData = function(url){
    //delete the table
    $("#quotations_list").remove();
    $("#quotations_list_wrapper").remove();
    //recreate the table
    $("#tDiv").append(
        '<table class="table table-striped table-bordered table-hover table-checkable order-column" id="quotations_list">'+
            '<thead>'+
                '<tr class="uppercase">'+
                    '<th class="table-checkbox">'+
                        '<input type="checkbox" class="group-checkable" data-set="#quotations_list .checkboxes" /> </th>'+
                        '<th> Quote Id </th>'+
                        '<th> Lead Id </th>'+
                        '<th> Customer </th>'+
                        '<th> Date </th>'+
                        '<th> Name </th>'+
                        // '<th> Mobile </th>'+
                        // '<th> Address </th>'+
                        '<th> Amount </th>'+ 
                '</tr>'+
            '</thead>'+
            '<tbody id="tableData"></tbody>'+
        '</table>'
    );

    // url = url + '&fromDate=' + fromDate.format('YYYY-MM-DD') + '&toDate=' + toDate.format('YYYY-MM-DD');
    // if(customerId != null && customerId!= -1){
    //     url = url + '&customerId=' + customerId;
    // }
    // if(modeType != null && modeType!= -1){
    //     url = url + '&modeType=' + modeType;
    // }
    getQuotationsListData(url);
};

var goToQuotations = function(quoteId){
    window.location = '/quotations/' + quoteId;
};

var getQuotationsListData = function(url){
    App.blockUI({
        target: '#quotations_portlet',
        animate: true
    });

    window.setTimeout(function() {
        App.unblockUI('#quotations_portlet');
    }, 500);
    $.ajax({
        url: url,
        type: 'GET',
        success: function(data) {
            //alert(JSON.stringify(data));
            if (data.data) {
                for (i = 0; i < data.data.length; i++) {
                    var row = data.data[i];
                    $('#tableData').append(
                        //'<tr class="gradeX' + (i % 2 == 0 ? 'even' : 'odd') + ' role="row">' +
                        '<tr class="odd gradeX">'+
                            '<td><input type="checkbox" class="checkboxes" value="1" ' +
                            'data-id="'+row.id +'"/></td>' +
                            '<td class="clickable" onclick=goToQuotations("'+row.id +'")>' + (row.quotationNo != undefined ? row.quotationNo: '') + ' </td>' +
                            '<td class="clickable" onclick=goToQuotations("'+row.id +'")>' + (row.leadId != undefined ? row.leadId: '') + ' </td>' +
                            '<td class="clickable" onclick=goToQuotations("'+row.id +'")>' + (row.to != undefined ? row.to: '') + ' </td>' +
                            '<td> ' + (row.total != undefined ? row.total: 0) + ' </td>' +
                        '</tr>'
                    );
                }
                $("#tableData > tr > td.clickable").hover(function() {
                    $(this).css('cursor','pointer');
                }, function() {
                    $(this).css('cursor','auto');
                });
                $('.checkboxes').change(function() {
                    if($('.checkboxes:checked').length >= 1){
                        $('.btn-delete').removeClass('hidden');
                    }else{
                        $('.btn-delete').addClass('hidden');
                    }       
                });
            }
           // initialize the table
           initializeTable();
        },
        error: function(data) {
            //showAlertMessage('internaleServerError', data, 'danger', 'fa-warning fa-lg');
        }
    });
};

var initializeTable = function(){
    var table = $('#quotations_list');
    table.dataTable({
        "language": {
            "aria": {
                "sortAscending": ": activate to sort column ascending",
                "sortDescending": ": activate to sort column descending"
            },
            "emptyTable": "No data available in table",
            "info": "Showing _START_ to _END_ of _TOTAL_ records",
            "infoEmpty": "No records found",
            "infoFiltered": "(filtered1 from _MAX_ total records)",
            "lengthMenu": "Show _MENU_",
            "search": "Search:",
            "zeroRecords": "No matching records found",
            "paginate": {
                "previous":"Prev",
                "next": "Next",
                "last": "Last",
                "first": "First"
            }
        },

        // Uncomment below line("dom" parameter) to fix the dropdown overflow issue in the datatable cells. The default datatable layout
        // setup uses scrollable div(table-scrollable) with overflow:auto to enable vertical scroll(see: assets/global/plugins/datatables/plugins/bootstrap/dataTables.bootstrap.js). 
        // So when dropdowns used the scrollable div should be removed. 
        //"dom": "<'row'<'col-md-6 col-sm-12'l><'col-md-6 col-sm-12'f>r>t<'row'<'col-md-5 col-sm-12'i><'col-md-7 col-sm-12'p>>",

        "bStateSave": false, // save datatable state(pagination, sort, etc) in cookie.
        "pagingType": "bootstrap_extended",
        //"destroy": true,
        "lengthMenu": [
            [5, 10, 15, 20, -1],
            [5, 10, 15, 20, "All"] // change per page values here
        ],
        // set the initial value
        "pageLength": 10,
        "columnDefs": [{  // set default column settings
            'orderable': false,
            'targets': [0]
        }, {
            "searchable": false,
            "targets": [0]
        }],
        "order": [
            [1, "desc"]
        ] // set first column as a default sort by asc
    });

    var tableWrapper = jQuery('#quotations_list_wrapper');

    table.find('.group-checkable').change(function () {
        var set = jQuery(this).attr("data-set");
        var checked = jQuery(this).is(":checked");
        jQuery(set).each(function () {
            if (checked) {
                $(this).prop("checked", true);
            } else {
                $(this).prop("checked", false);
            }
        });
        jQuery.uniform.update(set);
    });
    App.unblockUI('#quotations_portlet');
};


$('.btn-delete').on('click',function(event){
    swal({
        title: "Are you sure to delete this?",
        text: "You will not be able to recover this item once deleted!",
        type: "info",
        showCancelButton: true,
        closeOnConfirm: false,
        showLoaderOnConfirm: true
    }, function () {
        var i=0, count = $('.checkboxes:checked').length;
        $('.checkboxes:checked').each(function(){
            //ids.push($(this).attr('data-id'));//this is the checked checkbox
            var url = $('#apiUrl').val()+ '/api/quotation/'+ $(this).attr('data-id') +'?token='+$('#token').val();
            $.ajax({
                url: url,
                type: 'DELETE',
                success: function(data) {
                    if (data && data.status) {
                       i++;
                        if(i == count){
                            swal("Deleted!", "Quotation has been deleted successfully.", "success");
                            window.location = '/quotations';
                        }
                    }
                },
                error: function(data) {
                    showAlertMessage('internaleServerError', data, 'danger', 'fa-warning fa-lg');
                    return false;
                }
            });
        });
    });
});

$().ready(function() {
    getQuotationsListData(buildUrl(getAPIUrl(),'quotations', getToken(), 3000));

    $('#filter-submit').on('click', function(event){
        var str = $('#reportrange span').html();
        var dates = str.split(" - "); 
        // var fromDate = moment(dates[0], "MMMM D, YYYY");
        // var toDate = moment(dates[1], "MMMM D, YYYY");

        event.preventDefault();

        filterQuotationsListData(buildUrl(getAPIUrl(),'quotations', getToken(), 3000));
    });

    initDateRange(null);
});

function onSignupReady() {
    $(document.body).css("visibility", "visible");
    $.fn.zaSignUp.defaults.disableSubmit = function() {
            return "Sign Up"; 
    }
    $.fn.zaSignUp.defaults.getConfirmationTemplate = function() {
            return '';
    }

    $("#signupform").zaSignUp({
        onsubmit: function() {
                $("#za-signup-btn").attr("disabled", true);
                $("#ZI-load").css("display","block");
        },
        oncomplete: function(state) {
            var statusKey;
            $.each($.fn.zaSignUp.SIGNUP_STATE, function(key, value) {
                    if (state === value) {
                            statusKey = key;
                            return false; 
                    }
            });

            dataLayer.push({
                    event: 'gaEvent',
                    gaCategory: 'invoice_conversion',
                    gaAction: 'signup',
                    gaLabel: 'STATE_' + statusKey
            });

            if (state == $.fn.zaSignUp.SIGNUP_STATE.ERROR) {
                    $("#za-signup-btn").attr("disabled", false); 
                    $("#ZI-load").css("display","none"); 
            }
            if (state == $.fn.zaSignUp.SIGNUP_STATE.ACCOUNT_CREATED) {

                    dataLayer.push({
                            event: 'gaEvent',
                            gaCategory: 'invoice_conversion_from_invgenerator',
                            gaAction: 'signup',
                            gaLabel: 'completed'
                    });
            }
        },
        x_signup: {
                password_required: true
        }
    });
}

        window.trackSignUpClick = function() {
            dataLayer.push({
            event: 'gaEvent',
            gaCategory: 'invoice_signup_fromgenerator',
            gaAction: 'signup',
            gaLabel: 'invoice_generator'
            });
        }
