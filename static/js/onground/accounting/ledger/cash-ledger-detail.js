$().ready(function() {
    var cashLedgerData = null;

    var updateDetails = function(){

        var tdate = moment(cashLedgerData.tDate.toString()).subtract(1, 'day');
        $('#displayTDate').html(tdate.format('DD-MM-YYYY'));

        $('#displayAmount').html(cashLedgerData.amount);
        $('#displayType').html(cashLedgerData.type);
        if(cashLedgerData.type && cashLedgerData.type === 'receipt'){
            $('#dCustomer').removeClass('hidden');
            $('#dVendor').addClass('hidden');
            $('#displayCustomer').html(cashLedgerData.customer.name);  
        }   
        if(cashLedgerData.type && cashLedgerData.type === 'payment'){
            $('#dVendor').removeClass('hidden');
            $('#dCustomer').addClass('hidden');
            $('#displayVendor').html(cashLedgerData.vendor.name);
        }
        $('#displayItem').html(cashLedgerData.item.name);
        $('#displayRefNo').html(cashLedgerData.refNo);
        $('#displayDescription').html(cashLedgerData.description);
    };  
    
    $.ajax({
        url: $('#url').val(),
        type: 'GET',
        success: function(data) {
            if (data) {
                cashLedgerData = data;
                updateDetails();
            }
        },
        error: function(data) {
            showAlertMessage('internaleServerError', data, 'danger', 'fa-warning fa-lg');
        }
    });

    $("#showEdit").on('click',function(event){
        //populate edit form data
        var tdate = moment(cashLedgerData.tDate.toString()).subtract(1, 'day');
        $('#tDate').val(tdate.format('DD-MM-YYYY'));
        $('#amount').val(cashLedgerData.amount);
        $('#type').val(cashLedgerData.type);
        if(cashLedgerData.type && cashLedgerData.type === 'receipt'){
            $('#customerOption').removeClass('hidden');
            $('#vendorOption').addClass('hidden'); 
            $('#customerId').val(cashLedgerData.customerId);
        }
        if(cashLedgerData.type && cashLedgerData.type === 'payment'){
            $('#vendorOption').removeClass('hidden');
            $('#customerOption').addClass('hidden');
            $('#vendorId').val(cashLedgerData.vendorId);
        }
        
        $('#itemId').val(cashLedgerData.itemId);
        
        $('#refNo').val(cashLedgerData.refNo);
        $('#description').val(cashLedgerData.description);

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
                    window.location = '/cash-ledger';
                }
            },
            error: function(data) {
                showAlertMessage('internaleServerError', data, 'danger', 'fa-warning fa-lg');
            }
        });
    });

    // $("#updateCustomer").on('click',function(event){

    // });

    var cashEntryEditForm = $('#cash_entry_edit_form');
    var cashEntryEditFormErrors = $('.alert-danger', cashEntryEditForm);
    var cashEntryEditFormSuccess = $('.alert-success', cashEntryEditForm);

    //IMPORTANT: update CKEDITOR textarea with actual content before submit
    cashEntryEditForm.on('submit', function() {
        // for(var instanceName in CKEDITOR.instances) {
        //     CKEDITOR.instances[instanceName].updateElement();
        // }
    })

    cashEntryEditForm.validate({
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
           // alert(cashEntryEditForm.attr('action'));
            var url = cashEntryEditForm.attr('action');

            // var data = new FormData();
            // jQuery.each(jQuery('#profilePic')[0].files, function(i, file) {
            //     data.append('file-'+i, file);
            // });

            var data = {
                id: $('#cashEntryId').val(),
                tDate: new Date(getDate($('#tDate').val())),
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
                type: 'PUT',
                dataType: "json",
                data: JSON.stringify(data),
                contentType: "application/json; charset=utf-8",
                success: function(data1) {
                    showAlertMessage('successMessage','Customer updated successfuly.','success','fa-check fa-lg');
                    //window.location.replace("/sales-ledger");
                    cashLedgerData = data1.result;

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
    $('.select2me', cashEntryEditForm).change(function () {
        cashEntryEditForm.validate().element($(this)); //revalidate the chosen dropdown value and show error or success message for the input
    });

    //initialize datepicker
    $('.date-picker').datepicker({
        rtl: App.isRTL(),
        autoclose: true
    });
    $('.date-picker .form-control').change(function() {
        cashEntryEditForm.validate().element($(this)); //revalidate the chosen dropdown value and show error or success message for the input 
    });
});