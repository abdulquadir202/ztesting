$().ready(function() {
    var leadSourcesAddForm = $('#lead_source_add_form');
    var leadSourcesAddFormErrors = $('.alert-danger', leadSourcesAddForm);
    var leadSourcesAddFormSuccess = $('.alert-success', leadSourcesAddForm);

    //IMPORTANT: update CKEDITOR textarea with actual content before submit
    leadSourcesAddForm.on('submit', function() {
        // for(var instanceName in CKEDITOR.instances) {
        //     CKEDITOR.instances[instanceName].updateElement();
        // }
    })

    leadSourcesAddForm.validate({
        errorElement: 'span', //default input error message container
        errorClass: 'help-block help-block-error', // default input error message class
        focusInvalid: false, // do not focus the last invalid input
        ignore: "", // validate all fields including form hidden input
        rules: {
            name: {
                required: true
            },
            website: {
                required: true,
                url: true
            },
            contactPerson: {
                required: true
            },
            contactNumber: {
                required: true,
                number: true,
                maxlength:10,
                minlength: 10
            },
            comissionType: {
                required: true
            },
            comissionAmount: {
                required: true,
                number: true
            }
        },

        messages: { // custom messages for radio buttons and checkboxes
            amount: {
                //required: "Please enter amount."
            },
            type: {
                //required: "Please select a type"
            }
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
           // alert(leadSourcesAddForm.attr('action'));
            var url = leadSourcesAddForm.attr('action');
            var data = {
                name: $('#name').val(),
                picture: $('#picture').val(),
                website: $('#website').val(),
                contactPerson: $('#contactPerson').val(),
                contactNumber: $('#contactNumber').val(),
                comissionType: $('#comissionType').val(),
                comissionAmount: $('#comissionAmount').val(),
                description: $('#description').val()
            };

            $.ajax({
                url: url,
                type: 'POST',
                dataType: "json",
                data: JSON.stringify(data),
                contentType: "application/json; charset=utf-8",
                success: function(data) {
                    showAlertMessage('successMessage','Lead Source added successfuly. You can view the Lead Source details in <a href="/lead-sources"><i class="icon-users"></i> Lead Sources</a>.','success','fa-check fa-lg');
                    window.location.replace("/leads");
                },
                error: function(data) {
                    showAlertMessage('internaleServerError', data, 'danger', 'fa-warning fa-lg');
                }
            });
        }

    });

     //apply validation on select2 dropdown value change, this only needed for chosen dropdown integration.
    $('.select2me', leadSourcesAddForm).change(function () {
        leadSourcesAddForm.validate().element($(this)); //revalidate the chosen dropdown value and show error or success message for the input
    });

    //initialize datepicker
    $('.date-picker').datepicker({
        rtl: App.isRTL(),
        autoclose: true
    });
    $('.date-picker .form-control').change(function() {
        leadSourcesAddForm.validate().element($(this)); //revalidate the chosen dropdown value and show error or success message for the input 
    });
});