$().ready(function() {
    var employeesAddForm = $('#employees_add_form');
    var employeesAddFormErrors = $('.alert-danger', employeesAddForm);
    var employeesAddFormSuccess = $('.alert-success', employeesAddForm);

    $.ajax({
        url: $('#url').val(),
        type: 'GET',
        success: function(data) {
            // showAlertMessage('successMessage','Event added successfuly. You can view the employees details in <a href="/wa/employees"><i class="fa fa-cubes"></i> employees</a>.','success','fa-check fa-lg');
            // window.location.replace("/wa/employees/"+ data.result.id + "/upload-photos");
            if (data) {
                $('#displayId').html(data.empId);
                $('#displayName1').html(data.name);
                $('#displayName').html(data.name);
                $('#displayMobile').html(data.mobile);
                $('#displayEmail').html(data.email);
                $('#displayStartDate').html(date = new Date(data.startDate).toISOString().slice(0,10));
                $('#displayDesignation').html(data.designation.name);
                $('#displayDepartment').html(data.department.name);
                $('#displayEmploymentType').html(data.employmentType);
                // let date = new Date();
                //     date = date.toISOString().slice(0,10);
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