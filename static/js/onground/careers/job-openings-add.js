
$().ready(function() {
    var jobsAddForm = $('#jobs_add_form');
    var jobsAddFormErrors = $('.alert-danger', jobsAddForm);
    var jobsAddFormSuccess = $('.alert-success', jobsAddForm);

    //IMPORTANT: update CKEDITOR textarea with actual content before submit
    jobsAddForm.on('submit', function() {
        // for(var instanceName in CKEDITOR.instances) {
        //     CKEDITOR.instances[instanceName].updateElement();
        // } 
    }) 
    jobsAddForm.validate({
        errorElement: 'span', //default input error message container
        errorClass: 'help-block help-block-error', // default input error message class
        focusInvalid: false, // do not focus the last invalid input
        ignore: "", // validate all fields including form hidden input
        rules: {
            jobTitle: {
                required: true
            },
            company: {
                required: true   
            },
            noOpening: {
            	required:true,
                number: true
            },
            experience: {
                required: true
            },
            postedDate: {
                required: true 
            },
            qualification: {
                required: true 
            },
            salary: {
                required: true,
                number: true
            } 
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
            var url = jobsAddForm.attr('action');
            var data = {
            	jobTitle: $('#jobTitle').val(),
                shortDescription: $('#company').val(),
                noOfOpenings: $('#noOpening').val(),
                reqExperience: $('#experience').val(),
                postedDate: getDate($('#postedDate').val()),
                lastDate: getDate($('#expireDate').val()),
                jobLocation: $('#location').val(),
                jobDescription: $('#description').val(),
                qualification: $('#qualification').val(),
                jobType: $('#jobType').val(),
                shifTtype: $('#shiftType').val(),
                salary: $('#salary').val(),
                skillLevel: $('#skill').val()
            };

            $.ajax({
                url: url,
                type: 'POST',
                dataType: "json",
                data: JSON.stringify(data),
                contentType: "application/json; charset=utf-8",
                success: function(data) {
                    showAlertMessage('successMessage','Job added successfuly. You can view the jobs details in <a href="/careers/job-list"><i class="fa fa-graduate"></i> job openings</a>.','success','fa-check fa-lg');
                     window.location.replace("/careers/jobs-list");
                },
                error: function(data) {
                    showAlertMessage('internaleServerError', data, 'danger', 'fa-warning fa-lg');
                }
            });
        }

    });

     //apply validation on select2 dropdown value change, this only needed for chosen dropdown integration.
    $('.select2me', jobsAddForm).change(function () {
        jobsAddForm.validate().element($(this)); //revalidate the chosen dropdown value and show error or success message for the input
    });

    //initialize datepicker
    $('.date-picker').datepicker({
        rtl: App.isRTL(),
        autoclose: true
    });
    $('.date-picker .form-control').change(function() {
        jobsAddForm.validate().element($(this)); //revalidate the chosen dropdown value and show error or success message for the input 
    });
});