var filterBlogsListData = function(url,fromDate, toDate,  name, mobile){
    //delete the table
    $("#blogs").remove();
    $("#blogs_wrapper").remove();
    var uuu = '/admin/blog/posts'
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
    initializeTable();
};

$("#tableData > tr > td.clickable").hover(function() {
    $(this).css('cursor','pointer');
}, function() {
    $(this).css('cursor','auto');
});

$('.checkboxes').change(function() {
    if($('.checkboxes:checked').length >= 1){
        $('.btn-action').removeClass('hidden');

        $('#smsMobile').val(number);
        $('#smsMessage').val(msg);
        var msg = $(this).data('service') + '\n' + $(this).data('name') + '\n' + $(this).data('mobile')  + '\n' + $(this).data('jdate') +'\n' + $(this).data('address')+'\n' + $(this).data('price');
        var number = parseInt($(this).data('empid'));
        
    }else{
        $('.btn-action').addClass('hidden');
    }
});
$('.checkboxes').change(function() {
    if($('.checkboxes:checked').length === 1){
        $('#edit').removeClass('hidden');
    }else{
        $('#edit').addClass('hidden');
    } 
});
var initializeTable = function(){
    var table = $('#blog');
   
    //var tableWrapper = jQuery('#customers_wrapper');

    table.find('.group-checkable').change(function () {
        
        var set = jQuery(this).attr("data-set");
        var checked = jQuery(this).is(":checked");
        jQuery(set).each(function () {
            if (checked) {
                $('.checkboxes').prop("checked", true);
            } else {
                $('.checkboxes').prop("checked", false);
            }
        });
        jQuery.uniform.update(set);
    });
    App.unblockUI('#blogs_portlet');
};
$('#delete').on('click',function(event){
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
            var url = $('#apiUrl').val()+ '/api/blog/'+ $(this).attr('data-id') +'?token='+$('#token').val();
            $.ajax({
                url: url,
                type: 'DELETE',
                success: function(data) {
                    if (data && data.status) {
                       i++;
                        if(i == count){
                            swal("Deleted!", "Item has been deleted successfully.", "success");
                            window.location = '/admin/blog/posts';
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


$('#edit').on('click',function(event){

   event.preventDefault();
    var checkboxValues = [];
    $('.checkboxes:checked').map(function() {
        checkboxValues.push($(this).data('id'));
    });
    if(checkboxValues.length === 1){
        var url = '/admin/blog/posts/'+  checkboxValues[0] + '/edit'
        window.location = url;
    }

});

$().ready(function() {
   
    $('.filter-btn').on('click', function(){
        $('.table-filters').toggleClass("hide");
        $("#customerId").select2({allowClear: false});
    });
    $('#searched').on('click', function(){
        var npath ='//admin/blog/posts';
       var psize = $("#psize").val();
       var pno = $('#pno').val();

        if($("#from").val() !="" && $("#to").val() !=""){
          npath =npath+'?q='+$('#query').val()+'&fromDate='+$("#from").val()+'&toDate='+$("#to").val()+'&pno='+ pno +'&psize='+ psize;
        }else{
         npath =npath+'?q='+$('#query').val()+'&pno='+ pno +'&psize='+ psize;
        }
        window.location = npath;
    });


    //filterVisitorData(buildUrl(getAPIUrl(),'blogs', getToken(), 5000));

    $('#filter-submit').on('click', function(event){
        var fromDate = toDate = null;
        event.preventDefault();

        filterBlogsListData(
            buildUrl(getAPIUrl(),'admin/blog/posts', getToken(), 5000), 
            fromDate, toDate, 
            $('#customerId').val()
        );

    });
    initDateRange(buildUrl(getAPIUrl(),'admin/blog/posts', getToken(), 5000));
    //filterVisitorData(buildUrl(getAPIUrl(),'blogs', getToken(), 5000));
});



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
         var npath ='/admin/blog/posts';
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