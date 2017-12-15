$().ready(function() { 
    var orgAddForm = $('.orgs_add_form');
    var orgAddFormErrors = $('.alert-danger', orgAddForm);
    var orgAddFormSuccess = $('.alert-success', orgAddForm);
   
    //IMPORTANT: update CKEDITOR textarea with actual content before submit
    orgAddForm.on('submit', function() {
        // for(var instanceName in CKEDITOR.instances) {
        //     CKEDITOR.instances[instanceName].updateElement();
        // }
    })

    orgAddForm.validate({
        errorElement: 'span', //default input error message container
        errorClass: 'help-block help-block-error', // default input error message class
        focusInvalid: false, // do not focus the last invalid input
        ignore: "", // validate all fields including form hidden input
        rules: {
        },

        messages: { // custom messages for radio buttons and checkboxes
           
        },

        errorPlacement: function (error, element) { // render error placement for each input type
            if (element.parent(".input-group").size() > 0) {
                error.insertAfter(element.parent(".input-group"));
            } else if (element.attr("data-error-container")) { 
                error.appendTo(element.attr("data-error-container"));
            } else if (element.parents('.radio-list').size() > 0) { 
                error.appendTo(element.parents('.radio-list').attr("data-error-container"));
            } else if (element.parents('.radio-inline').size() > 0) { 
                error.appendTo(element.parents('.radio-inline').attr("data-error-container"));
            } else if (element.parents('.checkbox-list').size() > 0) {
                error.appendTo(element.parents('.checkbox-list').attr("data-error-container"));
            } else if (element.parents('.checkbox-inline').size() > 0) { 
                error.appendTo(element.parents('.checkbox-inline').attr("data-error-container"));
            } else {
                error.insertAfter(element); // for other inputs, just perform default behavior
            }
        },

        invalidHandler: function (product, validator) { //display error alert on form submit   
            showAlertMessage('validationError', null, 'danger', 'fa-warning fa-lg');
        },

        highlight: function (element) { // hightlight error inputs
           $(element)
                .closest('.form-group').addClass('has-error'); // set error class to the control group
        },

        unhighlight: function (element) { // revert the change done by hightlight
            $(element)
                .closest('.form-group').removeClass('has-error'); // set error class to the control group
        },

        success: function (label) {
            label
                .closest('.form-group').removeClass('has-error'); // set success class to the control group
        },

        submitHandler: function (form) {
            var url = orgAddForm.attr('action');

            var data = {
                vendorType: $('#vendorType').val(),
                leadPercentage: parseInt($('#leadper').val()) || 0,
                address: $('#address').val().trim(),
                email: $('#email').val(),
                website: $('#website').val(),
                tanNumber: $('#tanNumber').val(),
                ServiceTaxNumber: $('#ServiceTaxNumber').val(),
                panNumber: $('#panNumber').val(),
                facebook: $('#facebook').val(),
                twitter: $('#twitter').val(),
                youtube: $('#youtube').val(),
                linkedIn: $('#linkedIn').val()
            };
            $.ajax({
               url: url,
                type: 'PUT',
                dataType: "json",
                data: JSON.stringify(data),
                contentType: "application/json; charset=utf-8",
                success: function(data) {
                    showAlertMessage('successMessage','updated');
                    //window.location.replace("/organisation/detail");
                },
                error: function(data) {
                    showAlertMessage('internaleServerError', data, 'danger', 'fa-warning fa-lg');
                }
            });
        }

    });

     //apply validation on select2 dropdown value change, this only needed for chosen dropdown integration.
    $('.select2me', orgAddForm).change(function () {
        orgAddForm.validate().element($(this)); //revalidate the chosen dropdown value and show error or success message for the input
    });

    //initialize datepicker
    $('.date-picker').datepicker({
        rtl: App.isRTL(),
        autoclose: true
    });
    $('.date-picker .form-control').change(function() {
        orgAddForm.validate().element($(this)); //revalidate the chosen dropdown value and show error or success message for the input 
    });
    var purl = $('#apiUrl').val()+'/api/portfolio/'+$('#uname').val()+'?token='+$('#token').val();
    $.ajax({
        url: purl,
        type: 'GET',
        success: function(data) {
            // showAlertMessage('successMessage','Event added successfuly. You can view the leads details in <a href="/wa/leads"><i class="fa fa-cubes"></i> leads</a>.','success','fa-check fa-lg');
            // window.location.replace("/wa/leads/"+ data.result.id + "/upload-photos");
            if (data && data.portfolio) {
                $('#vName').html(data.portfolio.name);
                $('#orgName').val(data.portfolio.name);
                $('#email').val(data.portfolio.email);
                $('#mobile').val(data.portfolio.mobile);
                $('#website').val(data.portfolio.website);
                $('#address').val(data.portfolio.org.address);
                $('#panNumber').val(data.portfolio.org.panNumber);
                $('#tanNumber').val(data.portfolio.org.tanNumber);
                $('#ServiceTaxNumber').val(data.portfolio.org.ServiceTaxNumber);
                $('#gstNumber').val(data.portfolio.org.gstNumber);
                $('#facebook').val(data.portfolio.org.facebook);
                $('#twitter').val(data.portfolio.org.twitter);
                $('#linkedIn').val(data.portfolio.org.linkedIn);
                $('#youtube').val(data.portfolio.org.youtube);
                $('#leadper').val(data.portfolio.org.leadPercentage || 0);
                $("#vendorType").val(data.portfolio.org.vendorType).change();
                /*$("#vendorType").select2({
                    value: data.portfolio.org.vendorType
                });*/
                if(data.portfolio.org.vendorType === 'converstion'){
                    $('#per').removeClass('hidden'); 
                }
                if(data.portfolio.org.coverImage){
                    $("#cover").attr("src",data.portfolio.org.coverImage);
                }
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
                window.location = '/admin/vendors/'+$('#uname').val();
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
                window.location = '/admin/vendors/'+$('#uname').val();
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
                window.location = '/admin/vendors/'+$('#uname').val();
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
                window.location = '/admin/vendors/'+$('#uname').val();
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
    $('#vendorType').on('change', function() {
        if($('#vendorType').val() == 'converstion') {
            $('#per').removeClass('hidden'); 
        } else {
            $('#per').addClass('hidden'); 
        } 
    });
}); 