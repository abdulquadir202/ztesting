
var filterOrderData = function(url, fromDate, toDate, customerId){
    //delete the table
    $("#orders").remove();
    $("#orders_wrapper").remove();
    //recreate the table
    $("#tDiv").append(
        '<table class="table table-striped table-bordered table-hover table-checkable order-column" id="orders">'+
            '<thead>'+
                '<tr class="uppercase">'+
                    '<th class="table-checkbox">'+
                        '<input type="checkbox" class="group-checkable" data-set="#orders .checkboxes" /> </th>'+
                    '<th> Order ID </th>'+
                    '<th> Date </th>'+
                    '<th> Customer </th>'+
                    '<th> Mobile </th>'+
                    '<th> Amount </th>'+
                    //'<th> Amount Paid </th>'+
                    //'<th> Amount Due </th>'+
                    '<th> Status </th>'+
                    //'<th> Address </th>'+
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
    if(customerId != null && customerId != -1){
        url = url + '&customerId=' + customerId;
    }

    getOrderData(url);
};

var goToOrderDetail = function(orderId){
    window.location = '/orders/' + orderId;
};

var getOrderData = function(url){
    // App.blockUI({
    //     target: '#orders_portlet',
    //     animate: true
    // });

    // window.setTimeout(function() {
    //     App.unblockUI('#orders_portlet');
    // }, 500);
    App.blockUI();
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
                            '<td class="clickable" onclick=goToOrderDetail("'+row.id +'")> ' + (row.orderId != undefined ? row.orderId: '') + ' </td>' +
                            '<td class="clickable" onclick=goToOrderDetail("'+row.id +'")> ' + (row.orderDate != undefined ? new Date(row.orderDate).toISOString().slice(0, 10) : '') + ' </td>' +
                            '<td class="clickable" onclick=goToOrderDetail("'+row.id +'")> ' + (row.customer != undefined ? (row.customer.name? row.customer.name : '') : '') + ' </td>' +
                            '<td class="clickable" onclick=goToOrderDetail("'+row.id +'")> ' + (row.customer != undefined ? (row.customer.mobile? row.customer.mobile : '') : '') + ' </td>' +
                            '<td> ' + (row.grossTotal != undefined ? row.grossTotal: '') + ' </td>' +
                            //'<td> ' + (row.amountPaid != undefined ? row.amountPaid: '') + ' </td>' +
                            //'<td> ' + (row.amountDue != undefined ? row.amountDue: '0') + ' </td>' +
                            '<td> ' + formatOrderStatus(row.orderStatus)+ ' </td>' +
                            //'<td> ' + (row.deliveryAddress != undefined ? row.deliveryAddress: '') + ' </td>' +
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
    var table = $('#orders');
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

    var tableWrapper = jQuery('#orders_wrapper');

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
    //App.unblockUI('#orders_portlet');
    App.unblockUI();
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
            var url = $('#apiUrl').val()+ '/api/order/'+ $(this).attr('data-id') +'?token='+$('#token').val();
            $.ajax({
                url: url,
                type: 'DELETE',
                success: function(data) {
                    if (data && data.status) {
                       i++;
                        if(i == count){
                            swal("Deleted!", "Item has been deleted successfully.", "success");
                            window.location = '/orders';
                        }
                    }
                },
                error: function(data) {
                    showAlertMessage('internaleServerError', data, 'danger', 'fa-warning fa-lg');
                    return false;
                }
            });
        });
        // setTimeout(function () {
        //     swal("Ajax request finished!");
        // }, 2000);
    });
});


$('.filter-btn').on('click', function(){
    $('.table-filters').toggleClass("hide");
    $("#customerId").select2({allowClear: false});
});

getOrderData(buildUrl(getAPIUrl(),'orders', getToken(), 3000));

$('#filter-submit').on('click', function(event){
    // var str = $('#reportrange span').html();
    // var dates = str.split(" - ");
    // var fromDate = moment(dates[0], "MMMM D, YYYY");
    // var toDate = moment(dates[1], "MMMM D, YYYY");

    var fromDate = toDate = null;
    event.preventDefault();

    filterOrderData(
        buildUrl(getAPIUrl(),'orders', getToken(), 3000),
        fromDate, toDate,
        $('#customerId').val()
    );

});

initDateRange(buildUrl(getAPIUrl(),'orders', getToken(), 3000));
populateCustomers(buildUrl(getAPIUrl(),'customers', getToken(), 3000), true);