$().ready(function() { 
    var purl = $('#apiUrl').val()+'/api/portfolio/'+$('#uname').val()+'?token='+$('#token').val();
    $.ajax({
        url: purl,
        type: 'GET',
        success: function(data) {
            // showAlertMessage('successMessage','Event added successfuly. You can view the leads details in <a href="/wa/leads"><i class="fa fa-cubes"></i> leads</a>.','success','fa-check fa-lg');
            // window.location.replace("/wa/leads/"+ data.result.id + "/upload-photos");
            if (data && data.portfolio) {
                
                if(data.portfolio.adhar){
                   $("#adharImage").attr("src",data.portfolio.adhar);
                    $('#adharImage').each(function(){
                        var $this = $(this); 
                        $this.wrap('<a href="' +data.portfolio.adhar + ' "target="_blank"></a>');
                    });
                }

                if(data.portfolio.pan){
                    $("#pancard").attr("src",data.portfolio.pan);
                    $('#pancard').each(function(){
                        var $this = $(this); 
                        $this.wrap('<a href="' +data.portfolio.pan + ' "target="_blank"></a>');
                    });
                }
                if(data.portfolio.serviceTax){
                    $("#serviceTaxImg").attr("src",data.portfolio.serviceTax);
                     $('#serviceTaxImg').each(function(){
                        var $this = $(this); 
                        $this.wrap('<a href="' +data.portfolio.serviceTax + ' "target="_blank"></a>');
                    });
                }
                if(data.portfolio.addressProof){
                    $("#addressp").attr("src",data.portfolio.addressProof);
                    $('#addressp').each(function(){
                        var $this = $(this); 
                        $this.wrap('<a href="' +data.portfolio.addressProof + ' "target="_blank"></a>');
                    });
                }

                if(data.portfolio.letterheadheader){
                    $("#lath").attr("src",data.portfolio.letterheadheader);
                    $('#lath').each(function(){
                        var $this = $(this); 
                        $this.wrap('<a href="' +data.portfolio.letterheadheader + ' "target="_blank"></a>');
                    });
                }

                if(data.portfolio.letterheadfooter){
                    $("#lathf").attr("src",data.portfolio.letterheadfooter);
                    $('#lathf').each(function(){
                        var $this = $(this); 
                        $this.wrap('<a href="' +data.portfolio.letterheadfooter + ' "target="_blank"></a>');
                    });
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
    $('#adharSubmit').on('click',function(event){
        event.preventDefault();
        var url = $('#apiUrl').val()+ '/api/upload/adhar/'+$('#uname').val()+'?token='+  $('#token').val();
        var data = new FormData();
        jQuery.each(jQuery('#adhar')[0].files, function(i, file) {
            data.append('adhar', file);
        });
        $.ajax({
            url: url,
            type: 'PUT',
            data: data,
            enctype: 'multipart/form-data',
            processData: false,  // tell jQuery not to process the data
            contentType: false,   
            success: function(data) {
                toastr.options.closeButton = true;
                toastr.success("Adhar card updated");
                window.location = '/organisation/documents/'+$('#uname').val();
            },
            error: function(data) {
                showAlertMessage('internaleServerError', data, 'danger', 'fa-warning fa-lg');
                return false;
            }
        });
    });

    $('#uploadPan').on('click',function(event){
        event.preventDefault();
        var url = $('#apiUrl').val()+ '/api/upload/pan/'+$('#uname').val()+'?token='+  $('#token').val();
        var data = new FormData();
        jQuery.each(jQuery('#pan')[0].files, function(i, file) {
            data.append('pan', file);
        });
        $.ajax({
            url: url,
            type: 'PUT',
            data: data,
            enctype: 'multipart/form-data',
            processData: false,  // tell jQuery not to process the data
            contentType: false,   
            success: function(data) {
                toastr.options.closeButton = true;
                toastr.success("Adhar card updated");
                window.location = '/organisation/documents/'+$('#uname').val();
            },
            error: function(data) {
                showAlertMessage('internaleServerError', data, 'danger', 'fa-warning fa-lg');
                return false;
            }
        });
    });

    $('#uploadserviceTax').on('click',function(event){
        event.preventDefault();
        var url = $('#apiUrl').val()+ '/api/upload/serviceTax/'+$('#uname').val()+'?token='+  $('#token').val();
        var data = new FormData();
        jQuery.each(jQuery('#serviceTax')[0].files, function(i, file) {
            data.append('serviceTax', file);
        });
        $.ajax({
            url: url,
            type: 'PUT',
            data: data,
            enctype: 'multipart/form-data',
            processData: false,  // tell jQuery not to process the data
            contentType: false,   
            success: function(data) {
                toastr.options.closeButton = true;
                toastr.success("Adhar card updated");
                window.location = '/organisation/documents/'+$('#uname').val();
            },
            error: function(data) {
                showAlertMessage('internaleServerError', data, 'danger', 'fa-warning fa-lg');
                return false;
            }
        });
    });

    $('#uploadaddress').on('click',function(event){
        event.preventDefault();
        var url = $('#apiUrl').val()+ '/api/upload/addressProof/'+$('#uname').val()+'?token='+  $('#token').val();
        var data = new FormData();
        jQuery.each(jQuery('#addressProof')[0].files, function(i, file) {
            data.append('addressProof', file);
        });
        $.ajax({
            url: url,
            type: 'PUT',
            data: data,
            enctype: 'multipart/form-data',
            processData: false,  // tell jQuery not to process the data
            contentType: false,   
            success: function(data) {
                toastr.options.closeButton = true;
                toastr.success("Adhar card updated");
                window.location = '/organisation/documents/'+$('#uname').val();
            },
            error: function(data) {
                showAlertMessage('internaleServerError', data, 'danger', 'fa-warning fa-lg');
                return false;
            }
        });
    });

    $('#letterhb').on('click',function(event){
        event.preventDefault();
        var url = $('#apiUrl').val()+ '/api/upload/letter-head/'+$('#uname').val()+'?token='+  $('#token').val();
        var data = new FormData();
        jQuery.each(jQuery('#letterh')[0].files, function(i, file) {
            data.append('letterh', file);
        });
        $.ajax({
            url: url,
            type: 'PUT',
            data: data,
            enctype: 'multipart/form-data',
            processData: false,  // tell jQuery not to process the data
            contentType: false,   
            success: function(data) {
                toastr.options.closeButton = true;
                toastr.success("Adhar card updated");
                window.location = '/organisation/documents/'+$('#uname').val();
            },
            error: function(data) {
                showAlertMessage('internaleServerError', data, 'danger', 'fa-warning fa-lg');
                return false;
            }
        });
    });
    $('#letterhfb').on('click',function(event){
        event.preventDefault();
        var url = $('#apiUrl').val()+ '/api/upload/letter-footer/'+$('#uname').val()+'?token='+  $('#token').val();
        var data = new FormData();
        jQuery.each(jQuery('#letterhf')[0].files, function(i, file) {
            data.append('letterhf', file);
        });
        $.ajax({
            url: url,
            type: 'PUT',
            data: data,
            enctype: 'multipart/form-data',
            processData: false,  // tell jQuery not to process the data
            contentType: false,   
            success: function(data) {
                toastr.options.closeButton = true;
                toastr.success("Adhar card updated");
                window.location = '/organisation/documents/'+$('#uname').val();
            },
            error: function(data) {
                showAlertMessage('internaleServerError', data, 'danger', 'fa-warning fa-lg');
                return false;
            }
        });
    });
}); 