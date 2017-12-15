$().ready(function() {
    var categoryAddForm = $('#category_add_form');
    var categoryAddFormErrors = $('.alert-danger', categoryAddForm);
    var categoryAddFormSuccess = $('.alert-success', categoryAddForm);

    //IMPORTANT: update CKEDITOR textarea with actual content before submit
    categoryAddForm.on('submit', function() {
        // for(var instanceName in CKEDITOR.instances) {
        //     CKEDITOR.instances[instanceName].updateElement();
        // }
    })

    categoryAddForm.validate({
        errorElement: 'span', //default input error message container
        errorClass: 'help-block help-block-error', // default input error message class
        focusInvalid: false, // do not focus the last invalid input
        ignore: "", // validate all fields including form hidden input
        rules: {
            categoryName: {
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

        invalidHandler: function (category, validator) { //display error alert on form submit   
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
            var url = categoryAddForm.attr('action');
            
            var data = new FormData();
            jQuery.each(jQuery('#fileToUpload')[0].files, function(i, file) {
                data.append('fileToUpload', file);
            });
            data.append('name',$('#categoryName').val());
            data.append('parentId',$('#itemCategoryId').val());
            data.append('picture',$('#fileToUpload').val());
            data.append('description',$('#description').val());
            

            $.ajax({
                url: url,
                type: 'POST',
                data: data,
                //dataType: "json",
                //data:itemAddForm.serialize(),
                //cache:false,
                //data: JSON.stringify(data),
                //contentType: "application/json; charset=utf-8",
                //contentType: false,
                enctype: 'multipart/form-data',
                processData: false,  // tell jQuery not to process the data
                contentType: false,   // tell jQuery not to set contentType

                success: function(data) {
                    showAlertMessage('successMessage','Item added successfuly. You can view the item details in <a href="/items"><i class="icon-layers"></i> Items</a>.','success','fa-check fa-lg');
                    window.location.replace("/categories");
                },
                error: function(data) {
                    showAlertMessage('internaleServerError', data, 'danger', 'fa-warning fa-lg');
                }
            });


            

            // $.ajax({
            //     url: url,
            //     type: 'POST',
            //     dataType: "json",
            //     data: JSON.stringify(data),
            //     contentType: "application/json; charset=utf-8",
            //     success: function(data) {
            //         showAlertMessage('successMessage','Product added successfuly. You can view the category details in <a href="/categorys/catalog"><i class="fa fa-cubes"></i> category</a>.','success','fa-check fa-lg');
            //         window.location.replace("/categorys/catalog");
            //     },
            //     error: function(data) {
            //         showAlertMessage('internaleServerError', data, 'danger', 'fa-warning fa-lg');
            //     }
            // });
        }

    });

     //apply validation on select2 dropdown value change, this only needed for chosen dropdown integration.
    $('.select2me', categoryAddForm).change(function () {
        categoryAddForm.validate().element($(this)); //revalidate the chosen dropdown value and show error or success message for the input
    });

    //initialize datepicker
    $('.date-picker').datepicker({
        rtl: App.isRTL(),
        autoclose: true
    });
    $('.date-picker .form-control').change(function() {
        categoryAddForm.validate().element($(this)); //revalidate the chosen dropdown value and show error or success message for the input 
    });

    populateItemCategory(buildUrl(getAPIUrl(),'categories', getToken(), 3000),false, true);
});