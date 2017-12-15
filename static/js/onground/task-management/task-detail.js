$().ready(function() {
    var taskData = null;

    var updateDetails = function(){

        $('#displayName').html(taskData.task.name);
        $('#displayCategory').html(taskData.task.category != undefined ? taskData.task.category.name:'');
        if(taskData.task.employee){
            $('#displayAssignTo').html(taskData.task.employee.name);
        }
        $('#displayStartDate').html(taskData.task != undefined ? moment(new Date(taskData.task.startDate)).format("DD MMMM YYYY - HH:mm"):'');
        $('#displayDueDate').html(taskData.task != undefined ? moment(new Date(taskData.task.dueDate)).format("DD MMMM YYYY - HH:mm"):'');
        $('#displayImportance').html(taskData.task.importance);
        $('#displayUrgency').html(taskData.task.urgency);
        $('#displayStatus').html(taskData.task.tStatus);
        $('#displayDescription').html(taskData.task.description);
    };
    
    $.ajax({
        url: $('#url').val(),
        type: 'GET',
        success: function(data) {
            if (data) {
                taskData = data;
                updateDetails();
            }
        },
        error: function(data) {
            showAlertMessage('internaleServerError', data, 'danger', 'fa-warning fa-lg');
        }
    });

    $("#showEdit").on('click',function(event){
         //populate edit form data
        $('#name').val(taskData.task.name);
        $('#taskCategoryId').val(taskData.task.taskCategoryId);
        $('#employeeId').val(taskData.task.employeeId);

        $('#displayStartDate').val(taskData.task != undefined ? moment(taskData.task.startDate).format("DD MMMM YYYY - HH:mm"):'');
        $('#displayDueDate').val(taskData.task != undefined ? moment(taskData.task.dueDate).format("DD MMMM YYYY - HH:mm"):'');
        $('#tStatus').val(taskData.task.tStatus);
        $('#importance').val(taskData.task.importance);
        $('#urgency').val(taskData.task.urgency);
        $('#description').val(taskData.task.description);

        $('#detail').addClass('hidden');
        $('#edit').removeClass('hidden');
    });

    $("#cancelEdit").on('click',function(event){
        $('#detail').removeClass('hidden');
        $('#edit').addClass('hidden');
    });

    $("#showDetail").on('click',function(event){
        $('#detail').removeClass('hidden');
        $('#edit').addClass('hidden');
    });

    $("#delete").on('click',function(event){
        $.ajax({
            url: $('#url').val(),
            type: 'DELETE',
            success: function(data) {
                if (data && data.status) {
                    //showAlertMessage('successMessage','Customer deleted successfuly.','success','fa-check fa-lg');
                    window.location = '/tasks';
                }
            },
            error: function(data) {
                showAlertMessage('internaleServerError', data, 'danger', 'fa-warning fa-lg');
            }
        });
    });

    // $("#updateCustomer").on('click',function(event){

    // });

    var taskAddForm = $('#task_edit_form');
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
           // alert(taskAddForm.attr('action'));
            var url = taskAddForm.attr('action');

            // var data = new FormData();
            // jQuery.each(jQuery('#profilePic')[0].files, function(i, file) {
            //     data.append('file-'+i, file);
            // });
            var data = {
                id: $('#taskId').val(),
                name: $('#name').val(),
                taskCategoryId: $('#taskCategoryId').val() !== '' ? $('#taskCategoryId').val() : null,
                employeeId: $('#employeeId').val() !== '' ? $('#employeeId').val() : null,
                startDate: getDateTime($('#startDate').val()),
                dueDate: getDateTime($('#dueDate').val()),
                tStatus: $('#tStatus').val() !== '' ? $('#tStatus').val() : null,
                importance: $('#importance').val() !== '' ? $('#importance').val() : null,
                urgency: $('#urgency').val() !== '' ? $('#urgency').val() : null,
                description: $('#description').val() !== '' ? $('#description').val() : null
            };
            // data.append('mobile', $('#mobile').val());
            // data.append('name', $('#name').val());
            // data.append('email', $('#email').val());
            // data.append('address', $('#address').val());
            //data.append('profilePic', $('#profilePic').val());

            // var data = new FormData();
            // jQuery.each(jQuery('#profilePic')[0].files, function(i, file) {
            //     data.append('file-'+i, file);
            // });
            $.ajax({
                // url: url,
                // type: 'POST',
                // //dataType: "json"
                // cache: false,
                // contentType: false,
                // processData: false,
                // //type: 'POST',
                // data: data,//JSON.stringify(data),
                // //contentType: false,//"application/json; charset=utf-8",
                url: url,
                type: 'PUT',
                dataType: "json",
                data: JSON.stringify(data),
                contentType: "application/json; charset=utf-8",
                success: function(data1) {
                    showAlertMessage('successMessage','Task updated successfuly.','success','fa-check fa-lg');
                    window.location.replace("/tasks");
                    taskData = data1.result;

                    updateDetails();

                    $('#detail').removeClass('hidden');
                    $('#edit').addClass('hidden');
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
});