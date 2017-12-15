$().ready(function() {
    var itemData = null;

    var updateDetails = function(){

        $('#displayName').html(itemData.item.name);
        $('#displayCategory').html(itemData.item.category? itemData.item.category.name: '');
        $('#displayType').html(itemData.item.type);
        $('#displayUnit').html(itemData.item.unit);
        $('#displayPrice').html(itemData.item.price);
        $('#displayleadPrice').html(itemData.item.lprice || 0);
        $('#displayDescription').html(itemData.item.description);
    };  
    
    $.ajax({
        url: $('#url').val(),
        type: 'GET',
        success: function(data) {
            if (data) {
                itemData = data;
                updateDetails();
            }
        },
        error: function(data) {
            showAlertMessage('internaleServerError', data, 'danger', 'fa-warning fa-lg');
        }
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
                    window.location = '/items';
                }
            },
            error: function(data) {
                showAlertMessage('internaleServerError', data, 'danger', 'fa-warning fa-lg');
            }
        });
    });

    // $("#updateCustomer").on('click',function(event){

    // });

    var itemsEditForm = $('#items_edit_form');
    var itemsEditFormErrors = $('.alert-danger', itemsEditForm);
    var itemsEditFormSuccess = $('.alert-success', itemsEditForm);

    //IMPORTANT: update CKEDITOR textarea with actual content before submit
    itemsEditForm.on('submit', function() {
        // for(var instanceName in CKEDITOR.instances) {
        //     CKEDITOR.instances[instanceName].updateElement();
        // }
    })

    itemsEditForm.validate({
        errorElement: 'span', //default input error message container
        errorClass: 'help-block help-block-error', // default input error message class
        focusInvalid: false, // do not focus the last invalid input
        ignore: "", // validate all fields including form hidden input
        rules: {
           name: {
                required: true
            },
            categoryId: {
                required: true
            },
            type: {
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
           // alert(itemsEditForm.attr('action'));
            var url = itemsEditForm.attr('action');

            // var data = new FormData();
            // jQuery.each(jQuery('#profilePic')[0].files, function(i, file) {
            //     data.append('file-'+i, file);
            // });

            var data = {
                id:$('#itemId').val(),
                name: $('#name').val(),
                categoryId: $('#itemCategoryId').val(),
                type: $('#itemType').val(),
                unit: $('#itemUnit').val(),
                price: $('#price').val(),
                description: $('#description').val()
            };
            if($('#mpServiceId').val() || $('#mpServiceId').val() !=null){
                data.mpServiceId = $('#mpServiceId').val();
                data.mpId = '0e0234a9-ade2-4b07-95be-464371450bd4';
            }

            $.ajax({
                url: url,
                type: 'PUT',
                dataType: "json",
                data: JSON.stringify(data),
                contentType: "application/json; charset=utf-8",
                success: function(data1) {
                    showAlertMessage('successMessage','Items updated successfuly.','success','fa-check fa-lg');
                    window.location.replace("/items");
                    itemData = data1.result;

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
    $('.select2me', itemsEditForm).change(function () {
        itemsEditForm.validate().element($(this)); //revalidate the chosen dropdown value and show error or success message for the input
    });

    //initialize datepicker
    $('.date-picker').datepicker({
        rtl: App.isRTL(),
        autoclose: true
    });
    $('.date-picker .form-control').change(function() {
        itemsEditForm.validate().element($(this)); //revalidate the chosen dropdown value and show error or success message for the input 
    });

    populateItemCategory(buildUrl(getAPIUrl(),'categories', getToken(), 3000));

    addItemCategory(
        buildUrl(getAPIUrl(),'category', getToken(), 3000),
        buildUrl(getAPIUrl(),'categories', getToken(), 3000)
        );

    $('#addToTruneto').change(function() {
        if($("#addToTruneto").is(':checked')){
            $('#tser').removeClass('hidden');
            populateTrunetoItem(buildUrl(getAPIUrl(),'items-truneto', getToken(), 3000));
        }else{
            $('#tser').addClass('hidden');
        }       
    });
});