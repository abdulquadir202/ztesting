$().ready(function() {
	
    var tasksAddForm = $('#tasks_add_form');
    var tasksAddFormErrors = $('.alert-danger', tasksAddForm);
    var tasksAddFormSuccess = $('.alert-success', tasksAddForm);

    //IMPORTANT: update CKEDITOR textarea with actual content before submit
    tasksAddForm.on('submit', function() {
        // for(var instanceName in CKEDITOR.instances) {
        //     CKEDITOR.instances[instanceName].updateElement();
        // }
    })

    tasksAddForm.validate({
        errorElement: 'span', //default input error message container
        errorClass: 'help-block help-block-error', // default input error message class
        focusInvalid: false, // do not focus the last invalid input
        ignore: "", // validate all fields including form hidden input
        rules:  {
            name: {
                required: true
            },
            taskCategoryId:{
                required:true
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
            // alert(tasksAddForm.attr('action'));
            var url = tasksAddForm.attr('action');
            var data = {
                name: $('#name').val(),
                taskCategoryId: $('#taskCategoryId').val(),
                employeeId: $('#employeeId').val(),
                startDate: $('#startDate').val(),
                dueDate: $('#dueDate').val(),
                tStatus: $('#tStatus').val(),
                importance: $('#importance').val(),
                urgency: $('#urgency').val(),
                description: $('#description').val()
            };

            $.ajax({
                url: url,
                type: 'PUT',
                dataType: "json",
                data: JSON.stringify(data),
                contentType: "application/json; charset=utf-8",
                success: function(data) {
                    //showAlertMessage('successMessage','tasks added successfuly. You can view the tasks details in <a href="/taskss"><i class="icon-basket-loaded"></i> taskss</a>.','success','fa-check fa-lg');
                    window.location.replace("/tasks");
                },
                error: function(data) {
                    showAlertMessage('internaleServerError', data, 'danger', 'fa-warning fa-lg');
                }
            });
        }

    });

    //apply validation on select2 dropdown value change, this only needed for chosen dropdown integration.
    $('.select2me', tasksAddForm).change(function () {
        tasksAddForm.validate().element($(this)); //revalidate the chosen dropdown value and show error or success message for the input
    });

    //initialize datepicker
    $('.date-picker').datepicker({
        rtl: App.isRTL(),
        autoclose: true
    });
    $('.date-picker .form-control').change(function() {
        tasksAddForm.validate().element($(this)); //revalidate the chosen dropdown value and show error or success message for the input
    });


    $.ajax({
       // url: $('#url').val(),
        url : tasksAddForm.attr('action'),
        type: 'GET',
        success: function(data) {
            if (data) {

                var token = getToken();
                var sUrl = getAPIUrl();
                populateEmployees(buildUrl(sUrl,'employees', token, 200),false);
				addEmployee(buildUrl(sUrl,'employee', token, null),buildUrl(sUrl,'employees', token, 200));
				populateTaskCategory(buildUrl(sUrl,'task/categories', token, 200),false);
				addTaskCategory(buildUrl(sUrl,'task/category', token, null),buildUrl(sUrl,'task/categories', token, 200));   
				$('.tid').html(data.task.taskId);
				$('#name').val(data.task.name),
				$('#taskCategoryId').val(data.task.taskCategoryId),
                $('#employeeId').val(data.task.employeeId),
                $('#startDate').val(data.task.startDate != undefined ? moment(data.task.startDate).format("YYYY-MM-DD HH:mm"):''),
                $('#dueDate').val(data.task.dueDate != undefined ? moment(data.task.dueDate).format("YYYY-MM-DD HH:mm"):''),
                $('#tStatus').val( data.task.tStatus),
                $('#importance').val(data.task.importance ),
                $('#urgency').val(data.task.urgency),
                $('#description').val(data.task.description),

				$("#taskStatus").select2({
				value: data.taskStatus
				});
            }
        },
        error: function(data) {
            showAlertMessage('internaleServerError', data, 'danger', 'fa-warning fa-lg');
        }
    });

});