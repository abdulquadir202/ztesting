var filterVisitorData = function(url,fromDate, toDate,  name, mobile){
    //delete the table
    $("#visitors").remove();
    $("#visitors_wrapper").remove();
    var uuu = '/visitors'
    if(fromDate != null){
        uuu = uuu + '?fromDate=' + fromDate;
    }
    if(toDate != null){
        uuu = uuu + '&toDate=' + toDate;
    }
    uuu = uuu + '&pno=' + $('#pno').val() + '&psize=' + $('#psize').val();
    if($('#option').val() !=''){
        uuu = uuu +'&q='+$('#option').val();
    }
    
    window.location = uuu;
};

var initializeTable = function(){
    var table = $('#visitors');
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

    var tableWrapper = jQuery('#visitors_wrapper');

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
    App.unblockUI('#visitors_portlet');
};

$().ready(function() {
   
    $('.filter-btn').on('click', function(){
        $('.table-filters').toggleClass("hide");
        $("#customerId").select2({allowClear: false});
    });
    $('#searched').on('click', function(){
        var npath ='/visitors';
       var psize = $("#psize").val();
       var pno = $('#pno').val();

        if($("#from").val() !="" && $("#to").val() !=""){
          npath =npath+'?q='+$('#query').val()+'&fromDate='+$("#from").val()+'&toDate='+$("#to").val()+'&pno='+ pno +'&psize='+ psize;
        }else{
         npath =npath+'?q='+$('#query').val()+'&pno='+ pno +'&psize='+ psize;
        }
        window.location = npath;
    });


    //filterVisitorData(buildUrl(getAPIUrl(),'leads', getToken(), 200));

    $('#filter-submit').on('click', function(event){
        var fromDate = toDate = null;
        event.preventDefault();

        filterVisitorData(
            buildUrl(getAPIUrl(),'visitors', getToken(), 200), 
            fromDate, toDate, 
            $('#customerId').val()
        );

    });
    initDateRange(buildUrl(getAPIUrl(),'visitors', getToken(), 200));
    //filterVisitorData(buildUrl(getAPIUrl(),'leads', getToken(), 200));
});


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
            var url = getAPIUrl() + '/api/visitor/'+ $(this).attr('data-id') +'?token='+ getToken();
            $.ajax({
                url: url,
                type: 'DELETE',
                success: function(data) {
                    if (data && data.status) {
                       i++;
                        if(i == count){
                            swal("Deleted!", "Item has been deleted successfully.", "success");
                            window.location = '/visitors';
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
initDateRange(null);

$(document).ready(function() {
  $('.pagination').pagination({
      items: $('#total').val(),
      itemsOnPage: $('#psize').val(),
      currentPage: $('#pno').val(),
      cssStyle: 'light-theme',
      onPageClick: function(pageNumber){
          //var sortby = $j("#sortby").val();
          //alert(pageNumber);
          var psize = $("#psize").val();
          var pno = pageNumber;
          var path = window.location.pathname;
         // window.location.href; // Returns full URL
         var npath ='/visitors';
         if($("#from").val() !="" && $("#to").val() !=""){
             npath =npath+'?fromDate='+$("#from").val()+'&toDate='+$("#to").val()+'&pno='+ pageNumber +'&psize='+ psize;
         }else{
             npath =npath+'?pno='+ pageNumber +'&psize='+ psize;
            }
            if($('#option').val() !=''){
                npath = npath +'&q='+$('#option').val();
            }
          window.location = npath;
        }
    });
  $('.checkboxes').change(function() {
        if($('.checkboxes:checked').length >= 1){
            $('.btn-delete').removeClass('hidden');
        }else{
            $('.btn-delete').addClass('hidden');
        }
    });

  $("#tableData > tr > td.clickable").hover(function() {
            $(this).css('cursor','pointer');
        }, function() {
            $(this).css('cursor','auto');
    });

  if($('#psize').val()==25){
    $('.page-size').html('25');

  }else if($('#psize').val()==50){
    $('.page-size').html('50');

  }else if($('#psize').val()==100){
     $('.page-size').html('100');

  }else{
    $('.page-size').html('10');
  }
});