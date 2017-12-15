$().ready(function() {
    var cashEntryForm = $('#cash_entry_form');
    var cashEntryFormErrors = $('.alert-danger', cashEntryForm);
    var cashEntryFormSuccess = $('.alert-success', cashEntryForm);

    //IMPORTANT: update CKEDITOR textarea with actual content before submit
    cashEntryForm.on('submit', function() {
        // for(var instanceName in CKEDITOR.instances) {
        //     CKEDITOR.instances[instanceName].updateElement();
        // }
    })

    cashEntryForm.validate({
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
            type: {
                required: true
            },
            customerId: {
                required: function () {
                    return $('[name="type"]').val() == 'receipt';
                }
            },
            itemId: {
                required: true
            },
            vendorId: {
                required: function () {
                    return $('[name="type"]').val() == 'payment';
                }
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
           // alert(cashEntryForm.attr('action'));
            var url = cashEntryForm.attr('action');
            var data = {
                tDate: getDate($('#tDate').val()),
                amount: $('#amount').val(),
                type: $('#type').val(),
                itemId: $('#itemId').val(),
                customerId: null,
                vendorId: null,
                refNo: $('#refNo').val(),
                description: $('#description').val()
            };

            if($('[name="type"]').val() === 'payment'){
                data.vendorId = $('#vendorId').val();  
            }else if($('[name="type"]').val() === 'receipt'){
                data.customerId =  $('#customerId').val();
            }

            $.ajax({
                url: url,
                type: 'POST',
                dataType: "json",
                data: JSON.stringify(data),
                contentType: "application/json; charset=utf-8",
                success: function(data) {
                    showAlertMessage('successMessage','Cash entry added successfuly. You can view the entries in the <a href="/cash-ledger"><i class="icon-notebook"></i> Cash Ledger</a>.','success','fa-check fa-lg');
                    //window.location.replace("/cash-ledger");
                },
                error: function(data) {
                    showAlertMessage('internaleServerError', data, 'danger', 'fa-warning fa-lg');
                }
            });
        }

    });

     //apply validation on select2 dropdown value change, this only needed for chosen dropdown integration.
    $('.select2me', cashEntryForm).change(function () {
        cashEntryForm.validate().element($(this)); //revalidate the chosen dropdown value and show error or success message for the input
    });

    //initialize datepicker
    $('.date-picker').datepicker({
        rtl: App.isRTL(),
        autoclose: true
    });
    $('.date-picker .form-control').change(function() {
        cashEntryForm.validate().element($(this)); //revalidate the chosen dropdown value and show error or success message for the input 
    });

    $('#tDate').val(moment().format('DD-MM-YYYY'));
    populateCustomers(buildUrl(getAPIUrl(),'customers', getToken(), 3000));
    populateVendors(buildUrl(getAPIUrl(),'vendors', getToken(), 3000));
    populateTransactionTypes(true);
    populateItems(buildUrl(getAPIUrl(),'items', getToken(), 3000));
    addVendor(buildUrl(getAPIUrl(),'vendor', getToken(), null),buildUrl(getAPIUrl(),'vendors', getToken(), 3000));
    addCustomer(buildUrl(getAPIUrl(),'customer', getToken(), null),buildUrl(getAPIUrl(),'customers', getToken(), 3000));
    addItem(buildUrl(getAPIUrl(),'item', getToken(), null),buildUrl(getAPIUrl(),'items', getToken(), 3000));
});