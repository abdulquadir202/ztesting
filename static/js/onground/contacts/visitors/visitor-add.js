$().ready(function() {
    var visitorAddForm = $('#visitor_add_form');
    var visitorAddFormErrors = $('.alert-danger', visitorAddForm);
    var visitorAddFormSuccess = $('.alert-success', visitorAddForm);

    //IMPORTANT: update CKEDITOR textarea with actual content before submit
    visitorAddForm.on('submit', function() {
        // for(var instanceName in CKEDITOR.instances) {
        //     CKEDITOR.instances[instanceName].updateElement();
        // }
    })

    visitorAddForm.validate({
        errorElement: 'span', //default input error message container
        errorClass: 'help-block help-block-error', // default input error message class
        focusInvalid: false, // do not focus the last invalid input
        ignore: "", // validate all fields including form hidden input
        rules: {
            tDate: {
                required: true
            },
            name: {
                required: true
            },
            mobile: {
                required: true,
                number: true,
                maxlength:10,
                minlength: 10
            },
            email: {
                email: true
            },
            employeeId: {
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
           // alert(visitorAddForm.attr('action'));
            var url = visitorAddForm.attr('action');
            var data = {
                vDate: getDate($('#vDate').val()),
                mobile: $('#mobile').val(),
                name: $('#name').val(),
                email: $('#email').val(),
                employeeId: $('#employeeId').val(),
                address: $('#address').val(),
                salesStage: $('#salesStage').val(),
                fDate: getDate($('#fDate').val()),
                description: $('#description').val()
            };

            
    
            $.ajax({
                url: url,
                type: 'POST',
                dataType: "json",
                data: JSON.stringify(data),
                contentType: "application/json; charset=utf-8",
                success: function(data) {
                    //window.location.replace("/sales-ledger");
                    if($("#sendSms").is(':checked')){
                        var getAPIUrl = $('#apiUrl').val()+ '/api/visitor/sendsms/'+data.result.id+'?token='+$('#token').val();
                        
                        $.ajax({
                            url: getAPIUrl,
                            type: 'GET',
                            success: function(data) {
                                showAlertMessage('successMessage','Visitor added successfuly. You can view the visitor details in <a href="/visitors"><i class="icon-eye"></i> Visitors</a>.','success','fa-check fa-lg');
                            },
                            error: function(data) {
                                showAlertMessage("Something went wrong. Please try again with all the fields.");
                            }
                        });
                    }else{
                        showAlertMessage('successMessage','Visitor added successfuly. You can view the visitor details in <a href="/visitors"><i class="icon-eye"></i> Visitors</a>.','success','fa-check fa-lg');
                    }  
                },
                error: function(data) {
                    showAlertMessage('internaleServerError', data, 'danger', 'fa-warning fa-lg');
                }
            });
        }

    });


     //apply validation on select2 dropdown value change, this only needed for chosen dropdown integration.
    $('.select2me', visitorAddForm).change(function () {
        visitorAddForm.validate().element($(this)); //revalidate the chosen dropdown value and show error or success message for the input
    });

    //initialize datepicker
    $('.date-picker').datepicker({
        rtl: App.isRTL(),
        autoclose: true
    });
    $('.date-picker .form-control').change(function() {
        visitorAddForm.validate().element($(this)); //revalidate the chosen dropdown value and show error or success message for the input 
    });

    $('#vDate').val(moment().format('DD-MM-YYYY'));
    populateEmployees(buildUrl(getAPIUrl(),'employees',getToken(), 3000),false);
    //populateEmpDesignation(buildUrl(getAPIUrl(),'designations', getToken() 3000),false);
     addEmployee(buildUrl(getAPIUrl(),'employee',getToken(), null),buildUrl(getAPIUrl(),'employees',getToken(), 3000));
    //addEmpDesignation(buildUrl(getAPIUrl(),'designation', getToken() null),buildUrl(getAPIUrl(),'designations', getToken() 3000));
    $('#salesStage').change(function() {
        if ($(this).val() === 'confirmed' || $(this).val() === 'unsuccessful') {
            $('#follow').addClass('hide');
            $('#sms').addClass('hide');
            
        }else{
            $('#follow').removeClass('hide');
            $('#sms').removeClass('hide');
        }
    });
});