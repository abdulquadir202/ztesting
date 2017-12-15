
$().ready(function() {
    var couponData = null;

    var updateDetails = function(){

        $('#displayCouponName').html(couponData.couponCode);
        $('#displayCouponType').html(couponData.couponType);
        $('#displayValidTill').html(moment(new Date(couponData.validTill)).format("DD-MMM-YYYY"));
        $('#displayMinimumOrder').html(couponData.minOrder);
        $('#displayDiscountType').html(couponData.discountType);
        $('#displayAmount').html(couponData.discountPercentage != undefined ? couponData.discountAmount: couponData.discountAmount);
        $('#displayterms').html(couponData.termsAndCondition);
        $('#displayDescription').html(couponData.description);
    };  
    
    $.ajax({
        url: $('#url').val(),
        type: 'GET',
        success: function(data) {
            if (data) {
                couponData = data.coupon;
                updateDetails();
            }
        },
        error: function(data) {
            showAlertMessage('internaleServerError', data, 'danger', 'fa-warning fa-lg');
        }
    });

    $("#showEdit").on('click',function(event){
        //populate edit form data
    
        $('#name').val(couponData.coupon.name);
        $('#couponCategoryId').val(couponData.coupon.category.name);
        $('#couponType').val(couponData.coupon.type);
        $('#couponUnit').val(couponData.coupon.unit);
        $('#price').val(couponData.coupon.price);
        $('#description').val(couponData.coupon.description);

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
                    window.location = '/coupons';
                }
            },
            error: function(data) {
                showAlertMessage('internaleServerError', data, 'danger', 'fa-warning fa-lg');
            }
        });
    });

    // $("#updateCustomer").on('click',function(event){

    // });

    var couponsEditForm = $('#coupons_edit_form');
    var couponsEditFormErrors = $('.alert-danger', couponsEditForm);
    var couponsEditFormSuccess = $('.alert-success', couponsEditForm);

    //IMPORTANT: update CKEDITOR textarea with actual content before submit
    couponsEditForm.on('submit', function() {
        // for(var instanceName in CKEDITOR.instances) {
        //     CKEDITOR.instances[instanceName].updateElement();
        // }
    })

    couponsEditForm.validate({
        errorElement: 'span', //default input error message container
        errorClass: 'help-block help-block-error', // default input error message class
        focusInvalid: false, // do not focus the last invalid input
        ignore: "", // validate all fields including form hidden input
        rules: {
           name: {
                required: true
            },
            categoryId: {
                required: true
            },
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
           // alert(couponsEditForm.attr('action'));
            var url = couponsEditForm.attr('action');

            // var data = new FormData();
            // jQuery.each(jQuery('#profilePic')[0].files, function(i, file) {
            //     data.append('file-'+i, file);
            // });

            var data = {
                id:$('#couponId').val(),
                name: $('#name').val(),
                categoryId: $('#couponCategoryId').val(),
                type: $('#couponType').val(),
                unit: $('#couponUnit').val(),
                price: $('#price').val(),
                description: $('#description').val()
            };

            $.ajax({
                url: url,
                type: 'PUT',
                dataType: "json",
                data: JSON.stringify(data),
                contentType: "application/json; charset=utf-8",
                success: function(data1) {
                    showAlertMessage('successMessage','Coupons updated successfuly.','success','fa-check fa-lg');
                    window.location.replace("/coupons");
                    couponData = data1.result;

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
    $('.select2me', couponsEditForm).change(function () {
        couponsEditForm.validate().element($(this)); //revalidate the chosen dropdown value and show error or success message for the input
    });

    //initialize datepicker
    $('.date-picker').datepicker({
        rtl: App.isRTL(),
        autoclose: true
    });
    $('.date-picker .form-control').change(function() {
        couponsEditForm.validate().element($(this)); //revalidate the chosen dropdown value and show error or success message for the input 
    });
});