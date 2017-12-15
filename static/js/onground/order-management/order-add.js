$().ready(function() {
    var orderAddForm = $('#order_add_form');
    var orderAddFormErrors = $('.alert-danger', orderAddForm);
    var orderAddFormSuccess = $('.alert-success', orderAddForm);

    //IMPORTANT: update CKEDITOR textarea with actual content before submit
    orderAddForm.on('submit', function() {
        // for(var instanceName in CKEDITOR.instances) {
        //     CKEDITOR.instances[instanceName].updateElement();
        // }
    })

    orderAddForm.validate({
        errorElement: 'span', //default input error message container
        errorClass: 'help-block help-block-error', // default input error message class
        focusInvalid: false, // do not focus the last invalid input
        ignore: "", // validate all fields including form hidden input
        rules: {
            orderDate:{
                required: true
            },
            customerId: {
                required: true
            },
            grossTotal: {
                required: true
            },
            amountPaid: {
                required: true
            },
            orderStatus: {
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
           // alert(orderAddForm.attr('action'));
            var url = orderAddForm.attr('action');
            var data = {
                orderId: $('#orderId').val() || '',
                orderDate: getDate($('#orderDate').val()),
                customerId: $('#customerId').val(),
                itemId: $('#itemId').val(),
                grossTotal: parseFloat($('#grossTotal').val()),
                amountPaid: parseFloat($('#amountPaid').val()),
                deliveryAddress: $('#deliveryAddress').val(),
                orderStatus: $('#orderStatus').val()
            };
            $.ajax({
                url: url,
                type: 'POST',
                dataType: "json",
                data: JSON.stringify(data),
                contentType: "application/json; charset=utf-8",
                success: function(data) {
                    //showAlertMessage('successMessage','Order added successfuly. You can view the order details in <a href="/orders"><i class="icon-basket-loaded"></i> Orders</a>.','success','fa-check fa-lg');
                    if($("#sendSms").is(':checked')){
                        var getAPIUrl = $('#apiUrl').val()+ '/api/bulksms?token='+$('#token').val();
                        var data1 = {
                            mobile: data.customer.mobile,
                            message: 'Dear '+data.customer.name+', thank you for shopping with us. Your order id is '+data.result   .orderId+'. Please visit again to shop more. Happy shopping'
                        };
                        $.ajax({
                            url: getAPIUrl,
                            type: 'POST',
                            dataType: "json",
                            data: JSON.stringify(data1),
                            contentType: "application/json; charset=utf-8",
                            success: function(data) {
                                showAlertMessage('successMessage','Order added successfuly.','success','fa-check fa-lg');
                                window.location.replace("/orders");
                            },
                            error: function(data) {
                                showAlertMessage("Something went wrong. Please try again with all the fields.");
                            }
                        });
                    }else{
                        window.location.replace("/orders");
                    }   
                },
                error: function(data) {
                    showAlertMessage('internaleServerError', data, 'danger', 'fa-warning fa-lg');
                }
            });
        }

    });

     //apply validation on select2 dropdown value change, this only needed for chosen dropdown integration.
    $('.select2me', orderAddForm).change(function () {
        orderAddForm.validate().element($(this)); //revalidate the chosen dropdown value and show error or success message for the input
    });

    //initialize datepicker
    $('.date-picker').datepicker({
        rtl: App.isRTL(),
        autoclose: true
    });
    $('.date-picker .form-control').change(function() {
        orderAddForm.validate().element($(this)); //revalidate the chosen dropdown value and show error or success message for the input 
    });

    populateCustomers(buildUrl(getAPIUrl(),'customers', getToken(), 7000),false);
    populateItems(buildUrl(getAPIUrl(),'items', getToken(), 3000),false);
    addItem(buildUrl(getAPIUrl(),'item', getToken(), null), buildUrl(getAPIUrl(),'items', getToken(), 3000));
    addCustomer(buildUrl(getAPIUrl(),'customer', getToken(), null),buildUrl(getAPIUrl(),'customers', getToken(), 7000));

    $('#orderDate').val(moment().format('DD-MM-YYYY'));

    $("#grossTotal").bind("change paste keyup", function() {
        if($.isNumeric($("#grossTotal").val()) && $.isNumeric($('#amountPaid').val())){
            $('#amountPaid').val($("#grossTotal").val());
            $('#amountDueDiv').removeClass("hide");
            $('#amountDue').html(parseFloat($('#grossTotal').val()) - parseFloat($('#amountPaid').val()));
        }
    });
    $("#amountPaid").bind("change paste keyup", function() {
        if($.isNumeric($("#grossTotal").val()) && $.isNumeric($('#amountPaid').val())){
            $('#amountDueDiv').removeClass("hide");
            $('#amountDue').html(parseFloat($('#grossTotal').val()) - parseFloat($('#amountPaid').val()));
        }
    });
});