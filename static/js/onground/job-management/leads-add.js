$().ready(function() {
    var leadsAddForm = $('#leads_add_form');
    var leadsAddFormErrors = $('.alert-danger', leadsAddForm);
    var leadsAddFormSuccess = $('.alert-success', leadsAddForm);

    //IMPORTANT: update CKEDITOR textarea with actual content before submit
    leadsAddForm.on('submit', function() {
        // for(var instanceName in CKEDITOR.instances) {
        //     CKEDITOR.instances[instanceName].updateElement();
        // }
    })

    leadsAddForm.validate({
        errorElement: 'span', //default input error message container
        errorClass: 'help-block help-block-error', // default input error message class
        focusInvalid: false, // do not focus the last invalid input
        ignore: "", // validate all fields including form hidden input
        rules: {
            customerId: {
                required: true
            },
            itemId: {
                required: true
            },
            city: {
                required: true
            },
            address: {
                required: true
            },
            leadStatus: {
                required: true
            },
            dueDate:{
                required: true
            },
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
           // alert(leadsAddForm.attr('action'));
            var url = leadsAddForm.attr('action');
            var data = {
                customerId: $('#customerId').val(),
                itemId: $('#itemId').val(),
                city: $('#city').val(),
                address: $('#address').val(),
                referralType: $('#referralType').val(),
                customerId: $('#customerId').val(),
                vendorId: $('#vendorId').val(),
                aggregatorId: $('#aggregatorId').val(),
                referralTrackingId: $('#referralTrackingId').val(),
                couponId: $('#couponId').val(),
                leadStatus: $('#leadStatus').val(),
                channel: $('#channel').val(),
                dueDate: $('#dueDate').val(),
                createdOn: $('#createdOn').val(),
                description: $('#description').val(),
            };

            $.ajax({
                url: url,
                type: 'POST',
                dataType: "json",
                data: JSON.stringify(data),
                contentType: "application/json; charset=utf-8",
                success: function(data) {
                    //showAlertMessage('successMessage','leads added successfuly. You can view the leads details in <a href="/leadss"><i class="icon-basket-loaded"></i> leadss</a>.','success','fa-check fa-lg');
                    window.location.replace("/leads");
                },
                error: function(data) {
                    showAlertMessage('internaleServerError', data, 'danger', 'fa-warning fa-lg');
                }
            });
        }

    });

     //apply validation on select2 dropdown value change, this only needed for chosen dropdown integration.
    $('.select2me', leadsAddForm).change(function () {
        leadsAddForm.validate().element($(this)); //revalidate the chosen dropdown value and show error or success message for the input
    });

    //initialize datepicker
    $('.date-picker').datepicker({
        rtl: App.isRTL(),
        autoclose: true
    });
    $('.date-picker .form-control').change(function() {
        leadsAddForm.validate().element($(this)); //revalidate the chosen dropdown value and show error or success message for the input 
    });


    populateCustomers(buildUrl(getAPIUrl(),'customers',getToken(), 3000),false);
    populateItems(buildUrl(getAPIUrl(),'items',getToken(), 3000),false);
    addItem(buildUrl(getAPIUrl(),'item',getToken(), null), buildUrl(getAPIUrl(),'items',getToken(), 3000));
    addCustomer(buildUrl(getAPIUrl(),'customer',getToken(), null),buildUrl(getAPIUrl(),'customers',getToken(), 3000));
   
    $('#referralType').change(function() {
        if ($(this).val() === 'Customer') {
            $('#customerOption').removeClass('hide');
            $('#vendorOption').addClass('hide');
            $('#leadSourcesOption').addClass('hide');
            $('#leadSourcesOption').addClass('hide');
            $("#customerId").select2({
              placeholder: "Select a customer",
              allowClear: true
            });
        } else if ($(this).val() === 'Vendor') {
            $('#customerOption').addClass('hide');
            $('#vendorOption').removeClass('hide');
            $('#leadSourcesOption').addClass('hide');
            $('#leadSourcesOption').addClass('hide');
            $("#vendorId").select2({
              placeholder: "Select a vendor",
              allowClear: true
            });
        } else if ($(this).val() === 'Lead Source') {
            $('#customerOption').addClass('hide');
            $('#vendorOption').addClass('hide');
            $('#leadSourcesOption').removeClass('hide');
            $('#leadSourcesOption').removeClass('hide');
            $("#aggregatorId").select2({
              placeholder: "Select a Lead Source",
              allowClear: true
            });
            
        } else {
            $('#customerOption').addClass('hide');
            $('#vendorOption').addClass('hide');
            $('#leadSourcesOption').addClass('hide');
            $('#leadSourcesOption').addClass('hide');
        }
    });
});