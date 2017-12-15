$().ready(function() {
    var invoicesAddForm = $('#invoice_add_form');
    var invoicesAddFormErrors = $('.alert-danger', invoicesAddForm);
    var invoicesAddFormSuccess = $('.alert-success', invoicesAddForm);

    //IMPORTANT: update CKEDITOR textarea with actual content before submit
    invoicesAddForm.on('submit', function() {
        // for(var instanceName in CKEDITOR.instances) {
        //     CKEDITOR.instances[instanceName].updateElement();
        // }
    })

    invoicesAddForm.validate({
        errorElement: 'span', //default input error message container
        errorClass: 'help-block help-block-error', // default input error message class
        focusInvalid: false, // do not focus the last invalid input
        ignore: "", // validate all fields including form hidden input
        rules: {
            cName: {
                required: true
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
           // alert(invoicesAddForm.attr('action'));
            var url = invoicesAddForm.attr('action');
            
            var inv = new Object();
            inv.key = $('#invoiceNoKey').val();
            inv.value = $('#invoiceNoValue').val();

            var dn = new Object();
            dn.key = $('#deliveryNoteKey').val();
            dn.value = $('#deliveryNoteValue').val();

            var sr = new Object();
            sr.key = $('#supplierRefKey').val();
            sr.value = $('#supplierRefValue').val();

            var iv = new Object();
            iv.key = $('#invoiceDateKey').val();
            iv.value = $('#invoiceDateValue').val();

            var pm = new Object();
            pm.key = $('#paymentModeKey').val();
            pm.value = $('#paymentModeValue').val();

            var or = new Object();
            or.key = $('#otherRefKey').val();
            or.value = $('#otherRefValue').val();

            var on = new Object();
            on.key = $('#orderNoKey').val();
            on.value = $('#orderNoValue').val();

            var dp = new Object();
            dp.key = $('#dispatchedNoKey').val();
            dp.value = $('#dispatchedNoValue').val();

            var dt = new Object();
            dt.key = $('#dispatchedThroughKey').val();
            dt.value = $('#dispatchedThroughValue').val();

            var od = new Object();
            od.key = $('#orderDateKey').val();
            od.value = $('#orderDateValue').val();

            var dDate = new Object();
            dDate.key = $('#dispatchedDateKey').val();
            dDate.value = $('#dispatchedDateValue').val();

            var dtn = new Object();
            dtn.key = $('#destinationKey').val();
            dtn.value = $('#destinationValue').val();

            var itemDes = new Object();
            itemDes.key = $('#itemDescriptionKey').val();
            itemDes.value = $('#itemDescriptionValue').val();

            var qty = new Object();
            qty.key = $('#quantityKey').val();
            qty.value = $('#itemQty').val();

            var ret = new Object();
            ret.key = $('#rateKey').val();
            ret.value = $('#itemRate').val();

            var amt = new Object();
            amt.key = $('#amountKey').val();
            amt.value = parseFloat($('#itemTotal').html());

            var sTotal = new Object();
            sTotal.key = $('#subTotalLabel').val();
            sTotal.value = parseFloat($('#subTotal').html());

            var tax = new Object();
            tax.key = $('#taxLabel').val();
            tax.value = parseFloat($('#taxAmt').html());

            var tot = new Object();
            tot.key = $('#totalLabel').val();
            tot.value = parseFloat($('#total').html());

            var sTax = new Object();
            sTax.key = $('#serviceTaxNoKey').val();
            sTax.value = $('#serviceTaxNoValue').val();

            var pan = new Object();
            pan.key = $('#panNoKey').val();
            pan.value = $('#panNoValue').val();

            var tin = new Object();
            tin.key = $('#tinNoKey').val();
            tin.value = $('#tinNoValue').val();

            var bank = new Object();
            bank.key = $('#bankNameKey').val();
            bank.value = $('#bankNameValue').val();

            var account = new Object();
            account.key = $('#accountNoKey').val();
            account.value = $('#accountNoValue').val();

            var ifsc = new Object();
            ifsc.key = $('#branchIfscKey').val();
            ifsc.value = $('#branchIfscValue').val();

            var sig = new Object();
            sig.key = $('#signature').val();
            sig.value = $('#signature').val();

            var note = new Object();
            note.key = $('#notesKey').val();
            note.value = $('#notesValue').val();

            var term = new Object();
            term.key = $('#termsKey').val();
            term.value = $('#termsValue').val();

            var data = {
                cName: $('#companyName').val(),
                //cName: JSON.stringify(cn),
                street: $('#street').val(),
                province: $('#province').val(),
                city: $('#city').val(),
                country: $('#country').val(),
                email: $('#email').val(),
                invoiceNo: inv,
                deliveryNote: dn,
                supplierRef: sr,
                iDate: iv,
                paymentMode: pm,
                otherRef: or,
                billTo: $('#billTo').val(),
                orderNo: on,
                dispatchedNo: dp,
                dispatchedThrough: dt,
                orderDate: od,
                dispatchedDate: dDate,
                destination: dtn,
                itemDescription: itemDes,
                quantity: qty,
                rate: ret,
                amount: amt,
                subTotal: sTotal,
                salesTax: tax,
                total: tot,
                inWords: $('#totalInwords').val(),
                cDetails: $('#cDetails').val(),
                serviceTaxNo: sTax,
                panNo: pan,
                tinNo: tin,
                bankName: bank,
                accountNo: account,
                branchIfsc: ifsc,
                description: $('#description').val(),
                signature: sig,
                notes: note,
                terms: term,
                address: $('#address').val()
            };

            $.ajax({
                url: url,
                type: 'POST',
                dataType: "json",
                data: JSON.stringify(data),
                contentType: "application/json; charset=utf-8",
                success: function(data) {
                    showAlertMessage('successMessage','New Invoice added successfuly. You can view the Invoice details in <a href="/invoices"><i class="fa fa-file-text-o"></i> Invoices</a>.','success','fa-check fa-lg');
                    //window.location.replace("/sales-ledger");
                },
                error: function(data) {
                    showAlertMessage('internaleServerError', data, 'danger', 'fa-warning fa-lg');
                }
            });
        }

    });

     //apply validation on select2 dropdown value change, this only needed for chosen dropdown integration.
    $('.select2me', invoicesAddForm).change(function () {
        invoicesAddForm.validate().element($(this)); //revalidate the chosen dropdown value and show error or success message for the input
    });

    //initialize datepicker
    $('.date-picker').datepicker({
        rtl: App.isRTL(),
        autoclose: true
    });
    $('.date-picker .form-control').change(function() {
        invoicesAddForm.validate().element($(this)); //revalidate the chosen dropdown value and show error or success message for the input 
    });
});