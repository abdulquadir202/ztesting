$().ready(function() { 
    var purl = $('#apiUrl').val()+'/api/portfolio/'+$('#uname').val()+'?token='+$('#token').val();
    $.ajax({
        url: purl,
        type: 'GET',
        success: function(data) {
            // showAlertMessage('successMessage','Event added successfuly. You can view the leads details in <a href="/wa/leads"><i class="fa fa-cubes"></i> leads</a>.','success','fa-check fa-lg');
            // window.location.replace("/wa/leads/"+ data.result.id + "/upload-photos");
            if (data && data.portfolio) {
                $("#tpKey").html(data.portfolio.tpKey);
                $("#papiKey").html(data.portfolio.apiKey);
                $("#portfolioId").html(data.portfolio.id);
                if(data.portfolio.instamojo){
                    $("#authKey").val(data.portfolio.instamojo.authtoken);
                    $("#apiKey").val(data.portfolio.instamojo.apiKey);
                }
                /*$('#gstNumber').val(data.portfolio.org.gstNumber);
                $('#gstNumber').val(data.portfolio.org.gstNumber);
                $('#gstNumber').val(data.portfolio.org.gstNumber);*/
            }
        },
        error: function(data) {
            showAlertMessage('internaleServerError', data, 'danger', 'fa-warning fa-lg');
        }
    });
    $('#editProduct').on('click', function(event){
        event.preventDefault();
        var url1 = getAPIUrl()+ '/api/portfolio/'+$('#uname').val()+'?token='+$('#token').val();
        var data = {
            instamojo:{
                authtoken: $('#authKey').val(),
                apiKey: $('#apiKey').val()
            }
        };
        $.ajax({
            url: url1,
            type: 'PUT',
            data: JSON.stringify(data),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function(data) {
                showAlertMessage('successMessage','instamojo credentials updated Successfully');

            },
            error: function(data) {
                showAlertMessage('internaleServerError', data, 'danger', 'fa-warning fa-lg');
                return false;
            }
        });
    });
}); 