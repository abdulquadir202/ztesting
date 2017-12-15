$().ready(function() {
    var activitiesAddForm = $('#activities_add_form');
    var activitiesAddFormErrors = $('.alert-danger', activitiesAddForm);
    var activitiesAddFormSuccess = $('.alert-success', activitiesAddForm);

    $.ajax({
        url: $('#url').val(),
        type: 'GET',
        success: function(data) {
            // showAlertMessage('successMessage','Event added successfuly. You can view the activities details in <a href="/wa/activities"><i class="fa fa-cubes"></i> activities</a>.','success','fa-check fa-lg');
            // window.location.replace("/wa/activities/"+ data.result.id + "/upload-photos");
            if (data) {
                $('#displayActivityType').html(data.activityType.activityType);
                $('#displayActivityName').html(data.name);
                $('#displayPicture').html(data.picture);
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