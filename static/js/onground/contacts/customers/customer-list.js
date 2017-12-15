var filterCustomerData = function(url, name, mobile){
    //delete the table
    $("#customers").remove();
    $("#customers_wrapper").remove();
    //recreate the table
    $("#tDiv").append(
        '<table class="table table-striped table-bordered table-hover table-checkable order-column" id="customers">'+
            '<thead>'+
                //'<tr class="uppercase">'+
                '<tr class="odd gradeX">'+
                    '<th class="table-checkbox">'+
                        '<input type="checkbox" class="group-checkable" data-set="#customers .checkboxes"/> </th>'+
                    '<th> Mobile </th>'+
                    '<th> Name </th>'+
                    '<th> Email </th>'+
                    '<th> Address </th>'+
                '</tr>'+
            '</thead>'+
            '<tbody id="tableData"></tbody>'+
        '</table>'
    );

    getCustomerData(url);
};
var goToCustomerDetail = function(customerId){
    window.location = '/admin/customers/' + customerId;
};

var getCustomerData = function(url){
    App.blockUI({
        target: '#customers_portlet',
        animate: true
    });

    window.setTimeout(function() {
        App.unblockUI('#customers_portlet');
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
                            '<td><input type="checkbox" class="checkboxes" value="1" data-id="'+ row.id +'"/></td>' +
                            '<td class="clickable" onclick=goToCustomerDetail("'+row.id +'")> ' + (row.mobile != undefined ? row.mobile: '') + ' </td>' +
                            '<td class="clickable" onclick=goToCustomerDetail("'+row.id +'")> ' + (row.name != undefined ? row.name: '') + ' </td>' +
                            '<td> ' + (row.email != undefined ? row.email: '') + ' </td>' +
                            '<td> ' + (row.address != undefined ? row.address: '') + ' </td>' +
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
            showAlertMessage('internaleServerError', data, 'danger', 'fa-warning fa-lg');
        }
    });
};

var initializeTable = function(){
    var table = $('#customers');
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

    var tableWrapper = jQuery('#customers_wrapper');

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
    App.unblockUI('#customers_portlet');
};


$('.btn-delete').on('click',function(event){
    var ids = new Array();

    $('.checkboxes:checked').each(function(){
      ids.push($(this).attr('data-id'));//this is the checked checkbox
    });

    var idText = ids.toString();
    var url = getAPIUrl() + '/api/customer?token='+getToken() + '&ids=' + idText ;
   
    $.ajax({
        url: url,
        type: 'DELETE',
        success: function(data) {
            if (data && data.status) {
                //showAlertMessage('successMessage','Customer deleted successfuly.','success','fa-check fa-lg');
                window.location = '/admin/customers';
            }
        },
        error: function(data) {
            showAlertMessage('internaleServerError', data, 'danger', 'fa-warning fa-lg');
        }
    });

});

getCustomerData(buildUrl(getAPIUrl(),'customers', getToken(), 3000));

$('#filter-submit').on('click', function(event){
    var str = $('#reportrange span').html();
    var dates = str.split(" - "); 
    var fromDate = moment(dates[0], "MMMM D, YYYY");
    var toDate = moment(dates[1], "MMMM D, YYYY");

    event.preventDefault();

    filterCustomerData(buildUrl(getAPIUrl(),'customers', getToken(), 3000), $('#name').val(), $('#mobile').val());

});

initDateRange(null);