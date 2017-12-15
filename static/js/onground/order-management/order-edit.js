$().ready(function() {
    var ordersAddForm = $('#orders_add_form');
    var ordersAddFormErrors = $('.alert-danger', ordersAddForm);
    var ordersAddFormSuccess = $('.alert-success', ordersAddForm);

    //IMPORTANT: update CKEDITOR textarea with actual content before submit
    ordersAddForm.on('submit', function() {
        // for(var instanceName in CKEDITOR.instances) {
        //     CKEDITOR.instances[instanceName].updateElement();
        // }
    })

    ordersAddForm.validate({
        errorElement: 'span', //default input error message container
        errorClass: 'help-block help-block-error', // default input error message class
        focusInvalid: false, // do not focus the last invalid input
        ignore: "", // validate all fields including form hidden input
        rules: {
            customerId: {
                required: true
            },
            /*itemId: {
                required: true
            },*/
            orderDate: {
                required: true
            },
            grossTotal: {
                required: true
            },
            orderStatus: {
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
            // alert(ordersAddForm.attr('action'));
            var url = ordersAddForm.attr('action');


            var data = {
                customerId: $('#customerId').val(),
                //itemId: $('#itemId').val(),
                deliveryAddress: $('#deliveryAddress').val(),
                orderStatus: $('#orderStatus').val(),
                amountDue: parseInt($('#amountDue').val()),
                orderDate: getDate($('#orderDate').val()),
                description: $('#description').val(),
                grossTotal: parseInt($('#grossTotal').val())
            };


            $.ajax({
                url: url,
                type: 'PUT',
                dataType: "json",
                data: JSON.stringify(data),
                contentType: "application/json; charset=utf-8",
                success: function(data) {
                    //showAlertMessage('successMessage','orders added successfuly. You can view the orders details in <a href="/orderss"><i class="icon-basket-loaded"></i> orderss</a>.','success','fa-check fa-lg');
                    window.location.replace("/orders");
                },
                error: function(data) {
                    showAlertMessage('internaleServerError', data, 'danger', 'fa-warning fa-lg');
                }
            });
        }

    });

    //apply validation on select2 dropdown value change, this only needed for chosen dropdown integration.
    $('.select2me', ordersAddForm).change(function () {
        ordersAddForm.validate().element($(this)); //revalidate the chosen dropdown value and show error or success message for the input
    });

    //initialize datepicker
    $('.date-picker').datepicker({
        rtl: App.isRTL(),
        autoclose: true
    });
    $('.date-picker .form-control').change(function() {
        ordersAddForm.validate().element($(this)); //revalidate the chosen dropdown value and show error or success message for the input
    });


    $.ajax({
       // url: $('#url').val(),
        url : ordersAddForm.attr('action'),
        type: 'GET',
        success: function(data) {
            if (data) {
                var token = $('#token').val();
                var sUrl = $('#apiUrl').val();
                
                populateCustomers(buildUrl(sUrl,'customers', token, '3000'),false, data.customerId);
                populateItems(buildUrl(sUrl,'items', token, '3000'),false, data.itemId);

                addItem(buildUrl(sUrl,'item', token, null), buildUrl(sUrl,'items', token, '3000'));
                addCustomer(buildUrl(sUrl,'customer', token, null),buildUrl(sUrl,'customers', token, '3000'));

                $('.lid').html(data.orderId);
                $('#orderDate').val(moment(new Date(data.orderDate)).format('DD-MM-YYYY'));
                $('#customerId').val(data.customerId);
                $('#itemId').val(data.itemId);
                $('#description').val(data.description);
                $('#grossTotal').val(data.grossTotal);
                $('#amountDue').val(data.amountDue);
                $('#deliveryAddress').val(data.deliveryAddress);
                $('#orderStatus').val(data.orderStatus);
                $("#orderStatus").select2({
                    value: data.orderStatus
                });
            }
        },
        error: function(data) {
            showAlertMessage('internaleServerError', data, 'danger', 'fa-warning fa-lg');
        }
    });

});

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