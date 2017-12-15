var FormValidation = function () {
    var handleSalesEntryValidation = function() {
        // for more info visit the official plugin documentation: 
        // http://docs.jquery.com/Plugins/Validation

            var salesEntryForm = $('#sales_entry_form');
            var salesEntryFormErrors = $('.alert-danger', salesEntryForm);
            var salesEntryFormSuccess = $('.alert-success', salesEntryForm);

            //IMPORTANT: update CKEDITOR textarea with actual content before submit
            salesEntryForm.on('submit', function() {
                // for(var instanceName in CKEDITOR.instances) {
                //     CKEDITOR.instances[instanceName].updateElement();
                // }
            })

            salesEntryForm.validate({
                errorElement: 'span', //default input error message container
                errorClass: 'help-block help-block-error', // default input error message class
                focusInvalid: false, // do not focus the last invalid input
                ignore: "", // validate all fields including form hidden input
                rules: {
                    tDate: {
                        required: true
                    },
                    amount: {
                        required: true,
                        number: true
                    },  
                    customerId: {
                        required: true
                    },
                    modeType: {
                        required: true
                    },
                    bankAccount: {
                        required: function () {
                                return $('[name="modeType"]').val() == 'bank';
                            }
                    }
                },

                messages: { // custom messages for radio buttons and checkboxes
                    amount: {
                        required: "Please enter amount."
                    },
                    bankAccount: {
                        required: "Please select a bank account."
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
                    salesEntryFormSuccess.hide();
                    salesEntryFormErrors.show();
                    App.scrollTo(salesEntryFormErrors, -200);
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
                   // alert(salesEntryForm.attr('action'));
                    var url = salesEntryForm.attr('action');
                    var data = {
                        tDate: $('#tDate').val(),
                        amount: $('#amount').val(),
                        customerId: $('#customerId').val(),
                        modeType: $('#modeType').val(),
                        bankAccount: $('#bankAccount').val(),
                        refNo: $('#refNo').val(),
                        description: $('#description').val()
                    };

                    $.ajax({
                        url: url,
                        type: 'POST',
                        dataType: "json",
                        data: JSON.stringify(data),
                        contentType: "application/json; charset=utf-8",
                        success: function(data) {
                            //toastr.options.closeButton = true;
                            //toastr.success(data.result.message);
                            salesEntryFormErrors.hide();
                            salesEntryFormSuccess.show();
                            //window.location.replace("/sales-ledger");
                        },
                        error: function(data) {
                            //alert(data);
                            //toastr.options.closeButton = true;
                            //toastr.error("Something went wrong. Please try again with all the fields.");

                            salesEntryFormErrors.html('<button class="close" data-close="alert"></button> Something went wrong. Please try again later.').show();
                            salesEntryFormSuccess.hide();
                        }
                    });
                    //salesEntryFormSuccess.show();
                    //salesEntryFormErrors.hide();
                    //form[0].submit(); // submit the form
                }

            });

             //apply validation on select2 dropdown value change, this only needed for chosen dropdown integration.
            $('.select2me', salesEntryForm).change(function () {
                salesEntryForm.validate().element($(this)); //revalidate the chosen dropdown value and show error or success message for the input
            });

            //initialize datepicker
            $('.date-picker').datepicker({
                rtl: App.isRTL(),
                autoclose: true
            });
            $('.date-picker .form-control').change(function() {
                salesEntryForm.validate().element($(this)); //revalidate the chosen dropdown value and show error or success message for the input 
            })
    }

    return {
        //main function to initiate the module
        init: function () {
            handleSalesEntryValidation();
        }
    };

}();

jQuery(document).ready(function() {
    FormValidation.init();
});
