var filterproductData = function(url){
    //delete the table
    $("#shoppe").remove();
    $("#shoppe_wrapper").remove();
    //recreate the table
    $("#tDiv").append(
        '<table class="table table-striped table-bordered table-hover table-checkable order-column" id="shoppe">'+
            '<thead>'+
                '<tr class="uppercase">'+
                    '<th class="table-checkbox">'+
                        '<input type="checkbox" class="group-checkable" data-set="#activities .checkboxes" /> </th>'+
                    '<th> Name </th>'+
                    '<th> Activity Type </th>'+
                    '<th> Description </th>'+
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
    getproductData(url);
};

var goToActivityDetail = function(productId){
    window.location = '/products/catalog/' + productId;
};

var getproductData = function(url){
    App.blockUI({
        target: '#shoppe_portlet',
        animate: true
    });

    window.setTimeout(function() {
        App.unblockUI('#shoppe_portlet');
    }, 500);
    $.ajax({
        url: url,
        type: 'GET',
        success: function(data) {
            if (data.data) {
                for (i = 0; i < data.data.length; i++) {
                    var row = data.data[i];
                   if(parseInt($('#inv').val()) >-1) {
                        $('#tableData').append(
                            '<tr class="odd gradeX">'+
                                '<td><input type="checkbox" class="checkboxes" value="1" data-id="'+ row.id +
                                '" data-uname="'+ (row.uName != undefined ? row.uName: '')+'" /></td>' +
                                '<td class="clickable" onclick=goToActivityDetail("'+row.uName +'")> ' + (row.name != undefined ? row.name: '') + ' </td>' +
                                '<td class="clickable" onclick=goToActivityDetail("'+row.uName +'")> ' + (row.brandName != undefined ? row.brandName : '') + ' </td>' +
                                '<td> ' + (row.category != undefined ? row.category.name : '') + '</td>' +
                                '<td> ' + (row.price != undefined ? row.price : '') + '</td>' +
                                '<td> ' + (row.stock != undefined ? row.stock : '0') + ' </td>' +
                                '<td> ' + (row.inHouseStock != undefined ? row.inHouseStock : '0') + ' </td>' +
                                '<td> ' + (row.employeeStock != undefined ? row.employeeStock : '0') + ' </td>' +
                            '</tr>'
                        );
                    } else {
                        $('#tableData').append(
                            '<tr class="odd gradeX">'+
                                '<td><input type="checkbox" class="checkboxes" value="1" data-id="'+ row.id +'"/></td>' +
                                '<td class="clickable" onclick=goToActivityDetail("'+row.uName +'")> ' + (row.name != undefined ? row.name: '') + ' </td>' +
                                '<td class="clickable" onclick=goToActivityDetail("'+row.uName +'")> ' + (row.brandName != undefined ? row.brandName : '') + ' </td>' +
                                '<td> ' + (row.category != undefined ? row.category.name : '') + '</td>' +
                                '<td> ' + (row.price != undefined ? row.price : '') + '</td>' +
                                '<td> ' + (row.stock != undefined ? row.stock : '0') + ' </td>' +
                            '</tr>'
                        );
                    }
                }
                $("#tableData > tr > td.clickable").hover(function() {
                    $(this).css('cursor','pointer');
                }, function() {
                    $(this).css('cursor','auto');
                });


                $('.checkboxes').change(function() {
                    if($('.checkboxes:checked').length >= 1){
                        $('.btn-delete').removeClass('hidden');
                        if(parseInt($('#inv').val()) >-1 && $('.checkboxes:checked').length === 1){
                            $('.btn-stock').removeClass('hidden');
                            $('.btn-product').removeClass('hidden');
                        }
                    }else{
                        $('.btn-delete').addClass('hidden');
                        $('.btn-product').addClass('hidden');
                        $('.btn-stock').addClass('hidden');
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
    var table = $('#shoppe');
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

    var tableWrapper = jQuery('#shoppe_wrapper');

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
    App.unblockUI('#shoppe_portlet');
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
            var url = $('#apiUrl').val()+ '/api/product/'+ $(this).attr('data-id') +'?token='+$('#token').val();
            $.ajax({
                url: url,
                type: 'DELETE',
                success: function(data) {
                    if (data && data.status) {
                       i++;
                        if(i == count){
                            swal("Deleted!", "Item has been deleted successfully.", "success");
                            window.location = '/products/catalog';
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


$(document).on('show.bs.modal','#assignProModal', function () {
  var data = null;
  $('.checkboxes:checked').each(function(){
        var productId = $(this).data('id');
        data = {
            id: $(this).data('id')
        };
    });
$('#productId').val(data.id);
  populateEmployees(buildUrl($('#apiUrl').val(),'employees', $('#token').val(), '30'),false, data.empid);
  $("#employeeId").select2({
      placeholder: "Select an employee",
      width: "100%"
  });

});


$(document).on('show.bs.modal','#assignStockModal', function () {
  $('.checkboxes:checked').each(function(){
        var productId = $(this).data('uname');
        $('#prdId').val(productId);
    });
});


$('#addStock').on('click',function(event){
    event.preventDefault();
    var url = $('#apiUrl').val()+ '/api/product/'+$('#prdId').val()+'?token='+  $('#token').val();
    var data = {
        updatedStock: parseInt($('#sQuantity').val())
    };
    $.ajax({
        url: url,
        type: 'PUT',
        data: JSON.stringify(data),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function(data) {
            toastr.options.closeButton = true;
            toastr.success("Inventory updated");
            window.location = '/products/catalog';
        },
        error: function(data) {
            showAlertMessage('internaleServerError', data, 'danger', 'fa-warning fa-lg');
            return false;
        }
    });
});


$('#assignInvent').on('click',function(event){
    event.preventDefault();
    var url = $('#apiUrl').val()+ '/api/product/'+ $('#productId').val()+'/inventory?token='+  $('#token').val();
    var data = {
        productId: $('#productId').val(),
        quantity: parseInt($('#mQuantity').val()),
        employeeId: $('#employeeId').val()
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
            window.location = '/products/catalog';

        },
        error: function(data) {
            showAlertMessage('internaleServerError', data, 'danger', 'fa-warning fa-lg');
            return false;
        }
    });
});



getproductData(buildUrl(getAPIUrl(),'products', getToken(), 3000));

$('#filter-submit').on('click', function(event){
    var str = $('#reportrange span').html();
    var dates = str.split(" - "); 
    // var fromDate = moment(dates[0], "MMMM D, YYYY");
    // var toDate = moment(dates[1], "MMMM D, YYYY");

    event.preventDefault();
    initDateRange(null);

    // filterCustomerData(buildUrl(getAPIUrl(),'inspections', getToken(), 3000), $('#name').val(), $('#mobile').val());

});

