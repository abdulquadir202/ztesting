$().ready(function() {
    var magazinesAddForm = $('#magazines_add_form');
    var magazinesAddFormErrors = $('.alert-danger', magazinesAddForm);
    var magazinesAddFormSuccess = $('.alert-success', magazinesAddForm);

    $.ajax({
        url: $('#url').val(),
        type: 'GET',
        success: function(data) {
            // showAlertMessage('successMessage','Event added successfuly. You can view the magazines details in <a href="/wa/magazines"><i class="fa fa-cubes"></i> magazines</a>.','success','fa-check fa-lg');
            // window.location.replace("/wa/magazines/"+ data.result.id + "/upload-photos");
            if (data) {
                $('#displayName').html(data.name);
                $('#displayPicture').html(data.picture);
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