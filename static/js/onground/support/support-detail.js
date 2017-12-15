$().ready(function() {
    var ticketsAddForm = $('#tickets_add_form');
    var ticketsAddFormErrors = $('.alert-danger', ticketsAddForm);
    var ticketsAddFormSuccess = $('.alert-success', ticketsAddForm);

    $.ajax({
        url: $('#url').val(),
        type: 'GET',
        success: function(data) {
            //alert(JSON.stringify(data));
            // showAlertMessage('successMessage','Event added successfuly. You can view the leads details in <a href="/wa/leads"><i class="fa fa-cubes"></i> leads</a>.','success','fa-check fa-lg');
            // window.location.replace("/wa/leads/"+ data.result.id + "/upload-photos");
            if (data) {
                $('#dueDate').html(data.dueDate);
               // $('#bookingdate').html(moment(new Date(data.createdOn)).format("DD-MMM-YYYY"));
                $('#tokenId').html(data.tokenId);
                $('#title').html(data.title);
                $('#displayCustomerName').html(data.customer.name);
                $('#displayCustomerEmail').html(data.customer.email);
                $('#displayCustomerMobile').html(data.customer.mobile);
                $('#displayEmployeeName').html(data.employee.name);
                $('#displayEmployeeEmail').html(data.employee.email);
                $('#displayEmployeeMobile').html(data.employee.mobile);
                $('#priority').html(data.priority);
                $('#description').html(data.description);
                $('#displayServiceName').html(data.item.name);
                $('#displayServiceUnit').html(data.item.unit);
                $('#displayServicePrice').html(data.item.price);
                $('#type').html(data.type);
                $('#sStatus').html(data.iStatus);
                $('.lid').html(data.leadId); 
            }
        },
        error: function(data) {
            showAlertMessage('internaleServerError', data, 'danger', 'fa-warning fa-lg');
        }
    });
    $('.btn-delete').on('click',function(event){
        $.ajax({
            url: $('#url').val(),
            type: 'DELETE',
            success: function(data) {
                if (data && data.status) {
                    //showAlertMessage('successMessage','Customer deleted successfuly.','success','fa-check fa-lg');
                    window.location = '/support/tickets';
                }
            },
            error: function(data) {
                showAlertMessage('internaleServerError', data, 'danger', 'fa-warning fa-lg');
            }
        });
    });
});