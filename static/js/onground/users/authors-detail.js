
$().ready(function() {
    var authorsData = null;

    var updateDetails = function(){   

        $('#displayName').html(authorsData.result.name);
        $('#displayMobile').html(authorsData.result.mobile);
        $('#displayEmail').html(authorsData.result.email);
        $('#displayType').html(authorsData.result.blogUserType);
        $('#displayAddress').html(authorsData.result.address);
    };  
    
    $.ajax({
        url: $('#url').val(),
        type: 'GET',
        success: function(data) {
            if (data) {
                authorsData = data;
                updateDetails();
            }
        },
        error: function(data) {
            showAlertMessage('internaleServerError', data, 'danger', 'fa-warning fa-lg');
        }
    });

    $("#delete").on('click',function(event){
        $.ajax({
            url: $('#url').val(),
            type: 'DELETE',
            success: function(data) {
                if (data && data.status) {
                    //showAlertMessage('successMessage','Customer deleted successfuly.','success','fa-check fa-lg');
                    window.location = '/admin/users';
                }
            },
            error: function(data) {
                showAlertMessage('internaleServerError', data, 'danger', 'fa-warning fa-lg');
            }
        });
    });
});