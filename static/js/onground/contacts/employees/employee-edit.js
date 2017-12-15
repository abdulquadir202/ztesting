var filterEmployeesListData = function(url, fromDate, toDate, customerId, type){
    //delete the table
    $("#employee_list").remove();
    $("#employee_list_wrapper").remove();
    //recreate the table
    $("#tDiv").append(
        '<table class="table table-striped table-bordered table-hover table-checkable order-column" id="employee_list">'+
            '<thead>'+
                '<tr class="uppercase">'+
                    '<th class="table-checkbox">'+
                        '<input type="checkbox" class="group-checkable" data-set="#employee_list .checkboxes" /> </th>'+
                    
                    '<th> EMP ID </th>'+
                    '<th> Name </th>'+
                    '<th> Mobile </th>'+
                    '<th> Joining Date </th>'+
                    '<th> Department </th>'+
                    '<th> Designation </th>'+
                    '<th> Job Type </th>'+
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
    
    getEmployeesListData(url);
};

var goToEmployees = function(employeeId){
    window.location = '/employee/' + employeeId;
};

var getEmployeesListData = function(url){
    App.blockUI({
        target: '#employee_portlet',
        animate: true
    });

    window.setTimeout(function() {
        App.unblockUI('#employee_portlet');
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
                        '<tr class="odd gradeX">'+ // onclick=goToEmployees("'+row.id +'")>'+
                            '<td><input type="checkbox" class="checkboxes" value="1" ' +
                            'data-id="'+row.id+'" data-name="Customer: '+(row.customer != undefined ? row.customer.name: '') +
                            '" data-mobile="Mobile: '+ (row.customer != undefined ? row.customer.mobile: '') +
                            '" data-empid="'+ (row.employee != undefined ? row.employee.mobile: '') +
                            '" data-price="Price: '+ (row.price != undefined ? row.price: 0) +
                            '" data-service="'+ (row.item != undefined ? row.item.name : '') +
                            '" data-jdate="Date: '+ (row.createdOn != undefined ? moment(new Date(row.dueDate)).format("DD-MMM-YYYY") : '') +
                            '" data-address="Address: '+ (row.address != undefined ? row.address : '') +'" /></td>' +
                            
                            '<td class="clickable" onclick=goToEmployees("'+row.id +'")>' + (row.empId != undefined ? row.empId: '') + ' </td>' +
                            '<td class="clickable" onclick=goToEmployees("'+row.id +'")>' + (row.name != undefined ? row.name: '') + ' </td>' +
                            '<td class="clickable" onclick=goToEmployees("'+row.id +'")>' + (row.mobile != undefined ? row.mobile: '') + ' </td>' +
                            '<td class="clickable" onclick=goToEmployees("'+row.id +'")>' + (row.startDate != undefined ? moment(new Date(row.startDate)).format("DD-MMM-YYYY") : '') + ' </td>' +
                            '<td class="clickable" onclick=goToEmployees("'+row.id +'")>' + (row.department != undefined ? row.department.name : '') + ' </td>' +
                            '<td class="clickable" onclick=goToEmployees("'+row.id +'")>' + (row.designation != undefined ? row.designation.name : '') + ' </td>' +
                            '<td class="clickable" onclick=goToEmployees("'+row.id +'")>' + (row.employmentType != undefined ? row.employmentType: '') + ' </td>' +
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
                            $('.btn-delete').removeClass('hidden');
                            
                        }else{
                            $('.btn-delete').addClass('hidden');
                        }
                    });

                    $('.checkboxes').change(function() {
                        if($('.checkboxes:checked').length == 1){
                            if(parseInt($('#inv').val()) >-1){
                                $('.btn-assign').removeClass('hidden');
                            } 
                        }else{
                            $('.btn-assign').addClass('hidden');
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
    var table = $('#employee_list');
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

    var tableWrapper = jQuery('#employee_list_wrapper');

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
    App.unblockUI('#employee_portlet');
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
            var url = $('#apiUrl').val()+ '/api/employee/'+ $(this).attr('data-id') +'?token='+$('#token').val();
            $.ajax({
                url: url,
                type: 'DELETE',
                success: function(data) {
                    if (data && data.status) {
                       i++;
                        if(i == count){
                            swal("Deleted!", "Item has been deleted successfully.", "success");
                            window.location = '/employee';
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

$('.btn-edit').on('click',function(event){
    var checkboxValues = [];
    $('.checkboxes:checked').map(function() {
        checkboxValues.push($(this).data('id'));
    });
    if(checkboxValues.length === 1){
        window.location = '/employee/'+  checkboxValues[0] + '/edit';
    }
});

$(document).on('show.bs.modal','#assignToModal', function () {
  var data = null;
  $('.checkboxes:checked').each(function(){
        var employeeId = $(this).data('id');
        data = {
            id: $(this).data('id'),
            productId: $(this).data('productId')
        };
    });
  $('#mEmpId').val(data.id);
  populateProducts(buildUrl($('#apiUrl').val(),'products', $('#token').val(), '30'),false, data.productId);
  $("#productId").select2({
      placeholder: "Select an product",
      width: "100%"
  });

});

$('#assignInvent').on('click',function(event){
    event.preventDefault();
    var url = $('#apiUrl').val()+ '/api/product/'+ $('#productId').val()+'/inventory?token='+  $('#token').val();
    var data = {
        productId: $('#productId').val(),
        quantity: parseInt($('#mQuantity').val()),
        employeeId: $('#mEmpId').val()
    };
    
    $.ajax({
        url: url,
        type: 'POST',
        data: JSON.stringify(data),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function(data) {
            toastr.options.closeButton = true;
            toastr.success("Lead confirmed successfully.");
            window.location = '/employee';

        },
        error: function(data) {
            showAlertMessage('internaleServerError', data, 'danger', 'fa-warning fa-lg');
            return false;
        }
    });
});



addEmpDepartment(buildUrl(getAPIUrl(),'department', getToken(), null),buildUrl(getAPIUrl(),'departments', getToken(), 3000));
addEmpDesignation(buildUrl(getAPIUrl(),'designation', getToken(), null),buildUrl(getAPIUrl(),'designations', getToken(), 3000));