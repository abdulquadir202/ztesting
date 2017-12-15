$().ready(function() {
    var eventsAddForm = $('#events_add_form');
    var eventsAddFormErrors = $('.alert-danger', eventsAddForm);
    var eventsAddFormSuccess = $('.alert-success', eventsAddForm);

    //IMPORTANT: update CKEDITOR textarea with actual content before submit
    eventsAddForm.on('submit', function() {
        // for(var instanceName in CKEDITOR.instances) {
        //     CKEDITOR.instances[instanceName].updateElement();
        // }
    })

    eventsAddForm.validate({
        errorElement: 'span', //default input error message container
        errorClass: 'help-block help-block-error', // default input error message class
        focusInvalid: false, // do not focus the last invalid input
        ignore: "", // validate all fields including form hidden input
        rules: {
            eventTypeId: {
                required: true
            },
            eventName: {
                required: true
            },
            eventDate: {
                required: true
            },
            eventVenue: {
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

        invalidHandler: function (event, validator) { //display error alert on form submit   
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
            var url = eventsAddForm.attr('action');

            var data = new FormData();
            var EvDate = getDate($('#eventDate').val())
            alert(EvDate);
            

            jQuery.each(jQuery('#fileToUpload')[0].files, function(i, file) {
                data.append('fileToUpload', file);
            });

            jQuery.each(jQuery('#UploadImage')[0].files, function(i, file) {
                data.append('ChiefGuestImage', file);
            });

            data.append('description',$('#eventDescription').val());
            data.append('name',$('#eventName').val());
            data.append('address',$('#eventAddress').val());
            data.append('eDate',EvDate);
            data.append('venue',$('#eventVenue').val());
            data.append('designation',$('#cDesig').val());
            

            $.ajax({
                url: url,
                type: 'POST',
                data: data,
                enctype: 'multipart/form-data',
                processData: false,  // tell jQuery not to process the data
                contentType: false,
                success: function(data) {
                    showAlertMessage('successMessage','Event added successfuly. You can view the events details in <a href="/wa/events"><i class="fa fa-cubes"></i> events</a>.','success','fa-check fa-lg');
                    window.location.replace("/wa/events/"+ data.result.id + "/upload-photos");
                },
                error: function(data) {
                    showAlertMessage('internaleServerError', data, 'danger', 'fa-warning fa-lg');
                }
            });
        }

    });

     //apply validation on select2 dropdown value change, this only needed for chosen dropdown integration.
    $('.select2me', eventsAddForm).change(function () {
        eventsAddForm.validate().element($(this)); //revalidate the chosen dropdown value and show error or success message for the input
    });

    //initialize datepicker
    $('.date-picker').datepicker({
        rtl: App.isRTL(),
        autoclose: true
    });
    $('.date-picker .form-control').change(function() {
        eventsAddForm.validate().element($(this)); //revalidate the chosen dropdown value and show error or success message for the input 
    });
});