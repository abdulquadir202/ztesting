$().ready(function() {
    var centersAddForm = $('#centers_add_form');
    var centersAddFormErrors = $('.alert-danger', centersAddForm);
    var centersAddFormSuccess = $('.alert-success', centersAddForm);

    $.ajax({
        url: $('#url').val(),
        type: 'GET',
        success: function(data) {
            // showAlertMessage('successMessage','Event added successfuly. You can view the centers details in <a href="/wa/centers"><i class="fa fa-cubes"></i> centers</a>.','success','fa-check fa-lg');
            // window.location.replace("/wa/centers/"+ data.result.id + "/upload-photos");
            if (data) {
                $('#displayCenterName').html(data.center.name);
                $('#displayCenterType').html(data.center.centerType);
                $('#displayCenter').html(data.center.center);
                $('#displayInauguratedBy').html(data.center.inauguratedBy);
                $('#displayAddress').html(data.center.address);
                $('#displayLocation').html(data.center.location);
                $('#displayMobile').html(data.center.mobile);
                $('#displayPhoneNumber').html(data.center.phoneNumber);
                $('#displayFaxNumber').html(data.center.faxNumber);
                $('#displayEmail').html(data.center.email);
                $('#displayWebsiteUrl').html(data.center.websiteUrl);
                $('#displayRegisteredName').html(data.center.registeredName);
                $('#displayRegistrationNumber').html(data.center.registrationNumber);
                $('#displayInaugurationDate').html(data.center.inaugurationDate);
                $('#displaySubsidiaryCanteenId').html(data.center.subsidiaryCanteen);
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