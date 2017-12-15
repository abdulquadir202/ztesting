var filterVendorsListData = function(url, fromDate, toDate, customerId, type){
    //delete the table
    $("#vendors_list").remove();
    $("#vendors_list_wrapper").remove();
    //recreate the table
    $("#tDiv").append(
        '<table class="table table-striped table-bordered table-hover table-checkable order-column" id="vendors_list">'+
            '<thead>'+
                '<tr class="uppercase">'+
                    '<th class="table-checkbox">'+
                        '<input type="checkbox" class="group-checkable" data-set="#vendors_list .checkboxes" /> </th>'+
                    '<th> Mobile </th>'+
                    '<th> Name </th>'+
                    '<th> Email </th>'+
                    '<th> Address </th>'+
                    '<th> Status </th>'+
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
    
    getVendorsListData(url);
};

var goToVendors = function(vendorId){
    window.location = '/admin/vendors/' + vendorId;
};


var getVendorsListData = function(url){
    App.blockUI({
        target: '#vendors_portlet',
        animate: true
    });


    window.setTimeout(function() {
        App.unblockUI('#vendors_portlet');
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
                        '<tr class="odd gradeX">'+ // onclick=goToVendors("'+row.id +'")>'+
                            '<td><input type="checkbox" class="checkboxes" value="1" ' +
                            'data-id="'+row.id+'" /></td>' +
                            '<td class="clickable" onclick=goToVendors("'+row.portfolio.uName +'")>' + (row.mobile != undefined ? row.mobile: '') + ' </td>' +
                            '<td class="clickable" onclick=goToVendors("'+row.portfolio.uName +'")>' + (row.name != undefined ? row.name: '') + ' </td>' +
                            '<td class="clickable" onclick=goToVendors("'+row.portfolio.uName +'")>' + (row.email != undefined ? row.email : '') + ' </td>' +
                            '<td class="clickable" onclick=goToVendors("'+row.portfolio.uName +'")>' + (row.org.address != undefined ? row.org.address : '') + ' </td>' +
                            '<td class="clickable" onclick=goToVendors("'+row.portfolio.uName +'")>' + (row.status != undefined ? row.status : '') + ' </td>'  +
                        '</tr>'
                    );
                    // $("#tableData > tr").hover(function() {
                    //     $(this).css('cursor','pointer');
                    // }, function() {
                    //     $(this).css('cursor','auto');
                    // });

                    $("#tableData > tr > td.clickable").hover(function() {
                        $(this).css('cursor','pointer');
                    }, function() {
                        $(this).css('cursor','auto');
                    });
                    $('.checkboxes').change(function() {
                        if($('.checkboxes:checked').length >= 1){
                            if($('#status').val()==='active'){
                                $('.btn-deactivate').removeClass('hidden');
                            }else{
                                $('.btn-activate').removeClass('hidden');
                            }
                        }else{
                            $('.btn-deactivate').addClass('hidden');                            
                            $('.btn-deactivate').addClass('hidden');
                        }
                    });
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
    var table = $('#vendors_list');
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
            //[1, "desc"]
        ] // set first column as a default sort by asc
    });

    var tableWrapper = jQuery('#vendors_list_wrapper');

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
    App.unblockUI('#vendors_portlet');
};

$().ready(function() {
   
    $('.filter-btn').on('click', function(){
        $('.table-filters').toggleClass("hide");
    });

    getVendorsListData(buildUrl(getAPIUrl(),'vendors-list', getToken(), 2000,$('#status').val()));

    $('#filter-submit').on('click', function(event){
        var fromDate = toDate = null;
        event.preventDefault();

        filterVendorsListData(
            buildUrl(getAPIUrl(),'vendors-list', getToken(), 2000,$('#status').val()), 
            fromDate, toDate
        );

    });

    initDateRange(buildUrl(getAPIUrl(),'vendors-list', getToken(), 2000,$('#status').val()));
});
$('.btn-activate').on('click',function(event){
    
    var i=0, count = $('.checkboxes:checked').length;
    $('.checkboxes:checked').each(function(){
        //ids.push($(this).attr('data-id'));//this is the checked checkbox
        event.preventDefault();
        var url = $('#apiUrl').val()+ '/api/userProfile/'+ $(this).attr('data-id') +'?token='+getToken();
        var data = {
            status: 'active'
        };
        $.ajax({
            url: url,
            type: 'PUT',
            data: JSON.stringify(data),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function(data) {
                if (data && data.result) {
                   i++;
                    if(i == count){
                        swal("Deactivated!", "Vendor has been deactivated.", "success");
                        window.location = '/admin/vendors?status='+$('#status').val();
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

$('.btn-deactivate').on('click',function(event){
    
    var i=0, count = $('.checkboxes:checked').length;
    $('.checkboxes:checked').each(function(){
        //ids.push($(this).attr('data-id'));//this is the checked checkbox
        event.preventDefault();
        var url = $('#apiUrl').val()+ '/api/userProfile/'+ $(this).attr('data-id') +'?token='+getToken();
        var data = {
            status: 'inactive'
        };
        $.ajax({
            url: url,
            type: 'PUT',
            data: JSON.stringify(data),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function(data) {
                if (data && data.result) {
                   i++;
                    if(i == count){
                        swal("Deactivated!", "Vendor has been deactivated.", "success");
                        window.location = '/admin/vendors?'+$('#status').val();
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
