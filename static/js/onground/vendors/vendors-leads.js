var filterLeadsListData = function(url, fromDate, toDate, customerId, type){
    //delete the table
    $(".leads_list").remove();
    $(".leads_list_wrapper").remove();
    //recreate the table
    $(".tDiv").append(
        '<table class="table table-striped table-bordered table-hover table-checkable order-column leads_list">'+
            '<thead>'+
                '<tr class="uppercase">'+
                    '<th class="table-checkbox">'+
                        '<input type="checkbox" class="group-checkable" data-set="#leads_list .checkboxes" /> '+
                    '</th>'+
                    '<th> Date </th>'+
                    '<th> Customer </th>'+
                    '<th> Mobile </th>'+
                    '<th> Item </th>'+
                    '<th> Service </th>'+
                    '<th> Job Date </th>'+
                    '<th> Price </th>'+
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
    if(customerId != null && customerId != -1){
        url = url + '&customerId=' + customerId;
    }
    
    getLeadsListData(url);
};


var getLeadsListData = function(url){
    App.blockUI({
        target: '#leads_portlet',
        animate: true
    });


    window.setTimeout(function() {
        App.unblockUI('#leads_portlet');
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
                        '<tr class="odd gradeX" '+ formatLeadRows(row.leadStatus) +'>'+
                            '<td><input type="checkbox" class="checkboxes" value="1" '+
                            'data-id="'+ row.id +'" data-price="'+ (row.price != undefined ? row.price : '') +'" /></td>' +
                            '<td>' + (row.createdOn != undefined ? moment(new Date(row.createdOn)).format("DD-MMM-YYYY") : '') + ' </td>' +
                            '<td>' + (row.leadId != undefined ? row.leadId: '') + ' </td>' +
                            '<td>' + (row.customer != undefined ? row.customer.name: '') + ' </td>' +
                            '<td>' + (row.customer != undefined ? row.customer.mobile: '') + ' </td>' +
                            '<td>' + (row.item != undefined ? row.item.name : '') + ' </td>' +
                            '<td>' + (row.dueDate != undefined ? moment(new Date(row.dueDate)).format("DD-MMM-YYYY") : '') + ' </td>' +
                            '<td>' + (row.price != undefined ? row.price : 0) + ' </td>' +
                            '<td>' + (row.address != undefined ? row.address : '') + ' </td>' +
                            '<td>' + (row.leadStatus != undefined ? formatLeadStatus(row.leadStatus): '') + ' </td>' +
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
                    
                }
            }
            if(data.data1){
                for (i = 0; i < data.data1.length; i++) {
                    var row = data.data1[i];
                    $('#tableData1').append(
                        //'<tr class="gradeX' + (i % 2 == 0 ? 'even' : 'odd') + ' role="row">' +
                        '<tr class="odd gradeX" '+ formatLeadRows(row.leadStatus) +'>'+
                            '<td><input type="checkbox" class="checkboxes" value="1" data-id="'+ row.id +'"/></td>' +
                            '<td>' + (row.createdOn != undefined ? moment(new Date(row.createdOn)).format("DD-MMM-YYYY") : '') + ' </td>' +
                            '<td>' + (row.leadId != undefined ? row.leadId: '') + ' </td>' +
                            '<td>' + (row.customer != undefined ? row.customer.name: '') + ' </td>' +
                            '<td>' + (row.customer != undefined ? row.customer.mobile: '') + ' </td>' +
                            '<td>' + (row.item != undefined ? row.item.name : '') + ' </td>' +
                            '<td>' + (row.dueDate != undefined ? moment(new Date(row.dueDate)).format("DD-MMM-YYYY") : '') + ' </td>' +
                            '<td>' + (row.price != undefined ? row.price : 0) + ' </td>' +
                            '<td>' + (row.address != undefined ? row.address : '') + ' </td>' +
                            '<td>' + (row.leadStatus != undefined ? formatLeadStatus(row.leadStatus): '') + ' </td>' +
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
                }

            }
            $('.checkboxes').change(function() {
                if($('.checkboxes:checked').length >= 1){
                    $('.btn-activate').removeClass('hidden');
                }
                else{
                    $('.btn-activate').addClass('hidden');
                } 
            });
           // initialize the table
           initializeTable();
        },
        error: function(data) {
            showAlertMessage('internaleServerError', data, 'danger', 'fa-warning fa-lg');
        }
    });
};

var initializeTable = function(){
    var table = $('.leads_list');
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

    var tableWrapper = jQuery('#leads_list_wrapper');

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
    App.unblockUI('#leads_portlet');
};

$().ready(function() {
   
    $('.filter-btn').on('click', function(){
        $('.table-filters').toggleClass("hide");
        $("#customerId").select2({allowClear: false});
    });

    getLeadsListData(buildUrl(getAPIUrl(),'vendors/leads', getToken(), 2000,$('#uname').val()));

    $('#filter-submit').on('click', function(event){
        var fromDate = toDate = null;
        event.preventDefault();

        filterLeadsListData(
            buildUrl(getAPIUrl(),'vendors/leads', getToken(), 2000,$('#uname').val()), 
            fromDate, toDate, 
            $('#customerId').val()
        );

    });

    initDateRange(buildUrl(getAPIUrl(),'vendors/leads', getToken(), 2000,$('#uname').val()));
});

$(document).on('show.bs.modal','#leadUpdateModal', function () {
  var data = null;
  $('.checkboxes:checked').each(function(){
        //var leadId = $(this).data('id');
        data = {
            id: $(this).data('id'),
            price:$(this).data('price')
        };
    });
  $('#leadId').val(data.id);
  $('#price').val(data.price);
  $('#mPrice').val(data.price);
});


$('#updatelead').on('click',function(event){
    var url = $('#apiUrl').val()+ '/api/lead/'+ $('#leadId').val() +'?token='+$('#token').val();
    var data = {
        leadStatus: $('#leadStatus').val(),
        price: parseInt($('#price').val()) || parseInt($('#mPrice').val())
    };

    $.ajax({
        url: url,
        type: 'PUT',
        data: JSON.stringify(data),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function(data) {
            if (data && data.result) {
               
                    window.location = '/admin/vendors/'+$('#uname').val()+'/leads';
            }
        },
        error: function(data) {
            showAlertMessage('internaleServerError', data, 'danger', 'fa-warning fa-lg');
            return false;
        }
    });
});
