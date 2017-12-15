$().ready(function() {
    var employeeAddForm = $('#employee_add_form');
    var employeeAddFormErrors = $('.alert-danger', employeeAddForm);
    var employeeAddFormSuccess = $('.alert-success', employeeAddForm);

    //IMPORTANT: update CKEDITOR textarea with actual content before submit
    employeeAddForm.on('submit', function() {
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
            name: {
                required: true
            },
            type: {
                required: true
            },
            mobile: {
                required: true,
                number: true,
                maxlength:10,
                minlength: 10
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
           // alert(employeeAddForm.attr('action'));
            var url = employeeAddForm.attr('action');
            var data = {
                name: $('#name').val(),
                mobile: $('#mobile').val(),
                email: $('#email').val(),
                type: $('#type').val(),
                departmentId: $('#departmentId').val(),
                designationId: $('#designationId').val(),
                startDate: getDate($('#startDate').val()),
                profilePicture: $('#profilePicture').val()
            };

            $.ajax({
                url: url,
                type: 'POST',
                dataType: "json",
                data: JSON.stringify(data),
                contentType: "application/json; charset=utf-8",
                success: function(data) {
                    showAlertMessage('successMessage','Employee added successfuly. You can view the employee details in <a href="/employee"><i class="icon-users"></i> Employees</a>.','success','fa-check fa-lg');
                    //window.location.replace("/sales-ledger");
                },
                error: function(data) {
                    showAlertMessage('internaleServerError', data, 'danger', 'fa-warning fa-lg');
                }
            });
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
        employeeAddForm.validate().element($(this)); //revalidate the chosen dropdown value and show error or success message for the input 
    });

    $('#startDate').val(moment().format('DD-MM-YYYY'));
    populateEmpDesignation(buildUrl(getAPIUrl(),'designations', getToken(), 3000),false);
    populateEmpDepartment(buildUrl(getAPIUrl(),'departments', getToken(), 3000));
    addEmpDepartment(buildUrl(getAPIUrl(),'department', getToken(), null),buildUrl(getAPIUrl(),'departments', getToken(), 3000));
    addEmpDesignation(buildUrl(getAPIUrl(),'designation', getToken(), null),buildUrl(getAPIUrl(),'designations', getToken(), 3000));
});