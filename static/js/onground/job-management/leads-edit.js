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
            //var dd = moment($('#dueDate').val()).format('DD MMMM YYYY - HH:mm');
            var url = leadsAddForm.attr('action');
            var data = {
                customerId: $('#customerId').val(),
                itemId: $('#itemId').val(),
                employeeId: $('#employeeId').val(),
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
                description: $('#description').val(),
                price: parseInt($('#price').val()),
                serviceCharge: parseInt($('#sCharge').val()) || 0,
                paid: parseInt($('#paid').val()) || parseInt($('#price').val()) || 0,
                dueAmount: parseInt($('#due').val()) || 0
            };

            $.ajax({
                url: url,
                type: 'PUT',
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


    $.ajax({
       // url: $('#url').val(),
        url : leadsAddForm.attr('action'),
        type: 'GET',
        success: function(data) {
            if (data) {
                var token = getToken();
                var sUrl = getAPIUrl();
                
                populateCustomers(buildUrl(sUrl,'customers', token, '3000'),false, data.customerId);
                populateItems(buildUrl(sUrl,'items', token, '3000'),false, data.itemId);
                populateEmployees(buildUrl(sUrl,'employees', token, '3000'),false, data.employeeId);
                if(data.vendorId && data.vendorId !='' && data.vendorId != null){
                    populateVendors(buildUrl(sUrl,'vendors', token, '3000'),false, data.vendorId);
                    addVendor(buildUrl(sUrl,'vendor', token, null), buildUrl(sUrl,'vendors', token, '3000'));
                    $('#vendorId').val(data.vendorId);
                }

                addItem(buildUrl(sUrl,'item', token, null), buildUrl(sUrl,'items', token, '3000'));
                addCustomer(buildUrl(sUrl,'customer', token, null),buildUrl(sUrl,'customers', token, '3000'));
                addEmployee(buildUrl(sUrl,'employee', token, null),buildUrl(sUrl,'employees', token, '3000'));


                $('.lid').html(data.leadId);
                $('#dueDate').val(data.dueDate != undefined ? moment(data.dueDate).format("YYYY-MM-DD HH:mm"):'');
                $('#customerId').val(data.customerId);
                $('#employeeId').val(data.employeeId);
                $('#address').val(data.address);
                $('#bill').val(data.leadId);
                $('#description').val(data.description);
                $('#price').val(data.price);
                $('#sCharge').val(data.serviceCharge);
                $('#paid').val(data.paid);
                $('#due').val(data.dueAmount);
                $('#referralType').val(data.referralType);
                $('#leadStatus').val(data.leadStatus);
                $("#leadStatus").select2({
                    value: data.leadStatus
                });
                $('#channel').val(data.channel);
                $("#channel").select2({
                    value: data.channel
                });
            }
        },
        error: function(data) {
            showAlertMessage('internaleServerError', data, 'danger', 'fa-warning fa-lg');
        }
    });

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