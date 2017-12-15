$().ready(function() {
    var assetData = null;

    //{"address":"jp nagar","country":"India","email":"ashutosh@zinetgo.com","landmark":"govt high school","mobile":"9886681566","name":"Ashu","pinCode":"560078"}

    var updateDetails = function(){
       // alert(JSON.stringify(assetData));

        /*$("#cDiv").append(
            '<div class="table-responsive">'+
                '<table class="table table-hover table-bordered table-striped">'+
                    '<thead>'+
                        '<tr>'+

                            '<th> Product </th>'+
                            '<th> Item Status </th>'+
                            '<th> Original Price </th>'+
                            '<th> Price </th>'+
                            '<th> Quantity </th>'+
                            '<th> Tax Amount </th>'+
                            '<th> Tax Percent </th>'+
                            '<th> Discount Amount </th>'+
                            '<th> Total </th>'+
                        '</tr>'+
                    '</thead>'+
                    '<tbody id="cData"></tbody>'+
                '</table>'+
            '</div>'
        );*/
        $('#displayTagId').html(assetData.tagId);
        $('#displayCustomer').html(assetData.customer.name);
        $('#displayCustomerEmail').html(assetData.customer.email);
        $('#displayCustomerMobile').html(assetData.customer.mobile);
        $('#displayPrice').html(assetData.price);
        $('#displayStatus').html(assetData.astatus);
        $('#displayDescription').html(assetData.description);
        $('#displayType').html(assetData.type);
    };
    
    $.ajax({
        url: $('#url').val(),
        type: 'GET',
        success: function(data) {
            if (data) {
                assetData = data;
                updateDetails();
            }
        },
        error: function(data) {
            showAlertMessage('internaleServerError', data, 'danger', 'fa-warning fa-lg');
        }
    });

    $("#showEdit").on('click',function(event){
         //populate edit form data
        
        $('#tagId').val(assetData.tagId);
        $('#type').val(assetData.type);
        $('#price').val(assetData.price);
        $('#description').val(assetData.description);
        $('#astatus').val(assetData.astatus);

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
                    window.location = '/asset';
                }
            },
            error: function(data) {
                showAlertMessage('internaleServerError', data, 'danger', 'fa-warning fa-lg');
            }
        });
    });

    // $("#updateCustomer").on('click',function(event){

    // });

    var assetAddForm = $('#asset_edit_form');
    var assetAddFormErrors = $('.alert-danger', assetAddForm);
    var assetAddFormSuccess = $('.alert-success', assetAddForm);

    //IMPORTANT: update CKEDITOR textarea with actual content before submit
    assetAddForm.on('submit', function() {
        // for(var instanceName in CKEDITOR.instances) {
        //     CKEDITOR.instances[instanceName].updateElement();
        // }
    })

    assetAddForm.validate({
        errorElement: 'span', //default input error message container
        errorClass: 'help-block help-block-error', // default input error message class
        focusInvalid: false, // do not focus the last invalid input
        ignore: "", // validate all fields including form hidden input
        rules: {
            tagId:{
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
           // alert(orderAddForm.attr('action'));
            var url = assetAddForm.attr('action');

            // var data = new FormData();
            // jQuery.each(jQuery('#profilePic')[0].files, function(i, file) {
            //     data.append('file-'+i, file);
            // });

            var data = {
                id: $('#assetId').val(),
                tagId: $('#tagId').val(),
                customerId: $('#customerId').val(),
                type: $('#type').val(),
                description: $('#description').val(),
                price: $('#price').val(),
                astatus: $('#astatus').val()
            };
           
            $.ajax({
                url: url,
                type: 'PUT',
                dataType: "json",
                data: JSON.stringify(data),
                contentType: "application/json; charset=utf-8",
                success: function(data1) {
                    showAlertMessage('successMessage','Order updated successfuly.','success','fa-check fa-lg');
                    window.location.replace("/asset");
                    assetData = data1.result;

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
    $('.select2me', assetAddForm).change(function () {
        assetAddForm.validate().element($(this)); //revalidate the chosen dropdown value and show error or success message for the input
    });
    $("#download-me").click(function(event){
        var doc = new jsPDF();
        doc.canvas.height = 72 * 11;
        doc.canvas.width = 72 * 8.5;
        
        //$('#mPrice').val(data.price);
        var specialElHandlers = { 
         '#remove-me': function(element, renderer){
           return true;
         }
        };
        var source = window.document.getElementsByClassName("portlet-body form")[0];
        doc.fromHTML(
            source,
           15, 
           15, 
           {
            width: 180,
            'elementHandlers': specialElHandlers
            });
            event.preventDefault();
            doc.save('quotation.pdf');
        });


     populateCustomers(buildUrl(getAPIUrl(),'customers', getToken(), 3000),false);
       
    addCustomer(buildUrl(getAPIUrl(),'customer', getToken(), null),buildUrl(getAPIUrl(),'customers', getToken(), 3000));
});