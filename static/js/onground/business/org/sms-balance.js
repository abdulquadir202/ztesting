
$('.price-button').on('click',function(event){
  var bal = parseInt($(this).attr('data-id'));
  var gst = parseInt(bal) * (18/100);
  var ntotal = bal + gst; 
  $('#rechargesms').modal('show');
  $('#charge').html(bal);
  $('#walleta').html($('#wallet').val());
  $('#gst').html(gst);
  $('#total').html(ntotal);
  $('#amount').val(ntotal);
});
$('#recharge').on('click',function(event){
  var url = 'https://api.zinetgo.com/api/recharge-sms?token='+$('#token').val();
  var data = {
        amount: $('#amount').val()
    };

    $.ajax({
       url: url,
        type: 'POST',
        dataType: "json",
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        success: function(data) {
            showAlertMessage('successMessage','updated');
            window.location.replace("/sms-check");
        },
        error: function(data) {
            showAlertMessage('internaleServerError', data, 'danger', 'fa-warning fa-lg');
        }
    });
});
