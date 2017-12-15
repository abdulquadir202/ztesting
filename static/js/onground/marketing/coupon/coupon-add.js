$().ready(function() {
    var couponAddForm = $('#coupon_add_form');
    var couponAddFormErrors = $('.alert-danger', couponAddForm);
    var couponAddFormSuccess = $('.alert-success', couponAddForm);

    //IMPORTANT: update CKEDITOR textarea with actual content before submit
    couponAddForm.on('submit', function() {
        // for(var instanceName in CKEDITOR.instances) {
        //     CKEDITOR.instances[instanceName].updateElement();
        // }
    })

    couponAddForm.validate({
        errorElement: 'span', //default input error message container
        errorClass: 'help-block help-block-error', // default input error message class
        focusInvalid: false, // do not focus the last invalid input
        ignore: "", // validate all fields including form hidden input
        rules: {
            validTill:{
                required: true
            },
            name: {
                required: true
            },
            discountType: {
                required: true
            },
            couponType: {
                required: true
            },
            couponStatus: {
                required: true
            },
            minOrder: {
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
           // alert(couponAddForm.attr('action'));
            var url = couponAddForm.attr('action');
            var data = {
                couponCode: $('#name').val(),
                couponType: $('#couponType').val(),
                discountAmount: parseInt($('#discountAmount').val()),
                discountType: $('#discountType').val(),
                minOrder: parseInt($('#minOrder').val()),
                validTill: getDate($('#validTill').val()),
                description: $('#description').val(),
                termsAndCondition: $('#terms').val()
            };
            $.ajax({
                url: url,
                type: 'POST',
                dataType: "json",
                data: JSON.stringify(data),
                contentType: "application/json; charset=utf-8",
                success: function(data) {
                    showAlertMessage('successMessage','Coupon added successfuly. You can view the coupon details in <a href="/coupons"><i class="icon-basket-loaded"></i> Coupons</a>.','success','fa-check fa-lg');
                    
                },
                error: function(data) {
                    showAlertMessage('internaleServerError', data, 'danger', 'fa-warning fa-lg');
                }
            });
        }

    });

     //apply validation on select2 dropdown value change, this only needed for chosen dropdown integration.
    $('.select2me', couponAddForm).change(function () {
        couponAddForm.validate().element($(this)); //revalidate the chosen dropdown value and show error or success message for the input
    });

    //initialize datepicker
    $('.date-picker').datepicker({
        rtl: App.isRTL(),
        autoclose: true
    });
    $('.date-picker .form-control').change(function() {
        couponAddForm.validate().element($(this)); //revalidate the chosen dropdown value and show error or success message for the input 
    });

    $('#orderDate').val(moment().format('DD-MM-YYYY'));
});