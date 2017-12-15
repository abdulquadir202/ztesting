var filterLeadSourcesListData = function(url, fromDate, toDate, customerId, type){
    //delete the table
    $("#leadSources_list").remove();
    $("#leadSources_list_wrapper").remove();
    //recreate the table
    $("#tDiv").append(
        '<table class="table table-striped table-bordered table-hover table-checkable order-column" id="leadSources_list">'+
            '<thead>'+
                '<tr class="uppercase">'+
                    '<th class="table-checkbox">'+
                        '<input type="checkbox" class="group-checkable" data-set="#leadSources_list .checkboxes" /> </th>'+
                        '<th> Name </th>'+
                        '<th> Website </th>'+
                        '<th> Contact Person </th>'+
                        '<th> Contact Number </th>'+
                        '<th> Commission Type </th>'+
                        '<th> Commission Amount </th>'+ 
                '</tr>'+
            '</thead>'+
            '<tbody id="tableData"></tbody>'+
        '</table>'
    );

    url = url + '&fromDate=' + fromDate.format('YYYY-MM-DD') + '&toDate=' + toDate.format('YYYY-MM-DD');
    if(customerId != null && customerId!= -1){
        url = url + '&customerId=' + customerId;
    }
    if(modeType != null && modeType!= -1){
        url = url + '&modeType=' + modeType;
    }
    getLeadSourcesListData(url);
};

var getLeadSourcesListData = function(url){
    App.blockUI({
        target: '#lead_sources_portlet',
        animate: true
    });

    window.setTimeout(function() {
        App.unblockUI('#lead_sources_portlet');
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
                            '<td> ' + (row.name != undefined ? row.name: '') + ' </td>' +
                            '<td> ' + (row.website != undefined ? row.website: '') + ' </td>' +
                            '<td> ' + (row.contactPerson != undefined ? row.contactPerson: '') + ' </td>' +
                            '<td> ' + (row.contactNumber != undefined ? row.contactNumber : '') + ' </td>' +
                            '<td> ' + (row.comissionType != undefined ? row.comissionType: '') + ' </td>' +
                            '<td> ' + (row.comissionAmount != undefined ? row.comissionAmount: '') + ' </td>' +
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
    var table = $('#leadSources_list');
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

    var tableWrapper = jQuery('#leadSources_list_wrapper');

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
    App.unblockUI('#lead_sources_portlet');
};