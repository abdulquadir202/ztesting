$().ready(function() {
    var CommitteeAddForm = $('#Committee_add_form');
    var CommitteeAddFormErrors = $('.alert-danger', CommitteeAddForm);
    var CommitteeAddFormSuccess = $('.alert-success', CommitteeAddForm);

    $.ajax({
        url: $('#url').val(),
        type: 'GET',
        success: function(data) {
            // showAlertMessage('successMessage','Event added successfuly. You can view the Committee details in <a href="/wa/Committee"><i class="fa fa-cubes"></i> Committee</a>.','success','fa-check fa-lg');
            // window.location.replace("/wa/Committee/"+ data.result.id + "/upload-photos");
            if (data) {
                $('#displayName').html(data.name);
                $('#displayMembers').html(data.memberId);
                $('#displayDescription').html(data.description);
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