$().ready(function() {
	
    var itemsAddForm = $('#items_edit_form');
    var itemsAddFormErrors = $('.alert-danger', itemsAddForm);
    var itemsAddFormSuccess = $('.alert-success', itemsAddForm);

    //IMPORTANT: update CKEDITOR textarea with actual content before submit
    itemsAddForm.on('submit', function() {
        // for(var instanceName in CKEDITOR.instances) {
        //     CKEDITOR.instances[instanceName].updateElement();
        // }
    })

    itemsAddForm.validate({
        errorElement: 'span', //default input error message container
        errorClass: 'help-block help-block-error', // default input error message class
        focusInvalid: false, // do not focus the last invalid input
        ignore: "", // validate all fields including form hidden input
        rules:  {
            name: {
                required: true
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
            // alert(itemsAddForm.attr('action'));
            var url = itemsAddForm.attr('action');
            var data = {
                name: $('#name').val(),
                lprice:parseInt($('#lprice').val()),
                categoryId:$('#itemCategoryId').val(),
                type:$('#itemType').val(),
                unit:$('#itemUnit').val(),
                price:$('#price').val(),
                description:$('#description').val()
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
                success: function(data) {
                    //showAlertMessage('successMessage','tasks added successfuly. You can view the tasks details in <a href="/taskss"><i class="icon-basket-loaded"></i> taskss</a>.','success','fa-check fa-lg');
                    window.location.replace("/items/"+$('#itemId').val());
                },
                error: function(data) {
                    showAlertMessage('internaleServerError', data, 'danger', 'fa-warning fa-lg');
                }
            });
        }

    });

    //apply validation on select2 dropdown value change, this only needed for chosen dropdown integration.
    $('.select2me', itemsAddForm).change(function () {
        itemsAddForm.validate().element($(this)); //revalidate the chosen dropdown value and show error or success message for the input
    });

    //initialize datepicker
    $('.date-picker').datepicker({
        rtl: App.isRTL(),
        autoclose: true
    });
    $('.date-picker .form-control').change(function() {
        itemsAddForm.validate().element($(this)); //revalidate the chosen dropdown value and show error or success message for the input
    });


    $.ajax({
       // url: $('#url').val(),
        url : itemsAddForm.attr('action'),
        type: 'GET',
        success: function(data) {
            if (data) {
                $('#name').val(data.item.name);
		        $('#itemCategoryId').val(data.item.category? data.item.category.name: '');
		        $('#itemType').val(data.item.type);
		        $('#itemUnit').val(data.item.unit);
		        $('#price').val(data.item.price);
		        $('#description').val(data.item.description);
		        if(data.item.mpServiceId && data.item.mpServiceId !=null){
		        	$('#check').addClass('hidden');
		        	$('#tser').removeClass('hidden');
		        	populateTrunetoItem(buildUrl(getAPIUrl(),'items-truneto', getToken(), 3000),false, data.item.mpServiceId);
		        }
            }
        },
        error: function(data) {
            showAlertMessage('internaleServerError', data, 'danger', 'fa-warning fa-lg');
        }
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