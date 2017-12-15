$().ready(function() {
    var productsAddForm = $('#products_add_form');
    var productsAddFormErrors = $('.alert-danger', productsAddForm);
    var productsAddFormSuccess = $('.alert-success', productsAddForm);

    //IMPORTANT: update CKEDITOR textarea with actual content before submit
    productsAddForm.on('submit', function() {
        // for(var instanceName in CKEDITOR.instances) {
        //     CKEDITOR.instances[instanceName].updateElement();
        // }
    })


    productsAddForm.validate({
        errorElement: 'span', //default input error message container
        errorClass: 'help-block help-block-error', // default input error message class
        focusInvalid: false, // do not focus the last invalid input
        ignore: "", // validate all fields including form hidden input
        rules: {
            productName: {
                required: true
            },
            sku: {
                required: true
            },
            categoryId: {
                required: true
            },
            brandName: {
                required: true
            },
            price: {
                required: true
            },
            stock:{
                required: true
            },
            unit:{
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
            // alert(productsAddForm.attr('action'));
            var url = productsAddForm.attr('action');

            var data = new FormData();
            jQuery.each(jQuery('#fileToUpload')[0].files, function(i, file) {
                data.append('fileToUpload', file);
            });
            data.append('name',$('#productName').val());
            data.append('categoryId',$('#categoryId').val());
            data.append('sku',$('#sku').val());
            data.append('picture',$('#fileToUpload').val());
            data.append('brandName',$('#brandName').val());
            //data.append('isFeatured',$('input[name=isFeatured]:checked').val());
            data.append('price',parseInt($('#price').val()));
            //data.append('discountedPrice',parseInt($('#discountedPrice').val()));
            data.append('stock',$('#stock').val());
            data.append('description',$('#description').val());
            data.append('unit',$('#unit').val());

            $.ajax({
                url: url,
                type: 'PUT',
                data: data,
                enctype: 'multipart/form-data',
                processData: false,  // tell jQuery not to process the data
                contentType: false, 
                success: function(data) {
                    //showAlertMessage('successMessage','products added successfuly. You can view the products details in <a href="/productss"><i class="icon-basket-loaded"></i> productss</a>.','success','fa-check fa-lg');
                    window.location.replace("/products/catalog");
                },
                error: function(data) {
                    showAlertMessage('internaleServerError', data, 'danger', 'fa-warning fa-lg');
                }
            });
        }

    });

    //apply validation on select2 dropdown value change, this only needed for chosen dropdown integration.
    $('.select2me', productsAddForm).change(function () {
        productsAddForm.validate().element($(this)); //revalidate the chosen dropdown value and show error or success message for the input
    });

    //initialize datepicker
    $('.date-picker').datepicker({
        rtl: App.isRTL(),
        autoclose: true
    });
    $('.date-picker .form-control').change(function() {
        productsAddForm.validate().element($(this)); //revalidate the chosen dropdown value and show error or success message for the input
    });


    $.ajax({
       // url: $('#url').val(),
        url : productsAddForm.attr('action'),
        type: 'GET',
        success: function(data) {
            if (data) {
                var token = $('#token').val();
                var sUrl = $('#apiUrl').val();
                populateCategories(buildUrl(sUrl,'categories', token, '3000'),false, data.product.categoryId);
                
                addCategory(buildUrl(sUrl,'category', token, null),buildUrl(sUrl,'categories', token, '3000'));

                $('.lid').html(data.product.name);
                $('#categoryId').val(data.product.categoryId);
                $('#brandName').val(data.product.brandName);
                $('#productName').val(data.product.name);
                $('#description').val(data.product.description);
                $('#price').val(data.product.price);
                $('#salesPackage').val(data.product.discountedPrice);
                $('#stock').val(data.product.stock);
                $('#sku').val(data.product.sku);
                $('#unit').select2({
                    value: data.product.unit
                });
            }
        },
        error: function(data) {
            showAlertMessage('internaleServerError', data, 'danger', 'fa-warning fa-lg');
        }
    });


});