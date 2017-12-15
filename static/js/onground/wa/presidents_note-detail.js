$().ready(function() {
    var presidentsNoteAddForm = $('#presidentsNote_add_form');
    var presidentsNoteAddFormErrors = $('.alert-danger', presidentsNoteAddForm);
    var presidentsNoteAddFormSuccess = $('.alert-success', presidentsNoteAddForm);

    $.ajax({
        url: $('#url').val(),
        type: 'GET',
        success: function(data) {
            // showAlertMessage('successMessage','Event added successfuly. You can view the presidentsNote details in <a href="/wa/presidentsNote"><i class="fa fa-cubes"></i> presidentsNote</a>.','success','fa-check fa-lg');
            // window.location.replace("/wa/presidentsNote/"+ data.result.id + "/upload-photos");
            if (data) {
                $('#displayName').html(data.memberId);
                $('#displayNote').html(data.note);
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