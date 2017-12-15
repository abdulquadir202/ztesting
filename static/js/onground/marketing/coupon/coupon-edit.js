$().ready(function() {
    var couponsAddForm = $('#coupons_add_form');
    var couponsAddFormErrors = $('.alert-danger', couponsAddForm);
    var couponsAddFormSuccess = $('.alert-success', couponsAddForm);

    //IMPORTANT: update CKEDITOR textarea with actual content before submit
    couponsAddForm.on('submit', function() {
        // for(var instanceName in CKEDITOR.instances) {
        //     CKEDITOR.instances[instanceName].updateElement();
        // }
    })


    couponsAddForm.validate({
        errorElement: 'span', //default input error message container
        errorClass: 'help-block help-block-error', // default input error message class
        focusInvalid: false, // do not focus the last invalid input
        ignore: "", // validate all fields including form hidden input
        rules: {
            couponName: {
                required: true
            },
            couponType: {
                required: true
            },
            validTill: {
                required: true
            },
            discountType: {
                required: true
            },
            minOrder: {
                required: true
            },
            amount:{
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
            // alert(couponsAddForm.attr('action'));
            var url = couponsAddForm.attr('action');
            var data = {
                couponCode: $('#couponName').val(),
                couponType: $('#couponType').val(),
                validTill: getDate($('#validTill').val()),
                discountType: $('#discountType').val(),
                minOrder: parseInt($('#minOrder').val()),
                termsAndCondition: $('#terms').val(),
                discountAmount:  parseInt($('#amount').val()),
                description: $('#description').val()
            };
            $.ajax({
                url: url,
                type: 'PUT',
                dataType: "json",
                data: JSON.stringify(data),
                contentType: "application/json; charset=utf-8",
                success: function(data) {
                    //showAlertMessage('successMessage','coupons added successfuly. You can view the coupons details in <a href="/couponss"><i class="icon-basket-loaded"></i> couponss</a>.','success','fa-check fa-lg');
                    window.location.replace("/coupons/"+data.result.id);
                },
                error: function(data) {
                    showAlertMessage('internaleServerError', data, 'danger', 'fa-warning fa-lg');
                }
            });
        }

    });

    //apply validation on select2 dropdown value change, this only needed for chosen dropdown integration.
    $('.select2me', couponsAddForm).change(function () {
        couponsAddForm.validate().element($(this)); //revalidate the chosen dropdown value and show error or success message for the input
    });

    //initialize datepicker
    $('.date-picker').datepicker({
        rtl: App.isRTL(),
        autoclose: true
    });
    $('.date-picker .form-control').change(function() {
        couponsAddForm.validate().element($(this)); //revalidate the chosen dropdown value and show error or success message for the input
    });


    $.ajax({
       // url: $('#url').val(),
        url : couponsAddForm.attr('action'),
        type: 'GET',
        success: function(data) {
            if (data) {
                var token = $('#token').val();
                var sUrl = $('#apiUrl').val();

                $('.lid').html(data.coupon.couponCode);
                $('#couponName').val(data.coupon.couponCode);
                $('#couponType').val(data.coupon.couponType);
                $('#validTill').val(moment(new Date(data.coupon.validTill)).format("DD-MMM-YYYY"));
                $('#minOrder').val(data.coupon.minOrder);
                $('#discountType').val(data.coupon.discountType);
                $('#amount').val(data.coupon.discountAmount);
                $('#terms').val(data.coupon.termsAndCondition);
                $('#description').val(data.coupon.description);
            }
        },
        error: function(data) {
            showAlertMessage('internaleServerError', data, 'danger', 'fa-warning fa-lg');
        }
    });


});