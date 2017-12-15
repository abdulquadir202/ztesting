 $().ready(function() {
    var subscriptionEditForm = $('#subscription_edit_form');
    var subscriptionEditFormErrors = $('.alert-danger', subscriptionEditForm);
    var subscriptionEditFormSuccess = $('.alert-success', subscriptionEditForm);

    //IMPORTANT: update CKEDITOR textarea with actual content before submit
    subscriptionEditForm.on('submit', function() {
        // for(var instanceName in CKEDITOR.instances) {
        //     CKEDITOR.instances[instanceName].updateElement();
        // }
    })

    subscriptionEditForm.validate({
        errorElement: 'span', //default input error message container
        errorClass: 'help-block help-block-error', // default input error message class
        focusInvalid: false, // do not focus the last invalid input
        ignore: "", // validate all fields including form hidden input
        rules: {
           type: {
                required: true
            }
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
           // alert(authorsEditForm.attr('action'));
            //var url = maintenanceEditForm.attr('action');
            var url = $('#url').val();
            // var data = new FormData();
            // jQuery.each(jQuery('#profilePic')[0].files, function(i, file) {
            //     data.append('file-'+i, file);
            // });

            var data = {
                id:$('#maintenanceId').val(),
                type: $('#type').val(),
                assetId: $('#assetId').val(),
                dueDate: $('#dueDate').val(),
                itemId: $('#itemId').val(),
                employeeId: $('#employeeId').val(),
                mstatus: $('#status').val(),
                description: $('#description').val()
            };
           // alert(url);

            $.ajax({
                url: url,
                type: 'PUT',
                dataType: "json",
                data: JSON.stringify(data),
                contentType: "application/json; charset=utf-8",
                success: function(data1) {
                    showAlertMessage('successMessage','Authors updated successfuly.','success','fa-check fa-lg');
                    window.location.replace("/subscriptions");
                    subscriptionData = data1.result;

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
    $('.select2me', subscriptionEditForm).change(function () {
        subscriptionEditForm.validate().element($(this)); //revalidate the chosen dropdown value and show error or success message for the input
    });

    //initialize datepicker
    $('.date-picker').datepicker({
        rtl: App.isRTL(),
        autoclose: true
    });
    $('.date-picker .form-control').change(function() {
        subscriptionEditForm.validate().element($(this)); //revalidate the chosen dropdown value and show error or success message for the input 
    });



    populateCustomers(buildUrl(getAPIUrl(),'customers', getToken(), 3000),false);
    addCustomer(buildUrl(getAPIUrl(),'customer', getToken(), null),buildUrl(getAPIUrl(),'customers', getToken(), 3000));
    populateItems(buildUrl(getAPIUrl(),'items', getToken(), 3000),false);
    addItem(buildUrl(getAPIUrl(),'item', getToken(), null),buildUrl(getAPIUrl(),'items', getToken(), 3000));
    alert(subscriptionEditForm.attr('action'))
    $.ajax({
       // url: $('#url').val(),
        url : subscriptionEditForm.attr('action'),
        type: 'GET',
        success: function(data) {
            alert(JSON.stringify(data));
            if (data) {
                var date = moment(new Date(data.dueDate)).format("DD-MMM-YYYY");
                $('#customerId').val(data.customer.id);
                $('#itemId').val(data.customer.id);
                $('#dueDate').val(date);
                $('#startDate').val(data.itemId);
                $('#endDate').val();
                $('#dueDate').val();
                $('#location').val(data.location);
                $('#noservice').val(data.noservice);
                $('#tamount').val(data.tamount);
                $('#samount').val(data.samount);
                $('#tax').val(data.tax);
                $('#frequency').val(data.frequency);
                $('#taxClass').val(data.taxClass);
                $('#payment').val(data.payment);
                $('#paymentMode').val(data.paymentMode);
                $('#payable').val(data.payable);
            }
        },
        error: function(data) {
            showAlertMessage('internaleServerError', data, 'danger', 'fa-warning fa-lg');
        }
    });
    $('#startDate').val(moment().format('MM-DD-YYYY'));
    $('#endDate').val(moment().format('MM-DD-YYYY'));
    $('#dueDate').val(moment().format('MM-DD-YYYY'));



});
    