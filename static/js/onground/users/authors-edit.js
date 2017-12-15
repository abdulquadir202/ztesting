$().ready(function() {
    var usersAddForm = $('#users_add_form');
    var usersAddFormErrors = $('.alert-danger', usersAddForm);
    var usersAddFormSuccess = $('.alert-success', usersAddForm);

    //IMPORTANT: update CKEDITOR textarea with actual content before submit
    usersAddForm.on('submit', function() {
        // for(var instanceName in CKEDITOR.instances) {
        //     CKEDITOR.instances[instanceName].updateElement();
        // }
    })

    usersAddForm.validate({
        errorElement: 'span', //default input error message container
        errorClass: 'help-block help-block-error', // default input error message class
        focusInvalid: false, // do not focus the last invalid input
        ignore: "", // validate all fields including form hidden input
        rules: {
            mobile: {
                required: true
            },
            name: {
                required: true
            },
            pwd: {
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
            // alert(usersAddForm.attr('action'));
            var url = usersAddForm.attr('action');
            var data = {
                mobile: $('#mobile').val(),
                name: $('#name').val(),
                email: $('#email').val(),
                blogUserType: $('#type').val(),
                address: $('#address').val(),
                password: $('#pwd').val()
            };
            $.ajax({
                url: url,
                type: 'PUT',
                dataType: "json",
                data: JSON.stringify(data),
                contentType: "application/json; charset=utf-8",
                success: function(data) {
                    showAlertMessage('successMessage','User updated successfuly.','success','fa-check fa-lg');
                },
                error: function(data) {
                    showAlertMessage('internaleServerError', data, 'danger', 'fa-warning fa-lg');
                }
            });
        }

    });

    //apply validation on select2 dropdown value change, this only needed for chosen dropdown integration.
    $('.select2me', usersAddForm).change(function () {
        usersAddForm.validate().element($(this)); //revalidate the chosen dropdown value and show error or success message for the input
    });

    //initialize datepicker
    $('.date-picker').datepicker({
        rtl: App.isRTL(),
        autoclose: true
    });
    $('.date-picker .form-control').change(function() {
        usersAddForm.validate().element($(this)); //revalidate the chosen dropdown value and show error or success message for the input
    });


    $.ajax({
       // url: $('#url').val(),
        url : usersAddForm.attr('action'),
        type: 'GET',
        success: function(data) {
            if (data) {
                var token = getToken();
                var sUrl = getAPIUrl();
                $('.lid').html(data.result.name);
                $('#mobile').val(data.result.mobile);
                $('#name').val(data.result.name);
                $('#email').val(data.result.email);
                $('#address').val(data.result.address);
                $('#pwd').val(data.result.password);
                $("#type").select2({
                    value: data.result.blogUserType
                });
            }
        },
        error: function(data) {
            showAlertMessage('internaleServerError', data, 'danger', 'fa-warning fa-lg');
        }
    });

});