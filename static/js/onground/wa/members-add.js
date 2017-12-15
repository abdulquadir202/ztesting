$().ready(function() {
    var membersAddForm = $('#members_add_form');
    var membersAddFormErrors = $('.alert-danger', membersAddForm);
    var membersAddFormSuccess = $('.alert-success', membersAddForm);

    //IMPORTANT: update CKEDITOR textarea with actual content before submit
    membersAddForm.on('submit', function() {
        // for(var instanceName in CKEDITOR.instances) {
        //     CKEDITOR.instances[instanceName].updateElement();
        // }
    })

    membersAddForm.validate({
        errorElement: 'span', //default input error message container
        errorClass: 'help-block help-block-error', // default input error message class
        focusInvalid: false, // do not focus the last invalid input
        ignore: "", // validate all fields including form hidden input
        rules: {
            name: {
                required: true
            },
            // location: {
            //     required: true
            // },
            mobile: {
                number: true,
                maxlength:10,
                minlength: 10,
                required: true
            },
            dateOfBirth: {
                required: true,
            },
            startDate: {
                required: true,
            }
            // registeredName: {
            //     required: true
            // },
            // registrationNumber: {
            //     required: true
            // }
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

        invalidHandler: function (member, validator) { //display error alert on form submit   
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
            var url = membersAddForm.attr('action');
            var data = {
                name: $('#name').val(),
                picture: $('#picture').val(),
                //spouseRank: $('#spouseRank').val(),
                spouseName: $('#spouseName').val(),
                address: $('#address').val(),
                mobile: $('#mobile').val(),
                password: $('#pwd').val(),
                spouseMobile: $('#spouseMobile').val(),
                //spouseRegistrationNumber: $('#spouseRegistrationNumber').val(),
                //spouseJobLocation: $('#spouseJobLocation').val(),
                dateOfBirth: getDate($('#dateOfBirth').val()),
                startDate: getDate($('#startDate').val())
                //endDate: getDate($('#endDate').val())
            };

            $.ajax({
                url: url,
                type: 'POST',
                dataType: "json",
                data: JSON.stringify(data),
                contentType: "application/json; charset=utf-8",
                success: function(data) {
                    showAlertMessage('successMessage','Member added successfuly. You can view the members details in <a href="/wa/members"><i class="fa fa-cubes"></i> members</a>.','success','fa-check fa-lg');
                    window.location.replace("/wa/members");
                },
                error: function(data) {
                    showAlertMessage('internaleServerError', data, 'danger', 'fa-warning fa-lg');
                }
            });
        }

    });

     //apply validation on select2 dropdown value change, this only needed for chosen dropdown integration.
    $('.select2me', membersAddForm).change(function () {
        membersAddForm.validate().element($(this)); //revalidate the chosen dropdown value and show error or success message for the input
    });

    //initialize datepicker
    $('.date-picker').datepicker({
        rtl: App.isRTL(),
        autoclose: true
    });
    $('.date-picker .form-control').change(function() {
        membersAddForm.validate().element($(this)); //revalidate the chosen dropdown value and show error or success message for the input 
    });
});