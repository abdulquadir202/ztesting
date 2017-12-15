var filterJobsData = function(url){
    //delete the table

    $("#jobs").remove();
    $("#jobs_wrapper").remove();
    //recreate the table
    $("#tDiv").append(
        '<table class="table table-striped table-bordered table-hover table-checkable order-column" id="jobs">'+
            '<thead>'+
                '<tr class="uppercase">'+
                    '<th class="table-checkbox">'+
                        '<input type="checkbox" class="group-checkable" data-set="#jobs .checkboxes" /> </th>'+
                    '<th> Job Title </th>'+
                    '<th> Experience </th>'+
                    '<th> Openings </th>'+ 
                    '<th> Updated On </th>'+
                    '<th> Last Date </th>'+  
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
    getJobsData(url);
};

var goToTestimonyDetail = function(testimonyId){
    window.location =  '/testimony/edit/' + testimonyId;
};

var getTestimonyData = function(url){
    App.blockUI({
        target: '#testimony_portlet',
        animate: true
    });
    $.ajax({
        url: url,
        type: 'GET',
        success: function(data) {
            if (data.data) {
                for (i = 0; i < data.data.length; i++) {
                    var row = data.data[i];
                    $('#tableData').append(
                        '<tr class="odd gradeX">'+
                            '<td><input type="checkbox" class="checkboxes" value="1" data-id="'+ row.id +'"/></td>' +
                            '<td class="clickable" onclick=goToTestimonyDetail("'+row.id +'")> ' + (row.name != undefined ? row.name: '') + ' </td>' +
                            '<td class="clickable" onclick=goToTestimonyDetail("'+row.id +'")> ' + (row.mobile != undefined ? row.mobile : '') + ' </td>' +
                            '<td class="clickable" onclick=goToTestimonyDetail("'+row.id +'")> ' + (row.items != undefined ? row.items.name : '') + '</td>' +
                            '<td class="clickable" onclick=goToTestimonyDetail("'+row.id +'")> ' + (row.ratings != undefined ? row.ratings : '') + '</td>' +
                            '<td class="clickable" onclick=goToTestimonyDetail("'+row.id +'")> ' + (row.status != undefined ? row.status : '') + '</td>' +
                            '<td class="clickable" onclick=goToTestimonyDetail("'+row.id +'")> ' + (row.message != undefined ? row.message : '') + '</td>' +
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
                        $('.btn-active').removeClass('hidden');
                    }else{
                        $('.btn-delete').addClass('hidden');
                        $('.btn-active').addClass('hidden');
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
    var table = $('#testimony');
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

    var tableWrapper = jQuery('#jobs_wrapper');

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
    App.unblockUI('#testimony_portlet');
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
            var url = $('#apiUrl').val()+ '/api/testimony/'+ $(this).attr('data-id') +'?token='+$('#token').val();
            $.ajax({
                url: url,
                type: 'DELETE',
                success: function(data) {
                    if (data && data.status) {
                       i++;
                        if(i == count){
                            swal("Deleted!", "Testimonies has been deleted successfully.", "success");
                            window.location = '/testimonies';
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

$('.btn-active').on('click',function(event){
    swal({
        title: "Are you sure to active this?",
        text: "You can deactivate this in edit",
        type: "info",
        showCancelButton: true,
        closeOnConfirm: false,
        showLoaderOnConfirm: true
    }, function () {
        var i=0, count = $('.checkboxes:checked').length;
        $('.checkboxes:checked').each(function(){
            //ids.push($(this).attr('data-id'));//this is the checked checkbox
            var url = $('#apiUrl').val()+ '/api/testimony/'+ $(this).attr('data-id') +'?token='+$('#token').val();
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
                    if (data && data.status) {
                       i++;
                        if(i == count){
                            swal("Active!", "Testimonies has been active successfully.", "success");
                            window.location = '/testimonies';
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
    $('.table-filters').toggleClass("hide");});
//     $("#customerId").select2({allowClear: false});
// });

getTestimonyData(buildUrl(getAPIUrl(),'testimonies', getToken(), 3000));

