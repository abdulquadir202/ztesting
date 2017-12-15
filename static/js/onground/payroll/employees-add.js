$().ready(function() {
    var employeeAddForm = $('#submit_form');
    var employeeAddFormErrors = $('.alert-danger', employeeAddForm);
    var employeeAddFormSuccess = $('.alert-success', employeeAddForm);

    //IMPORTANT: update CKEDITOR textarea with actual content before submit
    employeeAddForm.on('button-submit').click(function () {
        // for(var instanceName in CKEDITOR.instances) {
        //     CKEDITOR.instances[instanceName].updateElement();
        // }
    })

    employeeAddForm.validate({
        errorElement: 'span', //default input error message container
        errorClass: 'help-block help-block-error', // default input error message class
        focusInvalid: false, // do not focus the last invalid input
        ignore: "", // validate all fields including form hidden input
        rules: {
            // name: {
            //     required: true
            // },
            // email: {
            //     required: true
            // },
            // type: {
            //     required: true
            // },
            // mobile: {
            //     required: true,
            //     number: true,
            //     maxlength:10,
            //     minlength: 10
            // }
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
           // alert(employeeAddForm.attr('action'));
            var url = employeeAddForm.attr('action');
            var data = {
                name: $('#name').val(),
                mobile: $('#mobile').val(),
                mobile1: $('#emobile').val(),
                email: $('#email').val(),
                gender: $('#gender').val(),
                address: $('#address').val(),
                departmentId: $('#departmentId').val(),
                designationId: $('#designationId').val(),
                role: $('#role').val(),
                startDate: getDate($('#startDate').val()),,
                endDate: getDate($('#endDate').val()),,
                employmentType: $('#employmentType').val(),
                branchName: $('#card_branchName').val(),
                accountNumber: $('#card_acnumber').val(),
                ifsc: $('#card_ifsc').val(),
                pan: $('#card_pan').val()
            };
            $.ajax({
                url: url,
                type: 'POST',
                dataType: "json",
                data: JSON.stringify(data),
                contentType: "application/json; charset=utf-8",
                success: function(data) {
                    showAlertMessage('successMessage','Employee added successfuly. You can view the employee details in <a href="/employees"><i class="icon-users"></i> Employees</a>.','success','fa-check fa-lg');
                    window.location.replace("/employees");
                },
                error: function(data) {
                    showAlertMessage('internaleServerError', data, 'danger', 'fa-warning fa-lg');
                }
            });
            alert('data'+data);
        }

    });

     //apply validation on select2 dropdown value change, this only needed for chosen dropdown integration.
    $('.select2me', employeeAddForm).change(function () {
        employeeAddForm.validate().element($(this)); //revalidate the chosen dropdown value and show error or success message for the input
    });

    //initialize datepicker
    $('.date-picker').datepicker({
        rtl: App.isRTL(),
        autoclose: true
    });
    $('.date-picker .form-control').change(function() {
        bankEntryForm.validate().element($(this)); //revalidate the chosen dropdown value and show error or success message for the input 
    });
});