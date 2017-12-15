
$().ready(function() {
    var catData = null;

    var updateDetails = function(){
        
        $('#displayCategoryName').html(catData.category.name);
        //$('#displayCategory').html(catData.category.category.name);
        $('#displayPicture').html(catData.category.picture);
        $('#displayDescription').html(catData.category.description);

        $('#coverImage').attr('src', catData.category.coverImage);
        
    };
    
    $.ajax({
        url: $('#url').val(),
        type: 'GET',
        success: function(data) {
            if (data) {
                catData = data;
                updateDetails();
            }
        },
        error: function(data) {
            showAlertMessage('internaleServerError', data, 'danger', 'fa-warning fa-lg');
        }
    });

    $("#showEdit").on('click',function(event){
         //populate edit form data
        $('#productName').val(catData.category.name);
        $('#picture').val(catData.picture);
        $('#description').val(catData.category.description);

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
                    window.location = '/categories';
                }
            },
            error: function(data) {
                showAlertMessage('internaleServerError', data, 'danger', 'fa-warning fa-lg');
            }
        });
    });

    // $("#updateCustomer").on('click',function(event){

    // });

    var categoryAddForm = $('#product_edit_form');
    var productAddFormErrors = $('.alert-danger', categoryAddForm);
    var productAddFormSuccess = $('.alert-success', categoryAddForm);

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
            productName: {
                required: true
            },
            brandName: {
                required: true
            },
            price: {
                required: true
            },
            salesPackage: {
                required: true
            },
            sku: {
                required: true
            }
        },

        messages: { // custom messages for radio buttons and checkboxes
            amount: {
                //required: "Please enter amount."
            },
            type: {
                //required: "Please select a type"
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
           // alert(categoryAddForm.attr('action'));
            var url = categoryAddForm.attr('action');

            // var data = new FormData();
            // jQuery.each(jQuery('#profilePic')[0].files, function(i, file) {
            //     data.append('file-'+i, file);
            // });

            var data = {   
                id: $('#categoryId').val(),
                name: $('#categoryName').val(),
                picture: $('#picture').val() !== '' ? $('#picture').val() : null,
                description: $('#description').val() !== '' ? $('#description').val() : null
            };
            
            $.ajax({
                url: url,
                type: 'PUT',
                dataType: "json",
                data: JSON.stringify(data),
                contentType: "application/json; charset=utf-8",
                success: function(data1) {
                    showAlertMessage('successMessage','Product updated successfuly.','success','fa-check fa-lg');
                    window.location.replace("/categories");
                    catData = data1.result;

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
});