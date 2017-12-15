$().ready(function() {
    var assetAddForm = $('#asset_add_form');
    var assetAddFormErrors = $('.alert-danger', assetAddForm);
    var assetAddFormSuccess = $('.alert-success', assetAddForm);

    //IMPORTANT: update CKEDITOR textarea with actual content before submit
   assetAddForm.on('submit', function() {
   // alert('hiii');
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
            },
            type: {
                required: true
            },
            status: {
                required: true
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
            var url = assetAddForm.attr('action');
            //alert('url---'+url);
            var data = {
                tagId: $('#tagId').val(),
                type: $('#type').val(),
                allocatedTo: $('#customerId').val(),
                description: $('#description').val(),
                price: $('#price').val(),
                astatus: $('#status').val(),
            };

            $.ajax({
                url: url,
                type: 'POST',
                dataType: "json",
                data: JSON.stringify(data),
                contentType: "application/json; charset=utf-8",
                success: function(data) {
                    showAlertMessage('successMessage','Asset added successfuly. You can view the asset details in <a href="/asset"><i class="fa fa-notebook"></i> Asset</a>.','success','fa-check fa-lg');
                    window.location.replace("/asset");
                },
                error: function(data) {
                    showAlertMessage('internaleServerError', data, 'danger', 'fa-warning fa-lg');
                }
            });
        }
    });

     //apply validation on select2 dropdown value change, this only needed for chosen dropdown integration.
    $('.select2me', assetAddForm).change(function () {
        assetAddForm.validate().element($(this)); //revalidate the chosen dropdown value and show error or success message for the input
    });
 populateCustomers(buildUrl(getAPIUrl(),'customers', getToken(), 3000),false);
 addCustomer(buildUrl(getAPIUrl(),'customer', getToken(), null),buildUrl(getAPIUrl(),'customers', getToken(), 3000));
 });