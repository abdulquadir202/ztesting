var filterCarosalsData = function(url){
    //delete the table
    $("#carosals").remove();
    $("#carosals_wrapper").remove();
    //recreate the table
    $("#tDiv").append(
        '<table class="table table-bordered table-hover">'+
            '<thead>'+
                '<tr role="row" class="heading">'+
                    '<th width="10%"> Image </th>'+
                    '<th width="60%"> Text On Image </th>'+
                    '<th width="20%"> Sort Order </th>'+
                    '<th width="5%"> </th>'+
                    '<th width="5%"> </th>'+
                '</tr>'+
            '</thead>'+
            '<tbody id="tableData">'+
            '</tbody>'+
        '</table>'
    );

    

    // url = url + '&fromDate=' + fromDate.format('YYYY-MM-DD') + '&toDate=' + toDate.format('YYYY-MM-DD');
    // if(customerId != null && customerId!= -1){
    //     url = url + '&customerId=' + customerId;
    // }
    // if(modeType != null && modeType!= -1){
    //     url = url + '&modeType=' + modeType;
    // }
    getCarosalsData(url);
};

var goToCarosal = function(centerId){
    window.location = 'carosal/home/' + centerId;
};

var getCarosalsData = function(url){
    App.blockUI({
        target: '#carosals_portlet',
        animate: true
    });

    window.setTimeout(function() {
        App.unblockUI('#carosals_portlet');
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
                                
                        '<tr data-id="'+ row.id +'">'+
                            '<td>'+' <a href="'+(row.coverImage != undefined ? row.coverImage : "") + '" title="'+ row.text + '" class="fancybox-button" data-fancybox-group="fancybox-button">'+
                                       ' <img class="img-responsive" src='+(row.coverImage != undefined ? row.coverImage : '')+'></a></td>'+
                            '<td>'+
                                '<input type="text" class="form-control" data-text="'+ row.text +'" value="'+(row.text != undefined ? row.text : '')+'"> </td>'+
                            '<td>'+
                                '<input type="text" class="form-control" data-position="'+ row.position +'" value="'+(row.position != undefined ? row.position : '')+'"> </td>'+
                            '<td class="text-center">'+
                                '<a href="javascript:;" class="dt-button buttons-html5 btn blue btn-outline btn-save">'+
                                    '<i class="fa fa-save"></i> Save </a>'+
                            '</td>'+
                            '<td class="text-center">'+
                                '<a href="javascript:;" class="dt-button buttons-html5 btn red btn-outline btn-remove">'+
                                    '<i class="fa fa-times"></i> Remove </a>'+
                            '</td>'+
                        '</tr>'
                    );

                    $("#tableData > tr").hover(function() {
                        $(this).css('cursor','pointer');
                    }, function() {
                        $(this).css('cursor','auto');
                    });
                    $("a.fancybox-button").fancybox();
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
    var table = $('#centers');
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

    var tableWrapper = jQuery('#centers_wrapper');

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
    App.unblockUI('#carosals_portlet');
};

    
    $(document).ready(function() {
    
        $(document).on("click",".btn-save",function() {
            alert("clicked");
            alert($(this).attr('data-text'));
        });
    });    

getCarosalsData(buildUrl(getAPIUrl(),'home/carosals', getToken(), 3000));

$('#filter-submit').on('click', function(event){
var str = $('#reportrange span').html();
var dates = str.split(" - "); 

event.preventDefault();
});

initDateRange(null);