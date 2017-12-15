$().ready(function() {
    var salesLedgerData = null;

    var updateDetails = function(){

        var tdate = moment(salesLedgerData.tDate.toString()).subtract(1, 'day');
        $('#displayTDate').html(tdate.format('DD-MM-YYYY'));

        $('#displayAmount').html(salesLedgerData.amount);
        $('#displayTax').html(salesLedgerData.tax);
        $('#displayTotal').html(salesLedgerData.total);

        $('#displayCustomer').html(salesLedgerData.customer.name); 

        $('#displayModeType').html(salesLedgerData.modeType);
        if(salesLedgerData.modeType === 'bank'){
            $('#dBank').removeClass("hidden");
            $('#displayBank').html(salesLedgerData.bank.name);
        }else{
            $('#dBank').addClass("hidden");
        }

        $('#displayItem').html(salesLedgerData.item.name);
        $('#displayRefNo').html(salesLedgerData.refNo);
        $('#displayDescription').html(salesLedgerData.description);
    };  
    
    $.ajax({
        url: $('#url').val(),
        type: 'GET',
        success: function(data) {
            if (data) {
                salesLedgerData = data;
                updateDetails();
            }
        },
        error: function(data) {
            showAlertMessage('internaleServerError', data, 'danger', 'fa-warning fa-lg');
        }
    });

    $("#showEdit").on('click',function(event){
        //populate edit form data
        var tdate = moment(salesLedgerData.tDate.toString()).subtract(1, 'day');
        $('#tDate').val(tdate.format('DD-MM-YYYY'));
        $('#amount').val(salesLedgerData.amount);
        $('#customerId').val(salesLedgerData.customerId);
        $('#itemId').val(salesLedgerData.itemId);
        
        $('#modeType').val(salesLedgerData.modeType);

        $('#tax').val(salesLedgerData.tax);
        $('#total').val(salesLedgerData.total);

        $('#refNo').val(salesLedgerData.refNo);
        $('#description').val(salesLedgerData.description);

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
                    window.location = '/sales-ledger';
                }
            },
            error: function(data) {
                showAlertMessage('internaleServerError', data, 'danger', 'fa-warning fa-lg');
            }
        });
    });

    // $("#updateCustomer").on('click',function(event){

    // });

    var salesEntryEditForm = $('#sales_entry_edit_form');
    var salesEntryEditFormErrors = $('.alert-danger', salesEntryEditForm);
    var salesEntryEditFormSuccess = $('.alert-success', salesEntryEditForm);

    //IMPORTANT: update CKEDITOR textarea with actual content before submit
    salesEntryEditForm.on('submit', function() {
        // for(var instanceName in CKEDITOR.instances) {
        //     CKEDITOR.instances[instanceName].updateElement();
        // }
    })

    salesEntryEditForm.validate({
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
            itemId: {
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
           // alert(salesEntryEditForm.attr('action'));
            var url = salesEntryEditForm.attr('action');

            // var data = new FormData();
            // jQuery.each(jQuery('#profilePic')[0].files, function(i, file) {
            //     data.append('file-'+i, file);
            // });

            var data = {
                id: $('#salesEntryId').val(),
                tDate: getDate($('#tDate').val()),
                amount: $('#amount').val(),
                tax: $('#tax').val(),
                total: $('#total').val(),
                customerId: $('#customerId').val(),
                itemId: $('#itemId').val(),
                modeType: $('#modeType').val(),
                bankAccount: $('#bankAccount').val(),
                refNo: $('#refNo').val(),
                description: $('#description').val()
            };

            $.ajax({
                url: url,
                type: 'PUT',
                dataType: "json",
                data: JSON.stringify(data),
                contentType: "application/json; charset=utf-8",
                success: function(data1) {
                    showAlertMessage('successMessage','Customer updated successfuly.','success','fa-check fa-lg');
                    //window.location.replace("/sales-ledger");
                    salesLedgerData = data1.result;

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
    $('.select2me', salesEntryEditForm).change(function () {
        salesEntryEditForm.validate().element($(this)); //revalidate the chosen dropdown value and show error or success message for the input
    });

    //initialize datepicker
    $('.date-picker').datepicker({
        rtl: App.isRTL(),
        autoclose: true
    });
    $('.date-picker .form-control').change(function() {
        salesEntryEditForm.validate().element($(this)); //revalidate the chosen dropdown value and show error or success message for the input 
    });
});