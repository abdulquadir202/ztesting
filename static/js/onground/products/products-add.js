$().ready(function() {
    var productAddForm = $('#product_add_form');
    var productAddFormErrors = $('.alert-danger', productAddForm);
    var productAddFormSuccess = $('.alert-success', productAddForm);

    //IMPORTANT: update CKEDITOR textarea with actual content before submit
    productAddForm.on('submit', function() {
        // for(var instanceName in CKEDITOR.instances) {
        //     CKEDITOR.instances[instanceName].updateElement();
        // }
    })

    productAddForm.validate({
        errorElement: 'span', //default input error message container
        errorClass: 'help-block help-block-error', // default input error message class
        focusInvalid: false, // do not focus the last invalid input
        ignore: "", // validate all fields including form hidden input
        rules: {
            itemCategoryId: {
                required: true
            },
            productName: {
                required: true
            },
            price: {
                required: true
            },
            sku: {
                required: true
            },
            unit: {
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
            var url = productAddForm.attr('action');
            
            var data = new FormData();
            jQuery.each(jQuery('#fileToUpload')[0].files, function(i, file) {
                data.append('fileToUpload', file);
            });
            data.append('name',$('#productName').val());
            data.append('categoryId',$('#itemCategoryId').val());
            data.append('sku',$('#sku').val());
            data.append('picture',$('#fileToUpload').val());
            data.append('brandName',$('#brandName').val());
            data.append('isFeatured',$('input[name=isFeatured]:checked').val());
            data.append('price',parseInt($('#price').val()));
            data.append('discountedPrice',parseInt($('#discountedPrice').val()));
            data.append('stock',$('#stock').val());
            data.append('description',$('#description').val());
            data.append('unit',$('#unit').val());

           
            if($('#discountedPrice').val() ===undefined || isNaN($('#discountedPrice').val()) || $('#discountedPrice').val() ==null || $('#discountedPrice').val() ==''){
                data.discountedPrice = parseInt($('#price').val());
                
            }

            $.ajax({
                url: url,
                type: 'POST',
                data: data,
                enctype: 'multipart/form-data',
                processData: false,  // tell jQuery not to process the data
                contentType: false,   // tell jQuery not to set contentType

                success: function(data) {
                    showAlertMessage('successMessage','Item added successfuly. You can view the item details in <a href="/items"><i class="icon-layers"></i> Items</a>.','success','fa-check fa-lg');
                    window.location.replace("/products/catalog");
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
            //         showAlertMessage('successMessage','Product added successfuly. You can view the product details in <a href="/products/catalog"><i class="fa fa-cubes"></i> product</a>.','success','fa-check fa-lg');
            //         window.location.replace("/products/catalog");
            //     },
            //     error: function(data) {
            //         showAlertMessage('internaleServerError', data, 'danger', 'fa-warning fa-lg');
            //     }
            // });
        }

    });

     //apply validation on select2 dropdown value change, this only needed for chosen dropdown integration.
    $('.select2me', productAddForm).change(function () {
        productAddForm.validate().element($(this)); //revalidate the chosen dropdown value and show error or success message for the input
    });

    //initialize datepicker
    $('.date-picker').datepicker({
        rtl: App.isRTL(),
        autoclose: true
    });
    $('.date-picker .form-control').change(function() {
        productAddForm.validate().element($(this)); //revalidate the chosen dropdown value and show error or success message for the input 
    });

    populateItemCategory(buildUrl(getAPIUrl(),'categories', getToken(), 3000));
    addItemCategory(buildUrl(getAPIUrl(),'category', getToken(), null),buildUrl(getAPIUrl(),'categories', getToken(), 3000));
});