$().ready(function() {
    var purchaseEntryForm = $('#purchase_entry_form');
    var purchaseEntryFormErrors = $('.alert-danger', purchaseEntryForm);
    var purchaseEntryFormSuccess = $('.alert-success', purchaseEntryForm);

    //IMPORTANT: update CKEDITOR textarea with actual content before submit
    purchaseEntryForm.on('submit', function() {
        // for(var instanceName in CKEDITOR.instances) {
        //     CKEDITOR.instances[instanceName].updateElement();
        // }
    })

    purchaseEntryForm.validate({
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
            vendorId: {
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
                //required: "Please enter amount."
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
           // alert(purchaseEntryForm.attr('action'));
            var url = purchaseEntryForm.attr('action');
            var data = {
                tDate: getDate($('#tDate').val()),
                amount: $('#amount').val(),
                vendorId: $('#vendorId').val(),
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
                    showAlertMessage('successMessage','Purchase entry added successfuly. You can view the entries in the <a href="/purchase-ledger"><i class="icon-notebook"></i> Purchase Ledger</a>.','success','fa-check fa-lg');
                    //window.location.replace("/purchase-ledger");
                },
                error: function(data) {
                    showAlertMessage('internaleServerError', data, 'danger', 'fa-warning fa-lg');
                }
            });
        }

    });

     //apply validation on select2 dropdown value change, this only needed for chosen dropdown integration.
    $('.select2me', purchaseEntryForm).change(function () {
        purchaseEntryForm.validate().element($(this)); //revalidate the chosen dropdown value and show error or success message for the input
    });

    //initialize datepicker
    $('.date-picker').datepicker({
        rtl: App.isRTL(),
        autoclose: true
    });
    $('.date-picker .form-control').change(function() {
        purchaseEntryForm.validate().element($(this)); //revalidate the chosen dropdown value and show error or success message for the input 
    });
    
    $('#tDate').val(moment().format('DD-MM-YYYY'));
    populateVendors(buildUrl(getAPIUrl(),'vendors', getToken(), 3000),true);
    populateModes(buildUrl(getAPIUrl(),'modes', getToken(), 3000));
    addBank(buildUrl(getAPIUrl(),'mode', getToken(), null), buildUrl(getAPIUrl(),'modes', getToken(), 3000));
    addVendor(buildUrl(getAPIUrl(),'vendor', getToken(), null),buildUrl(getAPIUrl(),'vendors', getToken(), 3000));
});