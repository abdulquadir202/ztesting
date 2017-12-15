$().ready(function() {
    var testimonyEditForm = $('#testimony_edit_form');
    var testimonyEditFormErrors = $('.alert-danger', testimonyEditForm);
    var testimonyEditFormSuccess = $('.alert-success', testimonyEditForm);

    //IMPORTANT: update CKEDITOR textarea with actual content before submit
    testimonyEditForm.on('submit', function() {
        // for(var instanceName in CKEDITOR.instances) {
        //     CKEDITOR.instances[instanceName].updateElement();
        // }
    })


    testimonyEditForm.validate({
        errorElement: 'span', //default input error message container
        errorClass: 'help-block help-block-error', // default input error message class
        focusInvalid: false, // do not focus the last invalid input
        ignore: "", // validate all fields including form hidden input
        rules: {
            name: {
                required: true
            },
            ratings: {
                required: true
            },
            status:{
                required: true
            },
            message:{
                required: true
            }
        },

        messages: {},

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
            var url = testimonyEditForm.attr('action');
            var data = {
                id: $('#testimonyId').val(),
                name: $('#name').val(),
                ratings: $('#ratings').val(),
                status: $('#status').val(),
                message: $('#message').val()
            };
            $.ajax({
                url: url,
                type: 'PUT',
                dataType: "json",
                data: JSON.stringify(data),
                contentType: "application/json; charset=utf-8",
                success: function(data) {
                    toastr.options.closeButton = true;
                    toastr.clear();
                    toastr.success('Testimony Updated successfuly.'); 
                    showAlertMessage('successMessage','Testimony Updated successfuly.');
                    window.location.replace("/testimonies");
                },
                error: function(data) {
                    showAlertMessage('internaleServerError', data, 'danger', 'fa-warning fa-lg');
                }
            });
        }

    });

    //apply validation on select2 dropdown value change, this only needed for chosen dropdown integration.
    $('.select2me', testimonyEditForm).change(function () {
        testimonyEditForm.validate().element($(this)); //revalidate the chosen dropdown value and show error or success message for the input
    });

    //initialize datepicker
    $('.date-picker').datepicker({
        rtl: App.isRTL(),
        autoclose: true
    });
    $('.date-picker .form-control').change(function() {
        testimonyEditForm.validate().element($(this)); //revalidate the chosen dropdown value and show error or success message for the input
    });


    $.ajax({
       // url: $('#url').val(),
        url : testimonyEditForm.attr('action'),
        type: 'GET',
        success: function(data) {
            if (data) {
                var token = $('#token').val();
                var sUrl = $('#apiUrl').val();
                $('#name').val(data.data.name);
                $('#sName').val(data.data.items.name);
                $('#ratings').val(data.data.ratings);
                $('#message').val(data.data.message);
            }
        },
        error: function(data) {
            showAlertMessage('internaleServerError', data, 'danger', 'fa-warning fa-lg');
        }
    });

 //initialize datepicker
    $('.date-picker').datepicker({
        rtl: App.isRTL(),
        autoclose: true
    });
    $('.date-picker .form-control').change(function() {
        testimonyEditForm.validate().element($(this)); //revalidate the chosen dropdown value and show error or success message for the input 
    });
});