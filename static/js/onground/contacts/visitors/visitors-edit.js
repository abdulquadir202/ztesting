$().ready(function() {
    var visitorsAddForm = $('#visitors_add_form');
    var visitorsAddFormErrors = $('.alert-danger', visitorsAddForm);
    var visitorsAddFormSuccess = $('.alert-success', visitorsAddForm);

    //IMPORTANT: update CKEDITOR textarea with actual content before submit
    visitorsAddForm.on('submit', function() {
        // for(var instanceName in CKEDITOR.instances) {
        //     CKEDITOR.instances[instanceName].updateElement();
        // }
    })

    visitorsAddForm.validate({
        errorElement: 'span', //default input error message container
        errorClass: 'help-block help-block-error', // default input error message class
        focusInvalid: false, // do not focus the last invalid input
        ignore: "", // validate all fields including form hidden input
        rules: {
            customerId: {
                required: true
            },
            itemId: {
                required: true
            },
            city: {
                required: true
            },
            address: {
                required: true
            },
            visitorStatus: {
                required: true
            },
            dueDate:{
                required: true
            },
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
            // alert(visitorsAddForm.attr('action'));
            var url = visitorsAddForm.attr('action');
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

            var stage = $('#salesStage').val();
            
            var sUrl ='';
            if(stage === 'confirmed'){
                sUrl = getAPIUrl()+ '/api/customer?token='+getToken();
                sType = 'POST'
            }else{
                sUrl = url;
                sType = 'PUT';
            }
            $.ajax({
                url: sUrl,
                type: sType,
                dataType: "json",
                data: JSON.stringify(data),
                contentType: "application/json; charset=utf-8",
                success: function(data) {
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
    $('.select2me', visitorsAddForm).change(function () {
        visitorsAddForm.validate().element($(this)); //revalidate the chosen dropdown value and show error or success message for the input
    });

    //initialize datepicker
    $('.date-picker').datepicker({
        rtl: App.isRTL(),
        autoclose: true
    });
    $('.date-picker .form-control').change(function() {
        visitorsAddForm.validate().element($(this)); //revalidate the chosen dropdown value and show error or success message for the input
    });


    $.ajax({
       // url: $('#url').val(),
        url : visitorsAddForm.attr('action'),
        type: 'GET',
        success: function(data) {
            if (data) {
                var token = getToken();
                var sUrl = getAPIUrl();
                
                
                populateEmployees(buildUrl(sUrl,'employees', token, '3000'),false, data.employeeId);

                addEmployee(buildUrl(sUrl,'employee', token, null),buildUrl(sUrl,'employees', token, '3000'));


                $('.lid').html(data.id);
                $('#fDate').val(moment(new Date(data.fDate)).format('DD-MM-YYYY'));
                $('#vDate').val(moment(new Date(data.vDate)).format('DD-MM-YYYY'));
                $('#mobile').val(data.mobile),
                $('#name').val(data.name),
                $('#email').val(data.email),
                $('#employeeId').val(data.employeeId),
                $('#address').val(data.address),
                $('#description').val(data.description)
                $('#salesStage').val(data.salesStage);
                $("#salesStage").select2({
                    value: data.salesStage
                });
            }
        },
        error: function(data) {
            showAlertMessage('internaleServerError', data, 'danger', 'fa-warning fa-lg');
        }
    });

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