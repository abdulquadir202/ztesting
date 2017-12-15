$().ready(function() {
    var visitorsAddForm = $('#visitors_add_form');
    var visitorsAddFormErrors = $('.alert-danger', visitorsAddForm);
    var visitorsAddFormSuccess = $('.alert-success', visitorsAddForm);

    $.ajax({
        url: $('#url').val(),
        type: 'GET',
        success: function(data) {
            // showAlertMessage('successMessage','Event added successfuly. You can view the visitors details in <a href="/wa/visitors"><i class="fa fa-cubes"></i> visitors</a>.','success','fa-check fa-lg');
            // window.location.replace("/wa/visitors/"+ data.result.id + "/upload-photos");
            if (data) {
                $('#fDate').html(moment(new Date(data.fDate)).format("DD-MMM-YYYY") || '');
                $('#vDate').html(moment(new Date(data.vDate)).format("DD-MMM-YYYY"));
                $('#name').html(data.name);
                $('#mobile').html(data.mobile);
                $('#email').html(data.email);
                $('#employee').html(data.employee.name +'('+data.employee.mobile+')');
                $('#address').html(data.address);
                $('#salesStage').html(data.salesStage);
                $('#description').html(data.description);
                $('.lid').html(data.id);
            }
        },
        error: function(data) {
            showAlertMessage('internaleServerError', data, 'danger', 'fa-warning fa-lg');
        }
    });


     $("#delete").on('click',function(event){

        swal({
            title: "Are you sure to delete this?",
            text: "You will not be able to recover this item once deleted!",
            type: "info",
            showCancelButton: true,
            closeOnConfirm: false,
            showLoaderOnConfirm: true
        }, function () {
            var url = getAPIUrl() + '/api/visitor/' + $('#visitorId').val() + '?token=' + getToken();
            $.ajax({
                url: url,
                type: 'DELETE',
                success: function(data) {
                    if (data && data.status) {
                        swal("Deleted!", "visitor has been deleted successfully.", "success");
                        window.location = '/visitors';
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