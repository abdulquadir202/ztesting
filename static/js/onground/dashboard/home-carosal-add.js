$().ready(function() {
    var carosalAddForm = $('#carosal_add_form');
    var carosalAddFormErrors = $('.alert-danger', carosalAddForm);
    var carosalAddFormSuccess = $('.alert-success', carosalAddForm);

    //IMPORTANT: update CKEDITOR textarea with actual content before submit
    carosalAddForm.on('submit', function() {
        // for(var instanceName in CKEDITOR.instances) {
        //     CKEDITOR.instances[instanceName].updateElement();
        // }
    })

    carosalAddForm.validate({
        errorElement: 'span', //default input error message container
        errorClass: 'help-block help-block-error', // default input error message class
        focusInvalid: false, // do not focus the last invalid input
        ignore: "", // validate all fields including form hidden input
        rules: {
            cPosition: {
                required: true
            }
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

        invalidHandler: function (carosal, validator) { //display error alert on form submit   
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
            var url = carosalAddForm.attr('action');
            
            var data = new FormData();
            jQuery.each(jQuery('#fileToUpload')[0].files, function(i, file) {
                data.append('fileToUpload', file);
            });
            data.append('text',$('#cText').val());
            data.append('position',parseInt($('#cPosition').val()));

            $.ajax({
                url: url,
                type: 'POST',
                data: data,
                enctype: 'multipart/form-data',
                processData: false,  // tell jQuery not to process the data
                contentType: false,   // tell jQuery not to set contentType

                success: function(data) {
                    showAlertMessage('successMessage','Item added successfuly. You can view the item details in <a href="/crosal/home"><i class="icon-picture-o"></i> Carosals</a>.','success','fa-check fa-lg');
                    window.location.replace("/carosal/home");
                },
                error: function(data) {
                    showAlertMessage('internaleServerError', data, 'danger', 'fa-warning fa-lg');
                }
            });
        }

    });

     //apply validation on select2 dropdown value change, this only needed for chosen dropdown integration.
    $('.select2me', carosalAddForm).change(function () {
        carosalAddForm.validate().element($(this)); //revalidate the chosen dropdown value and show error or success message for the input
    });

    //initialize datepicker
    $('.date-picker').datepicker({
        rtl: App.isRTL(),
        autoclose: true
    });
    $('.date-picker .form-control').change(function() {
        carosalAddForm.validate().element($(this)); //revalidate the chosen dropdown value and show error or success message for the input 
    });
});