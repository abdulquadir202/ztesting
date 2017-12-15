$().ready(function() {
    var postsAddForm = $('#posts_add_form');
    var postsAddFormErrors = $('.alert-danger', postsAddForm);
    var postsAddFormSuccess = $('.alert-success', postsAddForm);

    //IMPORTANT: update CKEDITOR textarea with actual content before submit
    postsAddForm.on('submit', function() {
        // for(var instanceName in CKEDITOR.instances) {
        //     CKEDITOR.instances[instanceName].updateElement();
        // }
    })

    postsAddForm.validate({
        errorElement: 'span', //default input error message container
        errorClass: 'help-block help-block-error', // default input error message class
        focusInvalid: false, // do not focus the last invalid input
        ignore: "", // validate all fields including form hidden input
        rules: {
            title: {
                required: true
            },
            displayTitle: {
                required: true
            },
            shortDescription: {
                required: true
            },
            content: {
                required: true
            },
            categoryId: {
                required: true
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

        invalidHandler: function (activity, validator) { //display error alert on form submit   
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
            var url = postsAddForm.attr('action');
            var data = {
                title: $('#title').val(),
                content: $('#summernote123').summernote('code'),
                categoryId: $('#blogCategoriesId').val(),
                tags: $('#tags').val(),
                coverImage: $('#coverImage').val(),
                shortDescription: $('#shortDescription').val(),
            };

            if($("#breaking").val()== 'true'){
                data.isBreakingNews = true;
            }else{
                data.isBreakingNews = false;
            }
            $.ajax({
                url: url,
                type: 'POST',
                dataType: "json",
                data: JSON.stringify(data),
                contentType: "application/json; charset=utf-8",
                success: function(data) {
                    showAlertMessage('successMessage','Post added successfuly. You can view the Post details in <a href="/blog/posts"><i class="fa fa-file-text-o"></i> Posts</a>.','success','fa-check fa-lg');
                    window.location.replace("/admin/blog/posts");
                },
                error: function(data) {
                    showAlertMessage('internaleServerError', data, 'danger', 'fa-warning fa-lg');
                }
            });
        }

    });

     //apply validation on select2 dropdown value change, this only needed for chosen dropdown integration.
    $('.select2me', postsAddForm).change(function () {
        postsAddForm.validate().element($(this)); //revalidate the chosen dropdown value and show error or success message for the input
    });

    //initialize datepicker
    $('.date-picker').datepicker({
        rtl: App.isRTL(),
        autoclose: true
    });
    $('.date-picker .form-control').change(function() {
        postsAddForm.validate().element($(this)); //revalidate the chosen dropdown value and show error or success message for the input 
    });
});

populateBlogCategories(buildUrl(getAPIUrl(), 'blog-categories', getToken(), 3000));
$().ready(function() {
    var widget = uploadcare.Widget('[role=uploadcare-uploader]');
    widget.onUploadComplete(function(info) {
      // Handle uploaded file info.
      //alert('info : '+ JSON.stringify(info));
      $('#coverImagePreview').attr('src',info.cdnUrl + '-preview');
    });
     // Same as above:
    widget.onChange(function(file) {
      if (file) {
        file.done(function(info) {
          // Handle uploaded file info.
          //alert('file : '+ JSON.stringify(file));
        });
      };
    });

    $('#breakingnews').change(function() {
        if($("#breakingnews").is(':checked')){
            $("#breaking").val(true);
        }else{
            $("#breaking").val(false);
        }       
    });
});