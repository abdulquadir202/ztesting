$().ready(function() {
    var membersAddForm = $('#members_add_form');
    var membersAddFormErrors = $('.alert-danger', membersAddForm);
    var membersAddFormSuccess = $('.alert-success', membersAddForm);

    $.ajax({
        url: $('#url').val(),
        type: 'GET',
        success: function(data) {
            // showAlertMessage('successMessage','Event added successfuly. You can view the members details in <a href="/wa/members"><i class="fa fa-cubes"></i> members</a>.','success','fa-check fa-lg');
            // window.location.replace("/wa/members/"+ data.result.id + "/upload-photos");
            if (data) {
                $('#displayName').html(data.magazine.name);
                $('#displayPicture').html(data.magazine.coverPhoto);
                $('#displayPdfLink').html(data.magazine.pdfLink);
                $('#displayEditionNumber').html(data.magazine.editionNumber);
                $('#displayPublishedDate').html(data.magazine.pDate);
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