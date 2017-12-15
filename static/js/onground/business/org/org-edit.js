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
            
            var data = new FormData();
            jQuery.each(jQuery('#fileToUpload')[0].files, function(i, file) {
                data.append('fileToUpload', file);
            });
            data.append('address',$('#address').val().trim());
            data.append('email',$('#email').val());
            data.append('website',$('#website').val());
            data.append('tanNumber',$('#tanNumber').val());
            data.append('ServiceTaxNumber',$('#ServiceTaxNumber').val());
            data.append('panNumber',$('#panNumber').val());
            data.append('gstNumber',$('#gstNumber').val());
            data.append('facebook',$('#facebook').val());
            data.append('twitter',$('#twitter').val());
            data.append('linkedIn',$('#linkedIn').val());
            data.append('youtube',$('#youtube').val());

            $.ajax({
                url: url,
                type: 'PUT',
                data: data,
                enctype: 'multipart/form-data',
                processData: false,  // tell jQuery not to process the data
                contentType: false,   // tell jQuery not to set contentType

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

    $('#changepwd').on('click', function(event){
        event.preventDefault();
        var url1 = getAPIUrl()+ '/api/change-password?token='+getToken();
        var data = {
            oldPassword: $('#current').val(),
            newPassword: $('#new').val()
        };
        $.ajax({
            url: url1,
            type: 'POST',
            data: JSON.stringify(data),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function(data) {
                //toastr.options.closeButton = true;
                //toastr.success("Password Changed Successfully.");
                //window.location = '/organisation/detail';
                showAlertMessage('successMessage','Password Changed Successfully');

            },
            error: function(data) {
                showAlertMessage('internaleServerError', data, 'danger', 'fa-warning fa-lg');
                return false;
            }
        });
    });
});