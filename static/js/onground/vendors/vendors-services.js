var filterItemData = function(url, name, mobile){
    //delete the table
    $(".items").remove();
    $(".items_wrapper").remove();
    //recreate the table
    $(".tDiv").append(
        '<table class="table table-striped table-bordered table-hover table-checkable order-column items">'+
            '<thead>'+
                '<tr class="uppercase">'+
                    '<th max-width: 100%;padding-left: 5;padding-right: 5;"> Name </th>'+
                    '<th> Category </th>'+
                    '<th> Type </th>'+
                    '<th> Unit </th>'+
                    '<th> Price </th>'+
                     '<th> Status </th>'+
                '</tr>'+
            '</thead>'+
            '<tbody id="tableData"></tbody>'+
        '</table>'
    );

    // url = url + '&fromDate=' + fromDate.format('YYYY-MM-DD') + '&toDate=' + toDate.format('YYYY-MM-DD');
    // if(itemId != null && itemId!= -1){
    //     url = url + '&itemId=' + itemId;
    // }
    // if(modeType != null && modeType!= -1){
    //     url = url + '&modeType=' + modeType;
    // }
    getItemData(url);
};


var getItemData = function(url){
    // App.blockUI({
    //     target: '#items_portlet',
    //     animate: true
    // });

    // window.setTimeout(function() {
    //     App.unblockUI('#items_portlet');
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
                            '<td style="max-width: 100%;padding-left: 5;padding-right: 5;">' + (row.name != undefined ? row.name: '') + ' </td>' +
                            '<td> ' + (row.category != undefined ? row.category.name: '') + ' </td>' +
                            '<td> ' + formatItemTypes(row.type) + ' </td>' +
                            '<td> ' + (row.unit != undefined ? row.unit: '') + ' </td>' +
                            '<td> ' + (row.price != undefined ? row.price: '') + ' </td>' +
                             '<td> ' + (row.status != undefined ? row.status: '') + ' </td>' +
                        '</tr>'
                    );
                }
            }
            if (data.data1) {
                for (i = 0; i < data.data1.length; i++) {
                    var row = data.data1[i];
                    $('#tableData1').append(
                        //'<tr class="gradeX' + (i % 2 == 0 ? 'even' : 'odd') + ' role="row">' +
                        '<tr class="odd gradeX">'+
                            '<td style="max-width: 100%;padding-left: 5;padding-right: 5;">' + (row.name != undefined ? row.name: '') + ' </td>' +
                            '<td> ' + (row.category != undefined ? row.category.name: '') + ' </td>' +
                            '<td> ' + formatItemTypes(row.type) + ' </td>' +
                            '<td> ' + (row.unit != undefined ? row.unit: '') + ' </td>' +
                            '<td> ' + (row.price != undefined ? row.price: '') + ' </td>' +
                             '<td> ' + (row.status != undefined ? row.status: '') + ' </td>' +
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
    var table = $('.items');
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

    var tableWrapper = jQuery('#items_wrapper');

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
    //App.unblockUI('#items_portlet');
    App.unblockUI();
};


getItemData(buildUrl(getAPIUrl(),'vendors/items', getToken(), 3000,$('#uname').val()));

$('#filter-submit').on('click', function(event){
    var str = $('#reportrange span').html();
    var dates = str.split(" - "); 
    var fromDate = moment(dates[0], "MMMM D, YYYY");
    var toDate = moment(dates[1], "MMMM D, YYYY");

    event.preventDefault();

    filterItemData(buildUrl(getAPIUrl(),'vendors/items', getToken(), 3000,$('#uname').val()), $('#name').val(), $('#mobile').val());
});

initDateRange(null);

$(document).on('show.bs.modal','#addserviceModal', function () {
  //alert('hi');
  var data = null;
  var apiUrl = 'https://api.zinetgo.com/api/items/?apikey=1a5ee5ba-08fe-4597-871a-b497b35b1423&psize=200';
  $.ajax({
        url: apiUrl,
        type: 'GET',
        success: function(data) {
            if (data.data) {
                $('#itemId').html('Select a service');
                for (i = 0; i < data.data.length; i++) {
                    var row = data.data[i];
                    $('#itemId').append('<option value="' + row.id +'"data-name="'+ row.name +'">' + row.name + '</option>');
                }
                $("#itemId").select2({
                  placeholder: "Select a service"
                });
            }
        },
        error: function(data) {
            toastr.options.closeButton = true;
            toastr.error("Something went wrong. Please try again with all the fields.");
        }
    });

});


 $('#addservice').on('click', function(event){
    var data = {
        mpServiceId: $('#itemId').val(),
        description: $('#description').val(),
        name: $('#itemId option:selected').text()
    }
    var url = $('#apiUrl').val()+ '/api/item/'+ $('#uname').val() +'?token='+$('#token').val();
    $.ajax({
        url: url,
        type: 'POST',
        dataType: "json",
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        success: function(data) {
            //showAlertMessage('successMessage','leads added successfuly. You can view the leads details in <a href="/leadss"><i class="icon-basket-loaded"></i> leadss</a>.','success','fa-check fa-lg');
            window.location.replace("/admin/vendors/"+$('#uname').val()+"/services");
        },
        error: function(data) {
            showAlertMessage('internaleServerError', data, 'danger', 'fa-warning fa-lg');
        }
    });
 });
