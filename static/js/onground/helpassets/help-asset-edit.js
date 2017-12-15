$().ready(function() {
    var assetAddForm = $('#asset_add_form');
    var assetAddFormErrors = $('.alert-danger', assetAddForm);
    var assetAddFormSuccess = $('.alert-success', assetAddForm);

    //IMPORTANT: update CKEDITOR textarea with actual content before submit
    assetAddForm.on('submit', function() {
        // for(var instanceName in CKEDITOR.instances) {
        //     CKEDITOR.instances[instanceName].updateElement();
        // }
    })

    assetAddForm.validate({
        errorElement: 'span', //default input error message container
        errorClass: 'help-block help-block-error', // default input error message class
        focusInvalid: false, // do not focus the last invalid input
        ignore: "", // validate all fields including form hidden input
        rules: {
            tagId: {
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
            var url = assetAddForm.attr('action');
            var data = {
                id: $('#assetId').val(),
                tagId: $('#tagId').val(),
                customerId: $('#customerId').val(),
                type: $('#type').val(),
                description: $('#description').val(),
                price: $('#price').val(),
                astatus: $('#astatus').val()
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
                    window.location.replace("/asset");
                },
                error: function(data) {
                                      //  alert('errors');

                    showAlertMessage('internaleServerError', data, 'danger', 'fa-warning fa-lg');
                }
            });
        }

    });

    //apply validation on select2 dropdown value change, this only needed for chosen dropdown integration.
    $('.select2me', assetAddForm).change(function () {
        assetAddForm.validate().element($(this)); //revalidate the chosen dropdown value and show error or success message for the input
    });

    
    


    $.ajax({
       // url: $('#url').val(),
        url : assetAddForm.attr('action'),
        type: 'GET',
        success: function(data) {
           // alert(JSON.stringify(data));
            if (data) {
                populateCustomers(buildUrl(getAPIUrl(),'customers', getToken(), '3000'),false, data.customerId);
                

               
                addCustomer(buildUrl(getAPIUrl(),'customer', getToken(), null),buildUrl(getAPIUrl(),'customers', getToken(), '3000'));

                $('.lid').html(data.assetId);
                $('#customerId').val(data.customerId);
                $('#tagId').val(data.tagId);
                $('#description').val(data.description);
                $('#price').val(data.price);
                $('#astatus').val(data.astatus);
                $('#type').val(data.type);
            }
        },
        error: function(data) {
            showAlertMessage('internaleServerError', data, 'danger', 'fa-warning fa-lg');
        }
    });

     populateCustomers(buildUrl(getAPIUrl(),'customers', getToken(), 3000),false);
    addCustomer(buildUrl(getAPIUrl(),'customer', getToken(), null),buildUrl(getAPIUrl(),'customers', getToken(), 3000));

});