var filterSubscriptionListData = function(url, startDate, endDate, customerId){
    //delete the table
    $("#subscription_list").remove();
    $("#subscription_list_wrapper").remove();
    //recreate the table
    $("#tDiv").append(
        '<table class="table table-striped table-bordered table-hover table-checkable order-column" id="subscription_list">'+
            '<thead>'+
                '<tr class="uppercase">'+
                    '<th class="table-checkbox">'+
                        '<input type="checkbox" class="group-checkable" data-set="#subscription_list .checkboxes" /> </th>'+
                        '<th> Date </th>'+
                        '<th> Service </th>'+
                        '<th> Customer </th>'+
                        '<th> Location </th>'+
                        '<th> Amount </th>'+
                        
                '</tr>'+
            '</thead>'+
            '<tbody id="tableData"></tbody>'+
        '</table>'
    );
    getSubscriptionsListData(url);
};

var goToSubscription = function(subscribeId){
    window.location = '/subscriptions/' + subscribeId;
};

var getSubscriptionsListData = function(url){
    
    App.blockUI({
        target: '#subscription_portlet',
        animate: true
    });

    window.setTimeout(function() {
        App.unblockUI('#subscription_portlet');
    }, 500);
    $.ajax({
        url: url,
        type: 'GET',
        success: function(data) {
            if (data.data) {
                for (i = 0; i < data.data.length; i++) {
                    var row = data.data[i];
                    alert(JSON.stringify(row));
                    $('#tableData').append(
                        //'<tr class="gradeX' + (i % 2 == 0 ? 'even' : 'odd') + ' role="row">' +
                        '<tr class="odd gradeX">'+ // onclick=goToEmployees("'+row.id +'")>'+
                            '<td><input type="checkbox" class="checkboxes" value="1" ' +
                            'data-id="'+row.id +'"/></td>' +
                            '<td class="clickable" onclick=goToSubscription("'+row.id +'")>' + (row.startDate != undefined ? moment(new Date(row.startDate)).format("DD-MMM-YYYY") : '') + ' </td>' +
                            '<td class="clickable" onclick=goToSubscription("'+row.id +'")>' + (row.item != undefined ? row.item.name: '') + ' </td>' +
                            '<td class="clickable" onclick=goToSubscription("'+row.id +'")>' + (row.customer != undefined ? row.customer.name: '') + ' </td>' +
                            '<td class="clickable" onclick=goToSubscription("'+row.id +'")>' + (row.dueDate != undefined ? moment(new Date(row.dueDate)).format("DD-MMM-YYYY"): '') + ' </td>' +
                            '<td class="clickable" onclick=goToSubscription("'+row.id +'")>' + (row.location != undefined ? row.location: '') + ' </td>' +
                            '<td class="clickable" onclick=goToSubscription("'+row.id +'")>' + (row.tamount != undefined ? row.tamount : '') + ' </td>' +

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
    var table = $('#maintenance_list');
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

    var tableWrapper = jQuery('#subscription_list_wrapper');

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
    App.unblockUI('#subscription_portlet');
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
            var url = $('#apiUrl').val()+ '/api/subscription/'+ $(this).attr('data-id') +'?token='+$('#token').val();
            $.ajax({
                url: url,
                type: 'DELETE',
                success: function(data) {
                    if (data && data.status) {
                       i++;
                        if(i == count){
                            swal("Deleted!", "Subscription has been deleted successfully.", "success");
                            window.location = '/subscriptions';
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

$('.filter-btn').on('click', function(){
    $('.table-filters').toggleClass("hide");
    $("#customerId").select2({allowClear: false});
});

getSubscriptionsListData(buildUrl(getAPIUrl(),'subscriptions', getToken(), 3000));

$('#filter-submit').on('click', function(event){
    var fromDate = toDate = null;
    event.preventDefault();

    filterLeadsListData(
        buildUrl(getAPIUrl(),'leads', getToken(), 3000), 
        fromDate, toDate, 
        $('#customerId').val()
    );

});

initDateRange(buildUrl(getAPIUrl(),'leads', getToken(), 3000));