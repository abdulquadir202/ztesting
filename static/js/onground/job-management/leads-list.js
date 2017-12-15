var filterLeadsListData = function(url,fromDate, toDate,  name, mobile){
    //delete the table
    $("#leads").remove();
    $("#leads_wrapper").remove();
    var uuu = '/leads'
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
        $('#task').removeClass('hidden');
        $('#payment').removeClass('hidden');
        $('#invoice').removeClass('hidden');
        if($('#role').val()>0){
            $('#transfer').removeClass('hidden');
             $('#payment').removeClass('hidden');
        }
        $('#confirm').removeClass('hidden');
        if($(this).data('status') === 'CONVERTED'){
            $('#feedback').removeClass('hidden');
            $('#inventory').removeClass('hidden');
        }else{
            $('#quote').removeClass('hidden');
        }
    }else{

        $('#invoice').addClass('hidden');
        $('#task').addClass('hidden');
        $('#payment').addClass('hidden');
        $('#feedback').addClass('hidden');
        $('#edit').addClass('hidden');
        $('#confirm').addClass('hidden');
        $('#inventory').addClass('hidden');
        $('#quote').addClass('hidden');
        $('#transfer').addClass('hidden');
    } 
});
var initializeTable = function(){
    var table = $('#lead');
   
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
    App.unblockUI('#leads_portlet');
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
            var url = $('#apiUrl').val()+ '/api/lead/'+ $(this).attr('data-id') +'?token='+$('#token').val();
            $.ajax({
                url: url,
                type: 'DELETE',
                success: function(data) {
                    if (data && data.status) {
                       i++;
                        if(i == count){
                            swal("Deleted!", "Item has been deleted successfully.", "success");
                            window.location = '/leads';
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

$('#cancel').on('click',function(event){
    var i=0, count = $('.checkboxes:checked').length;
    $('.checkboxes:checked').each(function(){
        var url = $('#apiUrl').val()+ '/api/lead/'+ $(this).attr('data-id') +'?token='+$('#token').val();
        var data = {
            leadStatus: 'CANCELLED'
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
                        window.location = '/leads';
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

$('#complete').on('click',function(event){
    var i=0, count = $('.checkboxes:checked').length;
    $('.checkboxes:checked').each(function(){
        var url = $('#apiUrl').val()+ '/api/lead/'+ $(this).attr('data-id') +'?token='+$('#token').val();
        var data = {
            leadStatus: 'COMPLETED'
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
                        window.location = '/leads';
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

$('#edit').on('click',function(event){

   event.preventDefault();
    var checkboxValues = [];
    $('.checkboxes:checked').map(function() {
        checkboxValues.push($(this).data('id'));
    });
    if(checkboxValues.length === 1){
        var url = '/leads/'+  checkboxValues[0] + '/edit'
        window.location = url;
    }

});


$('#quote').on('click',function(event){
    $('.checkboxes:checked').each(function(){

        var url = '/quotation-add/'+$(this).attr("data-truLead")+'/'+$(this).attr('data-service');
        window.location = url;
    });
});

$('#invoice').on('click',function(event){
    $('.checkboxes:checked').each(function(){
        var url = '/invoice/'+$(this).attr("data-truLead")+'/'+$(this).attr('data-service');
        window.location = url;
    });
});

$("#sendSms").on('click', function(event) {
    var i=0, count = $('.checkboxes:checked').length;
    $('.checkboxes:checked').each(function(){
        var leadId = $(this).data('id');
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
            toastr.error("No employee assigned to the lead "+ leadId);
        }
    });
});


$('#payment').on('click',function(event){
    event.preventDefault();
    var checkboxValues = [];
    $('.checkboxes:checked').map(function() {
        checkboxValues.push($(this).data('id'));
    });
    if(checkboxValues.length === 1){
        var url = $('#apiUrl').val()+'/api/lead/'+  checkboxValues[0] + '/pay?token='+$('#token').val();
        $.ajax({
            url: url,
            type: 'GET',
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function(data) {
                toastr.options.closeButton = true;
                toastr.success("Payment link send to the customer");
                window.location = '/leads';
            },
            error: function(data) {
                showAlertMessage('internaleServerError', data, 'danger', 'fa-warning fa-lg');
                return false;
            }
        });
    }
});

$('#feedback').on('click',function(event){
    $('.checkboxes:checked').each(function(){
            $('#customerName').html($(this).attr("data-customerName"));
            $('#customerNo').html($(this).attr("data-custmobile"));
            $('#customerAddress').html($(this).attr("data-address"));
            $('#customerService').html($(this).attr("data-service"));
            $('#price').html($(this).attr("data-price"));
            $('#jDate').html($(this).attr("data-jdate").slice(0,11));
    });
});

$(document).on('show.bs.modal','#leadConfirmModal', function () {
  //alert('hi');
  var data = null;
  $('.checkboxes:checked').each(function(){
        var leadId = $(this).data('id');
        data = {
            id: $(this).data('id'),
            dd: $(this).data('jdate'),
            empid: $(this).data('eid'),
            price: parseInt($(this).data('price'))
        };
    });
 
  $('#mDueDate').val(data.dd);
  $('#mLeadId').val(data.id);
  $('#mPrice').val(data.price);
  populateEmployees(buildUrl($('#apiUrl').val(),'employees', $('#token').val(), '30'),false, data.empid);
  $("#employeeId").select2({
      placeholder: "Select an employee",
      width: "100%"
  });

});



$('#leadConfirm').on('click',function(event){
    event.preventDefault();
    var url = $('#apiUrl').val()+ '/api/lead/'+ $('#mLeadId').val() +'?token='+$('#token').val();
    var data = {
        leadStatus: 'CONVERTED',
        price: parseInt($('#mPrice').val()),
        dueDate: getDate($('#mDueDate').val()),
        employeeId: $('#employeeId').val()
    };


    $.ajax({
        url: url,
        type: 'PUT',
        data: JSON.stringify(data),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function(data) {
            toastr.options.closeButton = true;
            if($("#sendSmS").is(':checked')){
                $.ajax({
                    url: $('#apiUrl').val()+ '/api/send-sms-customer/'+data.result.id +'?token='+$('#token').val(),
                    type: 'POST',
                    data: {},
                    dataType: "json",
                    contentType: "application/json; charset=utf-8",
                    success: function(data) {
                        toastr.success("Lead confirmed and SMS send successfully.");
                        window.location = '/leads';  
                    },
                    error: function(data) {
                        showAlertMessage('internaleServerError', data, 'danger', 'fa-warning fa-lg');
                        return false;
                    }
                });
                
            }else{
                toastr.success("Lead confirmed successfully.");
                window.location = '/leads';    
                
            }  
            

        },
        error: function(data) {
            showAlertMessage('internaleServerError', data, 'danger', 'fa-warning fa-lg');
            return false;
        }
    });
});


$(document).on('show.bs.modal','#leadAssignModal', function () {
  var data = null;
  $('.checkboxes:checked').each(function(){
        var leadId = $(this).data('id');
        data = {
            id: $(this).data('id'),
            dd: $(this).data('jdate'),
            portId: $(this).data('pid'),
            aItemId: $(this).data('aId'),
            cName: $(this).attr("data-customerName"),
            cMob: $(this).data('custmobile'),
            cEmail:$(this).attr("data-custEmail"),
            tLead:$(this).attr("data-truLead"),
            address: $(this).attr("data-address"),
            serviceId: $(this).attr('data-serviceId'),
            price:$(this).attr('data-price')
        };
    });
  $('#aDueDate').val(data.dd);
  $('#aLeadId').val(data.id);
  $('#cName').val(data.cName);
  $('#cMob').val(data.cMob);
  $('#cEmail').val(data.cEmail);
  $('#tLead').val(data.tLead);
  $('#taddress').val(data.address);
  $('#tprice').val(data.price);
  populatePortfolio(buildUrl($('#apiUrl').val(),'mp/portfolios/'+data.serviceId, $('#token').val(), '3000'),false, data.portId);
  $("#portfolioId").select2({
      placeholder: "Select a vendor",
      width: "100%"
  });
   $("#itemId").select2({
          placeholder: "Select an Item",
          width: "100%"
    });
  $('#portfolioId').on('select2:selecting', function() {
      populateItems(buildUrl($('#apiUrl').val(),'getitems/'+this.value, $('#token').val(), '3000',data.serviceId),false, data.aItemId);
          $("#itemId").select2({
              placeholder: "Select an Item",
              width: "100%"
        });
    })
  
});


$('#leadAssign').on('click',function(event){
    event.preventDefault();
    var url = $('#apiUrl').val()+ '/api/lead/assign?token='+$('#token').val();
    var e = $('#cEmail').val() || '';
    var a = $('#taddress').val() || '';
    var data = {
        dueDate: $('#aDueDate').val(),
        portfolioId: $('#portfolioId').val(),
        itemId: $('#itemId').val(),
        cName: $('#cName').val(),
        cMob: $('#cMob').val(),
        cEmail: e,
        proLeadId : $('#aLeadId').val(),
        leadId : $('#tLead').val(),
        address: a,
        price:$('#tprice').val()
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
            window.location = '/leads';

        },
        error: function(data) {
            showAlertMessage('internaleServerError', data, 'danger', 'fa-warning fa-lg');
            return false;
        }
    });
});

$(document).on('show.bs.modal','#assignToModal', function () {
  var data = null;
  $('.checkboxes:checked').each(function(){
        //var leadId = $(this).data('id');
        data = {
            id: $(this).data('id'),
            productId: $(this).data('productId'),
            employeeId:$(this).data('eid')
        };
    });
  $('#mleadId').val(data.id);
  $('#mEmpId').val(data.employeeId);
  //alert($('#mEmpId').val());
  populateProducts(buildUrl($('#apiUrl').val(),'products', $('#token').val(), '30'),false, data.productId);
  $("#productId").select2({
      placeholder: "Select an product",
      width: "100%"
  });

});


$('#assignInvent').on('click',function(event){
    event.preventDefault();
    var url = $('#apiUrl').val()+ '/api/lead/'+ $('#mleadId').val()+'/inventory?token='+  $('#token').val();
    var data = {
        productId: $('#productId').val(),
        quantity: parseInt($('#mQuantity').val()),
        employeeId: $('#mEmpId').val(),
        leadId: $('#mleadId').val()
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
            window.location = '/leads';

        },
        error: function(data) {
            showAlertMessage('internaleServerError', data, 'danger', 'fa-warning fa-lg');
            return false;
        }
    });
});


$(document).on('show.bs.modal','#addTaskModal', function () {
  var data = null;
  $('.checkboxes:checked').each(function(){
        var leadId = $(this).data('id');
        $('#leadId').val(leadId);
    });
});

$('#addTask').on('click',function(event){
    event.preventDefault();
    var url = $('#apiUrl').val()+ '/api/task?token='+  $('#token').val();
    var data = {
        startDate: $('#tDate').val(),
        dueDate: $('#tDate').val(),
        name: $('#name').val(),
        description:$('#description').val(),
        url: '/leads/'+$('#leadId').val()
    };
    $.ajax({
        url: url,
        type: 'POST',
        data: JSON.stringify(data),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function(data) {
            toastr.options.closeButton = true;
            toastr.success("Task added successfully.");
            window.location = '/leads';

        },
        error: function(data) {
            showAlertMessage('internaleServerError', data, 'danger', 'fa-warning fa-lg');
            return false;
        }
    });
});



$('#upload').on('click',function(event){
    event.preventDefault();
    var url = $('#apiUrl').val()+ '/api/lead/bulk?token='+$('#token').val();
    var data = new FormData();
    jQuery.each(jQuery('#fileToUpload')[0].files, function(i, file) {
        data.append('fileToUpload', file);
    });
    $.ajax({
        url: url,
        type: 'POST',
        data: data,
        enctype: 'multipart/form-data',
        processData: false,  // tell jQuery not to process the data
        contentType: false,   // tell jQuery not to set contentType
        success: function(data) {
            toastr.options.closeButton = true;
            toastr.success("Lead uploaded");
            window.location = '/leads';
        },
        error: function(data) {
            showAlertMessage('internaleServerError', data, 'danger', 'fa-warning fa-lg');
            window.location = '/leads';
            return false;
        }
    });
});

$().ready(function() {
   
    $('.filter-btn').on('click', function(){
        $('.table-filters').toggleClass("hide");
        $("#customerId").select2({allowClear: false});
    });
    $('#searched').on('click', function(){
        var npath ='/leads';
       var psize = $("#psize").val();
       var pno = $('#pno').val();

        if($("#from").val() !="" && $("#to").val() !=""){
          npath =npath+'?q='+$('#query').val()+'&fromDate='+$("#from").val()+'&toDate='+$("#to").val()+'&pno='+ pno +'&psize='+ psize;
        }else{
         npath =npath+'?q='+$('#query').val()+'&pno='+ pno +'&psize='+ psize;
        }
        window.location = npath;
    });


    //filterVisitorData(buildUrl(getAPIUrl(),'leads', getToken(), 5000));

    $('#filter-submit').on('click', function(event){
        var fromDate = toDate = null;
        event.preventDefault();

        filterVisitorData(
            buildUrl(getAPIUrl(),'leads', getToken(), 5000), 
            fromDate, toDate, 
            $('#customerId').val()
        );

    });
    initDateRange(buildUrl(getAPIUrl(),'leads', getToken(), 5000));
    //filterVisitorData(buildUrl(getAPIUrl(),'leads', getToken(), 5000));
});
$(document).on('show.bs.modal','#content', function (event) {

   a4 = [595.28, 841.89];
    var source = window.document.getElementsByClassName("print")[0];
    //source.innerHTML = $scope.selectedItem.content;
    margins = {
        top: 80,
        bottom: 60,
        left: 10,
        width: 700
    };
    var doc = new jsPDF({
        margin: margins,
         unit: 'px',
         format: 'a4'
        });
    var specialElHandlers = {
     '#remove-me': function(element, renderer){
       return true;
     }
    };

    $("#download-me").click(function(){
        var printContents = document.getElementById('pdf').innerHTML;
        printContents = '<html><head><link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet"></head><body>'+ printContents;
        printContents = printContents + '</body></html>';
        window.open().document.write(printContents);
    })
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
         var npath ='/leads';
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