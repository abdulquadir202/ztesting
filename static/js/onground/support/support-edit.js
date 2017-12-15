$().ready(function() {
    var ticketsAddForm = $('#tickets_add_form');
    var ticketsAddFormErrors = $('.alert-danger', ticketsAddForm);
    var ticketsAddFormSuccess = $('.alert-success', ticketsAddForm);

    //IMPORTANT: update CKEDITOR textarea with actual content before submit
    ticketsAddForm.on('submit', function() {
        // for(var instanceName in CKEDITOR.instances) {
        //     CKEDITOR.instances[instanceName].updateElement();
        // }
    })

    ticketsAddForm.validate({
        errorElement: 'span', //default input error message container
        errorClass: 'help-block help-block-error', // default input error message class
        focusInvalid: false, // do not focus the last invalid input
        ignore: "", // validate all fields including form hidden input
        rules: {
            title: {
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
            // alert(ordersAddForm.attr('action'));
            var url = ticketsAddForm.attr('action');
            var data = {
                id: $('#tokenId').val(),
                title: $('#title').val(),
                customerId: $('#customerId').val(),
                dueDate: $('#dueDate').val(),
                employeeId: $('#employeeId').val(),
                type: $('#type').val(),
                itemId: $('#itemId').val(),
                priority: $('#priority').val(),
                istatus: $('#istatus').val(),
                description: $('#description').val()
            };

            $.ajax({
                url: url,
                type: 'PUT',
                dataType: "json",
                data: JSON.stringify(data),
                contentType: "application/json; charset=utf-8",
                success: function(data) {
                   // alert('save');
                    //showAlertMessage('successMessage','orders added successfuly. You can view the orders details in <a href="/orderss"><i class="icon-basket-loaded"></i> orderss</a>.','success','fa-check fa-lg');
                    window.location.replace("/support/tickets");
                },
                error: function(data) {
                                      //  alert('errors');

                    showAlertMessage('internaleServerError', data, 'danger', 'fa-warning fa-lg');
                }
            });
        }

    });

    //apply validation on select2 dropdown value change, this only needed for chosen dropdown integration.
    $('.select2me', ticketsAddForm).change(function () {
        ticketsAddForm.validate().element($(this)); //revalidate the chosen dropdown value and show error or success message for the input
    });

    


    $.ajax({
       // url: $('#url').val(),
        url : ticketsAddForm.attr('action'),
        type: 'GET',
        success: function(data) {
            //alert(JSON.stringify(data));
            if (data) {
                //alert(JSON.stringify(data));
                $('.lid').html(data.tokenId);
                $('#title').val(data.title);
                $('#customerId').val(data.customerId);
                $('#dueDate').val(data.dueDate);
                $('#employeeId').val(data.employeeId);
                $('#type').val(data.type);
                $('#itemId').val(data.itemId);
                $('#priority').val(data.priority);
                $('#istatus').val(data.status);
                $('#description').val(data.description);
            }
        },
        error: function(data) {
            showAlertMessage('internaleServerError', data, 'danger', 'fa-warning fa-lg');
        }
    });

    addEmployee(buildUrl(getAPIUrl(),'employee', getToken(), null),buildUrl(getAPIUrl(),'employees', getToken(), 3000));
    populateEmployees(buildUrl(getAPIUrl(),'employees', getToken(), 3000),false);
    populateCustomers(buildUrl(getAPIUrl(),'customers', getToken(), 3000),false);
    populateItems(buildUrl(getAPIUrl(),'items', getToken(), 3000),false);

    addItem(buildUrl(getAPIUrl(),'item', getToken(), null), buildUrl(getAPIUrl(),'items', getToken(), 3000));
    addCustomer(buildUrl(getAPIUrl(),'customer', getToken(), null),buildUrl(getAPIUrl(),'customers', getToken(), 3000));
});