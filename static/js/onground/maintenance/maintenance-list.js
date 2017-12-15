var filterMaintenanceListData = function(url, startDate, endDate, employeeId){
    //delete the table
    $("#maintenance_list").remove();
    $("#maintenance_list_wrapper").remove();
    //recreate the table
    $("#tDiv").append(
        '<table class="table table-striped table-bordered table-hover table-checkable order-column" id="maintenance_list">'+
            '<thead>'+
                '<tr class="uppercase">'+
                    '<th class="table-checkbox">'+
                        '<input type="checkbox" class="group-checkable" data-set="#maintenance_list .checkboxes" /> </th>'+
                        '<th> Asset Id </th>'+
                        '<th> Type </th>'+
                        '<th> Date </th>'+
                        '<th> Service </th>'+
                        '<th> Engineer </th>'+
                        '<th> Description </th>'+
                        '<th> Status </th>'+

                '</tr>'+
            '</thead>'+
            '<tbody id="tableData"></tbody>'+
        '</table>'
    );
    getmaintenanceListData(url);
};

var goToMaintenance = function(tokenId){
    window.location = '/maintenance/' + tokenId;
};

var getmaintenanceListData = function(url){
    
    App.blockUI({
        target: '#maintenance_portlet',
        animate: true
    });

    window.setTimeout(function() {
        App.unblockUI('#maintenance_portlet');
    }, 500);
    $.ajax({
        url: url,
        type: 'GET',
        success: function(data) {
            if (data.data) {
                for (i = 0; i < data.data.length; i++) {
                    var row = data.data[i];
                    //alert(JSON.stringify(row));
                    $('#tableData').append(
                        //'<tr class="gradeX' + (i % 2 == 0 ? 'even' : 'odd') + ' role="row">' +
                        '<tr class="odd gradeX">'+ // onclick=goToEmployees("'+row.id +'")>'+
                            '<td><input type="checkbox" class="checkboxes" value="1" ' +
                            'data-id="'+row.id +'"/></td>' +
                            
                            '<td class="clickable" onclick=goToMaintenance("'+row.id +'")>' + (row.asset != undefined ? row.asset.assetId: '') + ' </td>' +
                            '<td class="clickable" onclick=goToMaintenance("'+row.id +'")>' + (row.type != undefined ? row.type: '') + ' </td>' +
                            '<td class="clickable" onclick=goToMaintenance("'+row.id +'")>' + (row.dueDate != undefined ? moment(new Date(row.dueDate)).format("DD-MMM-YYYY") : '') + ' </td>' +
                            '<td class="clickable" onclick=goToMaintenance("'+row.id +'")>' + (row.item != undefined ? row.item.name: '') + ' </td>' +
                            '<td class="clickable" onclick=goToMaintenance("'+row.id +'")>' + (row.employee != undefined ? row.employee.name : '') + ' </td>' +
                            '<td class="clickable" onclick=goToMaintenance("'+row.id +'")>' + (row.description != undefined ? row.description : '') + ' </td>' +
                            '<td class="clickable" onclick=goToMaintenance("'+row.id +'")>' + (row.mstatus != undefined ? row.mstatus: '') + ' </td>' + 
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

    var tableWrapper = jQuery('#maintenance_list_wrapper');

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
    App.unblockUI('#maintenance_portlet');
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
            var url = $('#apiUrl').val()+ '/api/maintenance/'+ $(this).attr('data-id') +'?token='+$('#token').val();
            $.ajax({
                url: url,
                type: 'DELETE',
                success: function(data) {
                    if (data && data.status) {
                       i++;
                        if(i == count){
                            swal("Deleted!", "Maintenance has been deleted successfully.", "success");
                            window.location = '/maintenance';
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
getmaintenanceListData(buildUrl(getAPIUrl(),'maintenances', getToken(), 3000));
$('#dueDate').val(moment().format('DD-MM-YYYY'));