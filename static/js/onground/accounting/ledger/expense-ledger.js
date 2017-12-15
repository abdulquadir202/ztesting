var filterExpensesLedgerData = function(url, fromDate, toDate, expenseCategoryId, modeType, bankAccount){
    //delete the table
    $("#expenses_ledger").remove();
    $("#expenses_ledger_wrapper").remove();
    //recreate the table
    $("#tDiv").append(
        '<table class="table table-striped table-bordered table-hover table-checkable order-column" id="expenses_ledger">'+
            '<thead>'+
                '<tr class="uppercase">'+
                    '<th class="table-checkbox">'+
                        '<input type="checkbox" class="group-checkable" data-set="#expenses_ledger .checkboxes" /> </th>'+
                    '<th> Date </th>'+
                    '<th> Amount </th>'+
                    '<th> Category </th>'+
                    '<th> Mode </th>'+
                    '<th> Bank </th>'+
                    '<th> Expense For </th>'+
                    // '<th> Customer </th>'+
                    // '<th> Vendor </th>'+
                    // '<th> Employee </th>'+
                    '<th> Reference # </th>'+
                    '<th> Description </th>'+ 
                '</tr>'+
            '</thead>'+
            '<tbody id="tableData"></tbody>'+
        '</table>'
    );
    if(fromDate != null){
        url = url + '&fromDate=' + fromDate;
    }
    if(toDate != null){
        url = url + '&toDate=' + toDate;
    }
    if(expenseCategoryId != null && expenseCategoryId != -1){
        url = url + '&expenseCategoryId=' + expenseCategoryId;
    }
    if(modeType != null && modeType != -1){
        url = url + '&modeType=' + modeType;

        if(modeType == 'bank'){
            if(bankAccount != null && bankAccount != -1){
                url = url + '&bankAccount=' + bankAccount;
            }   
        }
    }

    getExpensesLedgerData(url);
};

var getExpensesLedgerData = function(url){
    App.blockUI({
        target: '#expense_ledger_portlet',
        animate: true
    });

    window.setTimeout(function() {
        App.unblockUI('#expense_ledger_portlet');
    }, 500);
    
    $.ajax({
        url: url,
        type: 'GET',
        success: function(data) {
            if (data.data) {
                for (i = 0; i < data.data.length; i++) {
                    var row = data.data[i];
                    $('#tableData').append(
                        //'<tr class="gradeX' + (i % 2 == 0 ? 'even' : 'odd') + ' role="row">' +
                        '<tr class="odd gradeX">'+
                            '<td><input type="checkbox" class="checkboxes" value="1" /></td>' +
                            '<td> ' + (row.tDate != undefined ? new Date(row.tDate).toISOString().slice(0, 10) : '') + ' </td>' +
                            '<td> ' + (row.amount != undefined ? row.amount : 0) + ' </td>' +
                            '<td> ' + (row.expenseCategory != undefined ? row.expenseCategory.cName : '') + ' </td>' +
                            '<td> ' + formatModes(row.modeType) + ' </td>' +
                            '<td> ' + (row.mode != undefined ? row.mode.bankAccount : '') + ' </td>' +
                            '<td> ' + formatExpenseFor(row.expenseFor) + ' </td>' +
                            // '<td> ' + (row.customer != undefined ? row.customer.name : '') + ' </a></td>' +
                            // '<td> ' + (row.vendor != undefined ? row.vendor.name : '') + ' </a></td>' +
                            // '<td> ' + (row.employee != undefined ? row.employee.name : '') + ' </td>' +
                            '<td> ' + (row.refNo != undefined ? row.refNo : '') + ' </td>' +
                            '<td> ' + (row.description != undefined ? row.description : '') + ' </td>' +
                        '</tr>'
                    );
                }
            }
           // initialize the table
           initializeTable();
        },
        error: function(data) {
            showAlertMessage('internaleServerError', data, 'danger', 'fa-warning fa-lg');
        }
    });
};

var initializeTable = function(){
    var table = $('#expenses_ledger');
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

    var tableWrapper = jQuery('#expenses_ledger_wrapper');

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
    App.unblockUI('#expense_ledger_portlet');
};