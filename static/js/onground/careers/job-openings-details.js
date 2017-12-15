 
$().ready(function() {
    var authorsData = null;

    var updateDetails = function(){   

      //  alert(JSON.stringify(authorsData));
      //  var date = moment(new Date(authorsData.jobopening.updatedOn)); 

        $('#description').html(authorsData.jobopening.jobDescription);
        $('#location').html(authorsData.jobopening.jobLocation);
        $('#jobTitle').html(authorsData.jobopening.jobTitle);
        $('#jobType').html(authorsData.jobopening.jobType);
        $('#noOpening').html(authorsData.jobopening.noOfOpenings);
        $('#qualification').html(authorsData.jobopening.qualification);
        $('#experience').html(authorsData.jobopening.reqExperience);
        $('#salary').html(authorsData.jobopening.salary);
        $('#shiftType').html(authorsData.jobopening.shifTtype);
        $('#skill').html(authorsData.jobopening.skillLevel);
        $('#postedDate').html(authorsData.jobopening.updatedOn);
        $('#expireDate').html(authorsData.jobopening.lastDate);
        $('#company').html(authorsData.jobopening.shortDescription);
    };  
    
    $.ajax({
        url: $('#url').val(),
        type: 'GET',
        success: function(data) {
            if (data) {
                authorsData = data;
                updateDetails();
            }
        },
        error: function(data) {
            showAlertMessage('internaleServerError', data, 'danger', 'fa-warning fa-lg');
        }
    });

    $("#showEdit").on('click',function(event){
        //populate edit form data
    
        $('#authorName').val(authorsData.name);
        $('#authorMobile').val(authorsData.mobile);
        $('#authorEmail').val(authorsData.email);
        $('#authorType').val(authorsData.blogUserType);
        $('#authorAddress').val(authorsData.address);

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
                     window.location = '/careers/jobs-list';
                }
            },
            error: function(data) {
                showAlertMessage('internaleServerError', data, 'danger', 'fa-warning fa-lg');
            }
        });
    });

    // $("#updateCustomer").on('click',function(event){

    // });

    var authorsEditForm = $('#authors_edit_form');
    var authorsEditFormErrors = $('.alert-danger', authorsEditForm);
    var authorsEditFormSuccess = $('.alert-success', authorsEditForm);

    //IMPORTANT: update CKEDITOR textarea with actual content before submit
    authorsEditForm.on('submit', function() {
        // for(var instanceName in CKEDITOR.instances) {
        //     CKEDITOR.instances[instanceName].updateElement();
        // }
    })

    authorsEditForm.validate({
        errorElement: 'span', //default input error message container
        errorClass: 'help-block help-block-error', // default input error message class
        focusInvalid: false, // do not focus the last invalid input
        ignore: "", // validate all fields including form hidden input
        rules: {
           authorName: {
                required: true
            },
            authorMobile: {
                required: true,
                number: true
            },
            authorEmail: {
                required:true,
                email:true
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
           // alert(authorsEditForm.attr('action'));
            var url = authorsEditForm.attr('action');

            // var data = new FormData();
            // jQuery.each(jQuery('#profilePic')[0].files, function(i, file) {
            //     data.append('file-'+i, file);
            // });

            var data = {
                id:$('#authorId').val(),
                name: $('#authorName').val(),
                mobile: $('#authorMobile').val(),
                email: $('#authorEmail').val(),
                email: $('#authorType').val(),
                address: $('#authorAddress').val()
            };

            $.ajax({
                url: url,
                type: 'PUT',
                dataType: "json",
                data: JSON.stringify(data),
                contentType: "application/json; charset=utf-8",
                success: function(data1) {
                    showAlertMessage('successMessage','Authors updated successfuly.','success','fa-check fa-lg');
                    window.location.replace("/admin/users");
                    authorsData = data1.jobopening;

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
    $('.select2me', authorsEditForm).change(function () {
        authorsEditForm.validate().element($(this)); //revalidate the chosen dropdown value and show error or success message for the input
    });

    //initialize datepicker
    $('.date-picker').datepicker({
        rtl: App.isRTL(),
        autoclose: true
    });
    $('.date-picker .form-control').change(function() {
        authorsEditForm.validate().element($(this)); //revalidate the chosen dropdown value and show error or success message for the input 
    });
});