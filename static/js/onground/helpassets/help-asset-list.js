var filterAssetListData = function(url, startDate, endDate, employeeId){
    //delete the table
    $("#asset_list").remove();
    $("#asset_list_wrapper").remove();
    //recreate the table
    $("#tDiv").append(
        '<table class="table table-striped table-bordered table-hover table-checkable order-column" id="asset_list">'+
            '<thead>'+
                '<tr class="uppercase">'+
                    '<th class="table-checkbox">'+
                        '<input type="checkbox" class="group-checkable" data-set="#asset_list .checkboxes" /> </th>'+
                        '<th> Asset Id </th>'+
                        '<th> Tag Id </th>'+
                        '<th> Type </th>'+
                        '<th> Allocated To </th>'+
                        '<th> Description </th>'+
                        '<th> Price </th>'+
                        '<th> Status </th>'+

                '</tr>'+
            '</thead>'+
            '<tbody id="tableData"></tbody>'+
        '</table>'
    );
    getassetListData(url);
};

var goToAsset = function(tokenId){
    window.location = '/asset/' + tokenId;
};

var getassetListData = function(url){
    
    App.blockUI({
        target: '#asset_portlet',
        animate: true
    });

    window.setTimeout(function() {
        App.unblockUI('#asset_portlet');
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
                            
                            '<td class="clickable" onclick=goToAsset("'+row.id +'")>' + (row.assetId != undefined ? row.assetId: '') + ' </td>' +
                            '<td class="clickable" onclick=goToAsset("'+row.id +'")>' + (row.tagId != undefined ? row.tagId: '') + ' </td>' +
                            '<td class="clickable" onclick=goToAsset("'+row.id +'")>' + (row.type != undefined ? row.type: '') + ' </td>' +
                            '<td class="clickable" onclick=goToAsset("'+row.id +'")>' + (row.customer != undefined ? row.customer.name: '') + ' </td>' +
                            '<td class="clickable" onclick=goToAsset("'+row.id +'")>' + (row.description != undefined ? row.description : '') + ' </td>' +
                            '<td class="clickable" onclick=goToAsset("'+row.id +'")>' + (row.price != undefined ? row.price : '') + ' </td>' +
                            '<td class="clickable" onclick=goToAsset("'+row.id +'")>' + (row.astatus != undefined ? row.astatus: '') + ' </td>' +
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
    var table = $('#asset_list');
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

    var tableWrapper = jQuery('#asset_list_wrapper');

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
    App.unblockUI('#asset_portlet');
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
            var url = $('#apiUrl').val()+ '/api/asset/'+ $(this).attr('data-id') +'?token='+$('#token').val();
            $.ajax({
                url: url,
                type: 'DELETE',
                success: function(data) {
                    if (data && data.status) {
                       i++;
                        if(i == count){
                            swal("Deleted!", "Asset has been deleted successfully.", "success");
                            window.location = '/asset';
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

getassetListData(buildUrl(getAPIUrl(),'assets', getToken(), 3000));

