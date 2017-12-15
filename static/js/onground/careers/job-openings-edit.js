$().ready(function() {
    var jobAddForm = $('#jobs_add_form');
    var jobAddFormErrors = $('.alert-danger', jobAddForm);
    var jobAddFormSuccess = $('.alert-success', jobAddForm);

    //IMPORTANT: update CKEDITOR textarea with actual content before submit
    jobAddForm.on('submit', function() {
        // for(var instanceName in CKEDITOR.instances) {
        //     CKEDITOR.instances[instanceName].updateElement();
        // }
    })


    jobAddForm.validate({
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
                required: true
            },
            experience: {
                required: true
            },
            postedDate: {
                required: true
            },
            expireDate: {
                required: true
            },
            location:{
                required: true
            },
            qualification:{
                required: true
            },
            jobType:{
                required: true
            },
            shiftType:{
                required: true
            },
            salary:{
                required: true
            },
            skill:{
                required: true
            },
            description:{
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
            // alert(jobAddForm.attr('action')); 
            var url = jobAddForm.attr('action');
            var data = {
                id: $('#jobId').val(),
                jobTitle: $('#jobTitle').val(),
                shortDescription : $('#company').val(),
                noOfOpenings: $('#noOpening').val(),
                experience: $('#reqExperience').val(),
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
                type: 'PUT',
                dataType: "json",
                data: JSON.stringify(data),
                contentType: "application/json; charset=utf-8",
                success: function(data) {
                    toastr.options.closeButton = true;
                    toastr.clear();
                    toastr.success('Job Updated successfuly. You can view the Jobs in Job List.'); 
                    showAlertMessage('successMessage','Job Updated successfuly. You can view the Jobs in <a href="/jobs-list"><i class="icon-basket-loaded"></i> Job List</a>.','success','fa-check fa-lg');
                    window.location.replace("/careers/jobs-list");
                },
                error: function(data) {
                    showAlertMessage('internaleServerError', data, 'danger', 'fa-warning fa-lg');
                }
            });
        }

    });

    //apply validation on select2 dropdown value change, this only needed for chosen dropdown integration.
    $('.select2me', jobAddForm).change(function () {
        jobAddForm.validate().element($(this)); //revalidate the chosen dropdown value and show error or success message for the input
    });

    //initialize datepicker
    $('.date-picker').datepicker({
        rtl: App.isRTL(),
        autoclose: true
    });
    $('.date-picker .form-control').change(function() {
        jobAddForm.validate().element($(this)); //revalidate the chosen dropdown value and show error or success message for the input
    });


    $.ajax({
       // url: $('#url').val(),
        url : jobAddForm.attr('action'),
        type: 'GET',
        success: function(data) {
            if (data) {
                var token = $('#token').val();
                var sUrl = $('#apiUrl').val();  
                
                
               
                $('.lid').html(data.jobopening.name);
                $('#jobTitle').val(data.jobopening.jobTitle);
                $('#company').val(data.jobopening.shortDescription);
                $('#noOpening').val(data.jobopening.noOfOpenings);
                $('#experience').val(data.jobopening.reqExperience);
                $('#postedDate').val(data.jobopening.postedDate);
                $('#expireDate').val(data.jobopening.lastDate); 
                $('#location').val(data.jobopening.jobLocation);
                $('#description').val(data.jobopening.jobDescription);
                $('#qualification').val(data.jobopening.qualification);
                $('#jobType').val(data.jobopening.jobType);
                $('#shiftType').val(data.jobopening.shifTtype);
                $('#salary').val(data.jobopening.salary);
                $('#skill').val(data.jobopening.skillLevel);
                
            }
        },
        error: function(data) {
            showAlertMessage('internaleServerError', data, 'danger', 'fa-warning fa-lg');
        }
    });

 //initialize datepicker
    $('.date-picker').datepicker({
        rtl: App.isRTL(),
        autoclose: true
    });
    $('.date-picker .form-control').change(function() {
        jobAddForm.validate().element($(this)); //revalidate the chosen dropdown value and show error or success message for the input 
    });
});