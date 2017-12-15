 $().ready(function() { 
    var subscriptionAddForm = $('#subscription_add_form');
    var subscriptionAddFormErrors = $('.alert-danger', subscriptionAddForm);
    var subscriptionAddFormSuccess = $('.alert-success', subscriptionAddForm);

    //IMPORTANT: update CKEDITOR textarea with actual content before submit
   subscriptionAddForm.on('submit', function() {
   // alert('hiii');
        // for(var instanceName in CKEDITOR.instances) {
        //     CKEDITOR.instances[instanceName].updateElement();
        // }
    })

    subscriptionAddForm.validate({
        errorElement: 'span', //default input error message container
        errorClass: 'help-block help-block-error', // default input error message class
        focusInvalid: false, // do not focus the last invalid input
        ignore: "", // validate all fields including form hidden input
        rules: {
            type: {
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
            var url = subscriptionAddForm.attr('action');
           // alert('url---'+url);
            var data = {
                customerId: $('#customerId').val(),
                itemId: $('#itemId').val(),
                startDate: getDate($('#startDate').val()),
                location: $('#location').val(),
                noservice: parseInt($('#noservice').val()),
                tamount: parseInt($('#samount').val())*parseInt($('#noservice').val()),
                payable: $('#payable').val(),
                samount: $('#samount').val(),
                tax: $('#tax').val(),
                frequency: $('#frequency').val(),
                taxClass: $('#taxClass').val(),
                payment: $('#payment').val(),
                paymentMode: $('#paymentMode').val(),
            };

            alert(JSON.stringify(data));
            $.ajax({
                url: url,
                type: 'POST',
                dataType: "json",
                data: JSON.stringify(data),
                contentType: "application/json; charset=utf-8",
                success: function(data) {
                    //showAlertMessage('successMessage','Subscription added successfuly. You can view the maintenance details in <a href="/maintenance"><i class="fa fa-graph"></i> Maintenance</a>.','success','fa-check fa-lg');
                    window.location.replace("/subscriptions");
                },
                error: function(data) {
                    showAlertMessage('internaleServerError', data, 'danger', 'fa-warning fa-lg');
                }
            });
        }
    });

     //apply validation on select2 dropdown value change, this only needed for chosen dropdown integration.
    $('.select2me', subscriptionAddForm).change(function () {
        subscriptionAddForm.validate().element($(this)); //revalidate the chosen dropdown value and show error or success message for the input
    });

    //initialize datepicker
    $('.date-picker').datepicker({
        rtl: App.isRTL(),
        autoclose: true
    });
    $('.date-picker .form-control').change(function() {
        subscriptionAddForm.validate().element($(this)); //revalidate the chosen dropdown value and show error or success message for the input 
    });

    populateCustomers(buildUrl(getAPIUrl(),'customers', getToken(), 3000),false);
    addCustomer(buildUrl(getAPIUrl(),'customer', getToken(), null),buildUrl(getAPIUrl(),'customers', getToken(), 3000));
    populateItems(buildUrl(getAPIUrl(),'items', getToken(), 3000),false);
    addItem(buildUrl(getAPIUrl(),'item', getToken(), null),buildUrl(getAPIUrl(),'items', getToken(), 3000));
    

    $('#startDate').val(moment().format('MM-DD-YYYY'));
    $('#endDate').val(moment().format('MM-DD-YYYY'));
    $('#dueDate').val(moment().format('MM-DD-YYYY'));
 });

startDate = moment().add(1, 'months');