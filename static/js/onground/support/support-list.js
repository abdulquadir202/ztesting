var filterSupportListData = function(url, startDate, endDate, employeeId){
    //delete the table
    $("#support_list").remove();
    $("#support_list_wrapper").remove();
    //recreate the table
    $("#tDiv").append(
        '<table class="table table-striped table-bordered table-hover table-checkable order-column" id="support_list">'+
            '<thead>'+
                '<tr class="uppercase">'+
                    '<th class="table-checkbox">'+
                        '<input type="checkbox" class="group-checkable" data-set="#support_list .checkboxes" /> </th>'+
                        '<th> Ticket Id </th>'+
                        '<th> Title </th>'+
                        '<th> Customer Name </th>'+
                        '<th> Service Name </th>'+
                        '<th> Due Date </th>'+
                        '<th> Assign To </th>'+
                        '<th> Priority </th>'+
                        '<th> Status </th>'+

                '</tr>'+
            '</thead>'+
            '<tbody id="tableData"></tbody>'+
        '</table>'
    );

    url = url + '&startDate=' + startDate.format('YYYY-MM-DD') + '&endDate=' + endDate.format('YYYY-MM-DD');
    if(employeeId != null && employeeId!= -1){
        url = url + '&employeeId=' + employeeId;
    }
    getSupportListData(url);
};
var goToSupports = function(tokenId){
    window.location = '/support/ticket/' + tokenId;
};
var getSupportListData = function(url){
    App.blockUI({
        target: '#support_portlet',
        animate: true
    });

    window.setTimeout(function() {
        App.unblockUI('#support_portlet');
    }, 500);
    $.ajax({
        url: url,
        type: 'GET',
        success: function(data) {
           // alert(JSON.stringify(data));
            if (data.data) {
                for (i = 0; i < data.data.length; i++) {
                    var row = data.data[i];
                    $('#tableData').append(
                        //'<tr class="gradeX' + (i % 2 == 0 ? 'even' : 'odd') + ' role="row">' +
                        '<tr class="odd gradeX">'+
                            '<td><input type="checkbox" class="checkboxes" value="1" ' +
                            'data-id="'+row.id+ '" /></td>' +
                            //'<td><input type="checkbox" class="checkboxes" value="1" /></td>' + 'data-id="'+row.id+
                            '<td> ' + (row.tokenId != undefined ? row.tokenId: '') + ' </td>' +
                            '<td class="clickable" onclick=goToSupports("'+row.id +'")>' + (row.title != undefined ? row.title: '') + ' </td>' +
                            '<td> ' + (row.customer != undefined ? row.customer.name: '') + ' </td>' +
                            '<td> ' + (row.item != undefined ? row.item.name: '') + ' </td>' +
                            '<td> ' + (row.dueDate != undefined ? row.dueDate: '') + ' </td>' +
                            '<td> ' + (row.employee != undefined ? row.employee.name: '') + ' </td>' +
                            '<td> ' + (row.priority != undefined ? row.priority: '') + ' </td>' +
                            '<td> ' + (row.iStatus != undefined ? row.iStatus: '') + ' </td>' +
                        '</tr>'
                    );

                    $("#tableData > tr > td.clickable").hover(function() {
                        $(this).css('cursor','pointer');
                    }, function() {
                        $(this).css('cursor','auto');
                    });

                    $('.checkboxes').change(function() {
                        if($('.checkboxes:checked').length >= 1){
                            $('.btn-delete').removeClass('hidden');
                            $('.btn-assign-ticket').removeClass('hidden');
                            $('.btn-close-ticket').removeClass('hidden');
                            $('.btn-send-sms').removeClass('hidden');
                           // $('.btn-cancel').removeClass('hidden');
                            $('#smsMobile').val(number);
                            $('#smsMessage').val(msg);
                            var msg = $(this).data('service') + '\n' + $(this).data('name') + '\n' + $(this).data('mobile')  + '\n' + $(this).data('jdate') +'\n' + $(this).data('address')+'\n' + $(this).data('price');
                            var number = parseInt($(this).data('empid'));
                            
                        }else{
                            $('.btn-delete').addClass('hidden');
                            $('.btn-send-sms').addClass('hidden');
                            $('.btn-cancel').addClass('hidden');
                            $('.btn-assign-ticket').addClass('hidden');
                            $('.btn-close-ticket').addClass('hidden')
                        }
                    });
                }

                $('.checkboxes').change(function() {
                    if($('.checkboxes:checked').length === 1){
                        $('.btn-close-ticket').removeClass('hidden');
                        $('.btn-assign-ticket').removeClass('hidden');
                        if($(this).data('status') === 'OPEN'){
                            $('.btn-assign-ticket').removeClass('hidden');
                        }
                    }else{
                       // $('.btn-edit').addClass('hidden');
                        $('.btn-confirm').addClass('hidden');
                         $('.btn-inventory').addClass('hidden');
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
    var table = $('#support_list');
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

    var tableWrapper = jQuery('#support_list_wrapper');

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
    App.unblockUI('#support_portlet');
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
            var url = $('#apiUrl').val()+ '/api/support/issuse/'+ $(this).attr('data-id') +'?token='+$('#token').val();
            $.ajax({
                url: url,
                type: 'DELETE',
                success: function(data) {
                    if (data && data.status) {
                       i++;
                        if(i == count){
                            swal("Deleted!", "Item has been deleted successfully.", "success");
                            window.location = '/support/tickets';
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

$('.btn-close-ticket').on('click',function(event){
    var i=0, count = $('.checkboxes:checked').length;
    $('.checkboxes:checked').each(function(){
        var url = $('#apiUrl').val()+ '/api/support/issuse/'+ $(this).attr('data-id') +'?token='+$('#token').val();
        var data = {
            iStatus: 'closed'
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
                        window.location = '/support/tickets';
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

$('#assignTicket').on('click',function(event){
    event.preventDefault();
    var url = $('#apiUrl').val()+ '/api/support/issuse/'+ $('#tokenId').val()+'?token='+ $('#token').val();
    var data = {
        employeeId: $('#employeeId').val()
    };

    //alert(JSON.stringify(data));

    $.ajax({
        url: url,
        type: 'PUT',
        data: JSON.stringify(data),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function(data) {
            toastr.options.closeButton = true;
            toastr.success("Ticket assigned successfully");
            window.location = '/support/tickets';

        },
        error: function(data) {
            showAlertMessage('internaleServerError', data, 'danger', 'fa-warning fa-lg');
            return false;
        }
    });
});


$(document).on('show.bs.modal','#assignTicketModal', function () {
  var data = null;
  $('.checkboxes:checked').each(function(){
        //var tokenId = $(this).data('id');
        data = {
            id: $(this).data('id'),
            //productId: $(this).data('productId'),
            //employeeId:$(this).data('eid')
        };
    });

  $('#tokenId').val(data.id);
  //alert($('#tokenId').val());
  populateEmployees(buildUrl($('#apiUrl').val(),'employees', $('#token').val(), '30'),false, data.empid);
  $("#employeeId").select2({
      placeholder: "Select an employee",
      width: "100%"
  });

});

$(".btn-send-sms").on('click', function(event) {
    var i=0, count = $('.checkboxes:checked').length;
    $('.checkboxes:checked').each(function(){
       // var leadId = $(this).data('id');
        var data = {
            mobile: $(this).data('empid'),
            message: $(this).data('service') 
            + '\nCustomer: ' + $(this).data('name') 
            + '\nMobile: ' + $(this).data('mobile')  
            + '\nDate: ' + $(this).data('jdate') 
            + '\nAddress: ' + $(this).data('address')
            + '\nPrice: ' + $(this).data('price')
        };
        var url = $('#apiUrl').val()+ '/api/bulksms?token='+$('#token').val();
    
        if(data && data.mobile){
            $.ajax({
                url: url,
                type: 'POST',
                dataType: "json",
                data: JSON.stringify(data),
                contentType: "application/json; charset=utf-8",
                success: function(data) {
                    if(i++ === count){
                        toastr.options.closeButton = true;
                        toastr.success("Your message submitted successfully.");
                    }
                },
                error: function(data) {
                    if(i++ === count){
                        toastr.options.closeButton = true;
                        toastr.error("Something went wrong. Please try again with all the fields.");
                    }
                }
            });
            event.preventDefault();
        }else{
            toastr.error("No employee assigned to the Ticket "+ ticketId);
        }
    });
    
});
getSupportListData(buildUrl(getAPIUrl(),'support/tickets', getToken(), 3000));
     $('#dueDate').val(moment().format('DD-MM-YYYY'));