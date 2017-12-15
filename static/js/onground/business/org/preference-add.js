$().ready(function() { 
    var orgAddForm = $('.preference_add_form');
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
            var url = getAPIUrl()+'/api/preference/?token='+getToken();
            if($('input[name=enableEmail]:checked').val() === '1'){
                var email = true
            }else{
                var email = false
            }
            if($('input[name=enableSms]:checked').val() === '1'){
                var sms = true
            }else{
                var sms = false
            }

            if($('input[name=enableEmailnew]:checked').val() === '1'){
                var nemail = true
            }else{
                var nemail = false
            }
            if($('input[name=enableSmsnew]:checked').val() === '1'){
                var nsms = true
            }else{
                var nsms = false
            }

            if($('input[name=enableEmailcancel]:checked').val() === '1'){
                var cemail = true
            }else{
                var cemail = false
            }
            if($('input[name=enableSmscancel]:checked').val() === '1'){
                var csms = true
            }else{
                var csms = false
            }

            if($('input[name=enableEmailconfirm]:checked').val() === '1'){
                var conemail = true
            }else{
                var conemail = false
            }
            if($('input[name=enableSmsconfirm]:checked').val() === '1'){
                var consms = true
            }else{
                var consms = false
            }


            if($('input[name=enableEmailre]:checked').val() === '1'){
                var remail = true
            }else{
                var remail = false
            }
            if($('input[name=enableSmsre]:checked').val() === '1'){
                var rsms = true
            }else{
                var rsms = false
            }

            var data = {
                emailConfig:{
                    enableEmail:email,
                    gmail: {
                        auth: {
                            pass:  $('#pwd').val() ,
                            user: $('#emailId').val(),
                        },
                        host:  $('#host').val() ,
                        port: $('#port').val() ,
                        secure: true
                    }
                },
                smsConfig:{
                    enableSms: sms,
                    smsProvider: {
                        authKey:  $('#authKey').val() ,
                        name:  'VERIFORMM' ,
                        senderId: $('#senderId').val()
                        }
                },
                lead:{
                    new:{
                        enableSms:nsms,
                        enableEmail:nemail
                    },
                    cancel:{
                        enableSms:csms,
                        enableEmail:cemail

                    },
                    reschedule:{
                        enableSms:rsms,
                        enableEmail:remail

                    },
                    confirm:{
                        enableSms:consms,
                        enableEmail:conemail

                    },
                    prefix:$('#leadPrefix').val(),
                    sequence:parseInt($('#leadseq').val())
                },
                employee:{
                    prefix:$('#empPrefix').val(),
                    sequence:parseInt($('#empseq').val())
                },

                invoice:{
                    prefix:$('#iPrefix').val(),
                    sequence:parseInt($('#iseq').val())
                },
                quotation:{
                    prefix:$('#qPrefix').val(),
                    sequence:parseInt($('#qseq').val())
                }

            };
            if($('#perId').val() !==''){
                data.id = $('#perId').val();
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
                    window.location.replace("/organisation/preference");
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
    var pUrl =  getAPIUrl()+'/api/preferences/?token='+getToken();
    $.ajax({
        url : pUrl,
        type: 'GET',
        success: function(data) {

            if (data.data) {
                $('#perId').val(data.data.id);
                $('#emailId').val(data.data.emailConfig.gmail.auth.user);
                $('#pwd').val(data.data.emailConfig.gmail.auth.pass);
                $('#port').val(data.data.emailConfig.gmail.port);
                $('#host').val(data.data.emailConfig.gmail.host);
                $('#authKey').val(data.data.smsConfig.smsProvider.authKey);
                $('#senderId').val(data.data.smsConfig.smsProvider.senderId);
                $('#empPrefix').val(data.data.employee.prefix);
                $('#empseq').val(data.data.employee.sequence);
                $('#leadPrefix').val(data.data.lead.prefix);
                $('#leadseq').val(data.data.lead.sequence);

                $('#iPrefix').val(data.data.invoice.prefix);
                $('#iseq').val(data.data.invoice.sequence);
                $('#qPrefix').val(data.data.quotation.prefix);
                $('#qseq').val(data.data.quotation.sequence);

                if(data.data.emailConfig.enableEmail===true){
                    $('input:radio[name=enableEmail][value=1]').click();

                }else{
                    $('input:radio[name=enableEmail][value=0]').click();
                }
                if(data.data.smsConfig.enableSms === true){
                    $('input:radio[name=enableSms][value=1]').click();

                }else{
                 $('input:radio[name=enableSms][value=0]').click();

                }


                if(data.data.lead.new.enableEmail === true){
                    $('input:radio[name=enableEmailnew][value=1]').click();
                }else{
                    $('input:radio[name=enableEmailnew][value=0]').click();
                }
                if(data.data.lead.new.enableSms ===true){
                    $('input:radio[name=enableSmsnew][value=1]').click();
                    
                }else{
                    $('input:radio[name=enableSmsnew][value=0]').click();
                }

                if(data.data.lead.cancel.enableEmail === true){
                    $('input:radio[name=enableEmailcancel][value=1]').click();
                }else{
                    $('input:radio[name=enableEmailcancel][value=0]').click();
                }

                if(data.data.lead.cancel.enableSms===true){
                    $('input:radio[name=enableSmscancel][value=1]').click();
                }else{
                    $('input:radio[name=enableSmscancel][value=0]').click();
                }


                if(data.data.lead.confirm.enableEmail === true){
                    $('input:radio[name=enableEmailconfirm][value=1]').click();
                }else{
                    $('input:radio[name=enableEmailconfirm][value=0]').click();
                }

                if(data.data.lead.confirm.enableSms===true){
                    $('input:radio[name=enableSmsconfirm][value=1]').click();
                }else{
                    $('input:radio[name=enableSmsconfirm][value=0]').click();
                }

                if(data.data.lead.reschedule.enableEmail ===true){
                    $('input:radio[name=enableEmailre][value=1]').click();
                }else{
                    $('input:radio[name=enableEmailre][value=0]').click();
                }
                if(data.data.lead.reschedule.enableSms === true){
                     $('input:radio[name=enableSmsre][value=1]').click();
                }else{
                   $('input:radio[name=enableSmsre][value=0]').click();
                }
                
            }
        },
        error: function(data) {
            showAlertMessage('internaleServerError', data, 'danger', 'fa-warning fa-lg');
        }
    });
});