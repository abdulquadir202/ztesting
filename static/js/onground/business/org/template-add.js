$().ready(function() { 
    var orgAddForm = $('.template_add_form');
    var orgAddFormErrors = $('.alert-danger', orgAddForm);
    var orgAddFormSuccess = $('.alert-success', orgAddForm);

    //IMPORTANT: update CKEDITOR textarea with actual content before submit
    orgAddForm.on('submit', function() {
        // for(var instanceName in CKEDITOR.instances) {
        //     CKEDITOR.instances[instanceName].updateElement();
        // }
    })

    orgAddForm.validate({
        errorElement: 'span', //default input error message container
        errorClass: 'help-block help-block-error', // default input error message class
        focusInvalid: false, // do not focus the last invalid input
        ignore: "", // validate all fields including form hidden input
        rules: {
        },

        messages: { // custom messages for radio buttons and checkboxes
           
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

        invalidHandler: function (product, validator) { //display error alert on form submit   
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
            
            var url = getAPIUrl()+'/api/template/?token='+getToken();

            var data = {
                lead:{
                    new:{
                        html:$('#new').summernote('code').trim(),
                        subject:$('#subnew').val(),
                        text:$('#smstmpnew').val()
                    },
                    reschedule:{
                        html:$('#reschedule').summernote('code').trim(),
                        subject:$('#subre').val(),
                        text:$('#smstmprsdl').val()
                    },
                    cancel:{
                        html:$('#cancel').summernote('code').trim(),
                        subject:$('#subcan').val(),
                        text:$('#smstmpcnc').val()
                    },
                    confirm:{
                        html:$('#assign').summernote('code').trim(),
                        subject:$('#subassg').val(),
                        text:$('#smstmpassgn').val()
                    }
                },
                visitor:{
                    new:{
                        html:$('#newvisit').summernote('code').trim(),
                        subject:$('#subnewvisit').val(),
                        text:$('#smstmpnewvisit').val()
                    },
                    measure:{
                        html:$('#measure').summernote('code').trim(),
                        subject:$('#subnewmeasure').val(),
                        text:$('#smstmpmeasure').val()

                    },
                    quote:{
                        html:$('#quote').summernote('code').trim(),
                        subject:$('#subquote').val(),
                        text:$('#smstmpquote').val(),

                    }
                }
            };
            if($('#tempId').val() !==''){
                data.id = $('#tempId').val();
                var methos = 'PUT'
            }else{
                var methos = 'POST'
            }
            $.ajax({
                url: url,
                type: methos,
                dataType: "json",
                data: JSON.stringify(data),
                contentType: "application/json; charset=utf-8",
                success: function(data) {
                    showAlertMessage('successMessage','preferences updated');
                    window.location.replace("/organisation/templates");
                },
                error: function(data) {
                    showAlertMessage('internaleServerError', data, 'danger', 'fa-warning fa-lg');
                }
            });
        }

    });

     //apply validation on select2 dropdown value change, this only needed for chosen dropdown integration.
    $('.select2me', orgAddForm).change(function () {
        orgAddForm.validate().element($(this)); //revalidate the chosen dropdown value and show error or success message for the input
    });

    //initialize datepicker
    $('.date-picker').datepicker({
        rtl: App.isRTL(),
        autoclose: true
    });
    $('.date-picker .form-control').change(function() {
        orgAddForm.validate().element($(this)); //revalidate the chosen dropdown value and show error or success message for the input 
    });
    var pUrl =  getAPIUrl()+'/api/templates/?token='+getToken();
    $.ajax({
        url : pUrl,
        type: 'GET',
        success: function(data) {
            if (data.data) {
                $('#tempId').val(data.data.id);
                $('#new').summernote('code', data.data.lead.new.html);
                $('#smstmpnew').val(data.data.lead.new.text);
                $('#subnew').val(data.data.lead.new.subject);
                $('#reschedule').summernote('code',data.data.lead.reschedule.html);
                $('#smstmprsdl').val(data.data.lead.reschedule.text);
                $('#subre').val(data.data.lead.reschedule.subject);
                $('#assign').summernote('code',data.data.lead.confirm.html);
                $('#subassg').val(data.data.lead.confirm.subject);
                $('#smstmpassgn').val(data.data.lead.confirm.text);
                if(data.data.visitor){
                    $('#newvisit').summernote('code',data.data.visitor.new.html);
                    $('#subnewvisit').val(data.data.visitor.new.subject);
                    $('#smstmpnewvisit').val(data.data.visitor.new.text);

                    $('#measure').summernote('code',data.data.visitor.measure.html);
                    $('#subnewmeasure').val(data.data.visitor.measure.subject);
                    $('#smstmpmeasure').val(data.data.visitor.measure.text);

                    $('#quote').summernote('code',data.data.visitor.quote.html);
                    $('#subquote').val(data.data.visitor.quote.subject);
                    $('#smstmpquote').val(data.data.visitor.quote.text);

                    $('#uns').summernote('code',data.data.visitor.cancel.html);
                    $('#subuns').val(data.data.visitor.cancel.subject);
                    $('#smstmpuns').val(data.data.visitor.cancel.text);
                }
            }
        },
        error: function(data) {
            showAlertMessage('internaleServerError', data, 'danger', 'fa-warning fa-lg');
        }
    });
});