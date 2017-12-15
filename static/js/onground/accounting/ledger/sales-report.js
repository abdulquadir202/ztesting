$().ready(function() {
    var salesEntryAddForm = $('#salesEntry_add_form');
    var salesEntryAddFormErrors = $('.alert-danger', salesEntryAddForm);
    var salesEntryAddFormSuccess = $('.alert-success', salesEntryAddForm);

    $.ajax({
        url: $('#url').val(),
        type: 'GET',
        success: function(data) {
            // showAlertMessage('successMessage','Event added successfuly. You can view the salesEntry details in <a href="/wa/salesEntry"><i class="fa fa-cubes"></i> salesEntry</a>.','success','fa-check fa-lg');
            // window.location.replace("/wa/salesEntry/"+ data.result.id + "/upload-photos");
            if (data) {
                $('#displayAmount').html(data.amount);
                $('#displayTax').html(data.tax);
                $('#displayTotal').html(data.total);
                $('#displayCustomer').html(data.customer.name);
            }
        },
        error: function(data) {
            showAlertMessage('internaleServerError', data, 'danger', 'fa-warning fa-lg');
        }
    });

    
            // var data = {
            //     description: $('#eventDescription').val(),
            //     name: $('#eventName').val(),
            //     address: $('#eventAddress').val(),
            //     eDate: getDate($('#eventDate').val()),
            //     venue: $('#eventVenue').val(),
            //     eventTypeId: $('#eventTypeId').val()
            // };
   
});