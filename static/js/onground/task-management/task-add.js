$().ready(function() {
    
    var taskAddForm = $('#task_add_form');
    var taskAddFormErrors = $('.alert-danger', taskAddForm);
    var taskAddFormSuccess = $('.alert-success', taskAddForm);

    //IMPORTANT: update CKEDITOR textarea with actual content before submit
    taskAddForm.on('submit', function() {
        // for(var instanceName in CKEDITOR.instances) {
        //     CKEDITOR.instances[instanceName].updateElement();
        // }
    })

    taskAddForm.validate({
        errorElement: 'span', //default input error message container
        errorClass: 'help-block help-block-error', // default input error message class
        focusInvalid: false, // do not focus the last invalid input
        ignore: "", // validate all fields including form hidden input
        rules: {
            name: {
                required: true
            },
            employeeId:{
                required:true
            },
            dueDate: {
                required: true
            },
            importance: {
                required: true
            },
            urgency: {
                required: true
            },
            tStatus: {
                required: true
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
           // alert(taskAddForm.attr('action'));
            var url = taskAddForm.attr('action');
            var data = {
                name: $('#name').val(),
                taskCategoryId: $('#taskCategoryId').val(),
                employeeId: $('#employeeId').val(),
                startDate: $('#startDate').val(),
                dueDate: $('#dueDate').val(),
                tStatus: $('#tStatus').val(),
                importance: $('#importance').val(),
                urgency: $('#urgency').val(),
                description: $('#description').val(),

            };

            $.ajax({
                url: url,
                type: 'POST',
                dataType: "json",
                data: JSON.stringify(data),
                contentType: "application/json; charset=utf-8",
                success: function(data) {
                    showAlertMessage('successMessage','Task added successfuly. You can view the task details in <a href="/tasks"><i class="icon-users"></i> Tasks</a>.','success','fa-check fa-lg');
                    window.location.replace("/tasks");
                },
                error: function(data) {
                    showAlertMessage('internaleServerError', data, 'danger', 'fa-warning fa-lg');
                }
            });
        }

    });

     //apply validation on select2 dropdown value change, this only needed for chosen dropdown integration.
    $('.select2me', taskAddForm).change(function () {
        taskAddForm.validate().element($(this)); //revalidate the chosen dropdown value and show error or success message for the input
    });

    //initialize datepicker
    $('.date-picker').datepicker({
        rtl: App.isRTL(),
        autoclose: true
    });
    $('.date-picker .form-control').change(function() {
        taskAddForm.validate().element($(this)); //revalidate the chosen dropdown value and show error or success message for the input 
    });

    populateEmployees(buildUrl(getAPIUrl(),'employees',getToken(), 3000),false);
    populateTaskCategory(buildUrl(getAPIUrl(),'task/categories',getToken(), 3000),false);
    addEmployee(buildUrl(getAPIUrl(),'employee',getToken(), null), buildUrl(getAPIUrl(),'employees',getToken(), 3000));
    addTaskCategory(buildUrl(getAPIUrl(),'task/category',getToken(), null),buildUrl(getAPIUrl(),'task/categories',getToken(), 3000));
});