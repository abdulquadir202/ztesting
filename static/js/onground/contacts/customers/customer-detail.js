$().ready(function() {
    var custData = null;

    var updateDetails = function(){

        $('#displayName').html(custData.name);
        $('#displayMobile').html(custData.mobile);
        $('#displayEmail').html(custData.email);
        $('#displayAddress').html(custData.address);
    };
    
    $.ajax({
        url: $('#url').val(),
        type: 'GET',
        success: function(data) {
            if (data) {
                custData = data;
                updateDetails();
            }
        },
        error: function(data) {
            showAlertMessage('internaleServerError', data, 'danger', 'fa-warning fa-lg');
        }
    });

    $("#showEdit").on('click',function(event){
         //populate edit form data
        $('#name').val(custData.name);
        $('#mobile').val(custData.mobile);
        $('#email').val(custData.email);
        $('#address').val(custData.address);

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
                    window.location = '/admin/customers';
                }
            },
            error: function(data) {
                showAlertMessage('internaleServerError', data, 'danger', 'fa-warning fa-lg');
            }
        });
    });

    // $("#updateCustomer").on('click',function(event){

    // });

    var customerAddForm = $('#customer_edit_form');
    var customerAddFormErrors = $('.alert-danger', customerAddForm);
    var customerAddFormSuccess = $('.alert-success', customerAddForm);

    //IMPORTANT: update CKEDITOR textarea with actual content before submit
    customerAddForm.on('submit', function() {
        // for(var instanceName in CKEDITOR.instances) {
        //     CKEDITOR.instances[instanceName].updateElement();
        // }
    })

    customerAddForm.validate({
        errorElement: 'span', //default input error message container
        errorClass: 'help-block help-block-error', // default input error message class
        focusInvalid: false, // do not focus the last invalid input
        ignore: "", // validate all fields including form hidden input
        rules: {
            name: {
                required: true
            },
            email: {
                email: true
            },
            mobile: {
                // required: true,
                number: true,
                maxlength:10,
                minlength: 10
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
           // alert(customerAddForm.attr('action'));
            var url = customerAddForm.attr('action');

            // var data = new FormData();
            // jQuery.each(jQuery('#profilePic')[0].files, function(i, file) {
            //     data.append('file-'+i, file);
            // });

            var data = {
                id: $('#customerId').val(),
                mobile: $('#mobile').val() !== '' ? $('#mobile').val() : null,
                name: $('#name').val(),
                email: $('#email').val() !== '' ? $('#email').val() : null,
                address: $('#address').val() !== '' ? $('#address').val() : null
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
                    showAlertMessage('successMessage','Customer updated successfuly.','success','fa-check fa-lg');
                    //window.location.replace("/sales-ledger");
                    custData = data1.result;

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
    $('.select2me', customerAddForm).change(function () {
        customerAddForm.validate().element($(this)); //revalidate the chosen dropdown value and show error or success message for the input
    });

    //initialize datepicker
    $('.date-picker').datepicker({
        rtl: App.isRTL(),
        autoclose: true
    });
    $('.date-picker .form-control').change(function() {
        customerAddForm.validate().element($(this)); //revalidate the chosen dropdown value and show error or success message for the input 
    });
});