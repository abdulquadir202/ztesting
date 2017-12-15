
$().ready(function() {
    var prodData = null;

    var updateDetails = function(){
     //alert(JSON.stringify(prodData));
        $('#displayProductName').html(prodData.product.name);
        $('#pId').val(prodData.product.id);
        $('#displaySku').html(prodData.product.sku);
        $('#displayBrandName').html(prodData.product.brandName);
        if(prodData.product.category){
        $('#displayCategory').html(prodData.product.category.name);
        }
        //$('#displayColor').html(prodData.product.color);
        $('#displayUnit').html(prodData.product.unit || '');
        $('#displayPrice').html(prodData.product.price);
        $('#displaySalesPackage').html(prodData.product.discountedPrice);
        $('#displayPicture').html(prodData.product.picture);
        $('#displayDescription').html(prodData.product.description);
        $('#displayIsFeatured').html(prodData.product.isFeatured == true ? 'Yes':'No');
        $('#displayStock').html(prodData.product.stock);
        $('#coverImage').attr('src', prodData.product.coverImage);

        $('#piu').attr('href','/products/catalog/'+ prodData.product.id + '/images');
        var oldhref= $('#pVar').attr('href');

        $('#pVar').attr('href',oldhref+ '?id='+ prodData.product.id + '&unit=' + prodData.product.unit);
        
        if(prodData.product.productInventory && prodData.product.productInventory.length >0){
            for(var i=0; i < prodData.product.productInventory.length; i++){
                $('#cData').append(
                    '<tr>'+

                        '<td>'+(prodData.product.productInventory[i].empObj != undefined ? prodData.product.productInventory[i].empObj.name : '')+'</td>'+
                        '<td class="text-center">'+ (prodData.product.productInventory[i].empObj != undefined ? prodData.product.productInventory[i].empObj.mobile : '')+ '</td>'+
                        '<td class="text-center">'+prodData.product.productInventory[i].quantity+'</td>'+
                    '</tr>'
                );
            }
        }
        $('#ihs').html(prodData.product.inHouseStock);
        $('#es').html(prodData.product.employeeStock);
        $('#ts').html(prodData.product.stock);

        
        if(prodData.product.inventorylog && prodData.product.inventorylog.length >0){
            for(var i=0; i < prodData.product.inventorylog.length; i++){
                $('#iData').append(
                    '<tr>'+
                        '<td>'+moment(new Date(prodData.product.inventorylog[i].createdOn)).format("MMMM-Do-YYYY,h:mm:ss a")+'</td>'+
                        '<td class="text-center">'+ prodData.product.inventorylog[i].quantity+ '</td>'+
                        '<td class="text-center">'+prodData.product.inventorylog[i].comment+'</td>'+
                        '<td class="text-center">'+prodData.product.inventorylog[i].inhouse+'</td>'+
                        '<td class="text-center">'+prodData.product.inventorylog[i].emp+'</td>'+
                    '</tr>'
                );
            }
        }
        if(prodData.product.media){
             for (i = 0; i < prodData.product.media.length; i++) {
                var row = prodData.product.media[i];
                if(row.coverImage){
                    $('#images').append(
                        '<div class="col-lg-3 col-md-3 col-sm-6 col-xs-12" style="min-height:200px;">'+
                            '<div class="mt-element-overlay">'+
                                '<div class="row">'+
                                    '<div class="col-md-12">'+
                                        '<div class="mt-overlay-6">'+
                                            '<img src="'+ row.coverImage+'"/>'+
                                            '<div class="mt-overlay">'+
                                                '<h2>'+ row.name +'</h2>'+
                                                '<p>'+
                                                    '<a class="mt-info uppercase btn red default btn-outline" href="#">Delete</a>'+
                                                '</p>'+
                                            '</div>'+
                                        '</div>'+
                                    '</div>'+
                                '</div>'+
                            '</div>'+
                        '</div>'
                    );
                }
                
            }
        }
    };
    
    $.ajax({
        url: $('#url').val(),
        type: 'GET',
        success: function(data) {
            if (data) {
                prodData = data;
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
        var url = $('#apiUrl').val()+'/api/product/'+$('#pId').val()+'?token='+$('#token').val();
        $.ajax({
            url: url,
            type: 'DELETE',
            success: function(data) {
                if (data && data.status) {
                    //showAlertMessage('successMessage','Customer deleted successfuly.','success','fa-check fa-lg');
                    window.location = '/products/catalog';
                }
            },
            error: function(data) {
                showAlertMessage('internaleServerError', data, 'danger', 'fa-warning fa-lg');
            }
        });
    });

    // $("#updateCustomer").on('click',function(event){

    // });

    var productAddForm = $('#product_edit_form');
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
           // alert(productAddForm.attr('action'));
            var url = productAddForm.attr('action');

            // var data = new FormData();
            // jQuery.each(jQuery('#profilePic')[0].files, function(i, file) {
            //     data.append('file-'+i, file);
            // });

            var data = {   
                id: $('#productId').val(),
                name: $('#productName').val(),
                sku: $('#sku').val() !== '' ? $('#sku').val() : null,
                picture: $('#picture').val() !== '' ? $('#picture').val() : null,
                brandName: $('#brandName').val() !== '' ? $('#brandName').val() : null,
                categoryType: $('#categoryType').val() !== '' ? $('#categoryType').val() : null,
                color: $('#color').val() !== '' ? $('#color').val() : null,
                price: $('#price').val() !== '' ? $('#price').val() : null,
                salesPackage: parseInt($('#salesPackage').val()),
                description: $('#description').val() !== '' ? $('#description').val() : null
            };
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
});

$('#assignInvent').on('click',function(event){
    event.preventDefault();
    var url = $('#apiUrl').val()+ '/api/product/'+ $('#productId').val()+'/inventory?token='+  $('#token').val();
    var data = {
        productId: $('#productId').val(),
        quantity: parseInt($('#mQuantity').val()),
        employeeId: $('#employeeId').val()
    };
    $.ajax({
        url: url,
        type: 'POST',
        data: JSON.stringify(data),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function(data) {
            toastr.options.closeButton = true;
            toastr.success("Lead confirmed successfully.");
            window.location = '/products/catalog';

        },
        error: function(data) {
            showAlertMessage('internaleServerError', data, 'danger', 'fa-warning fa-lg');
            return false;
        }
    });
});

$('#addStock').on('click',function(event){
    event.preventDefault();
    var url = $('#apiUrl').val()+ '/api/product/'+$('#prdId').val()+'?token='+  $('#token').val();
    var data = {
        updatedStock: parseInt($('#sQuantity').val())
    };
    $.ajax({
        url: url,
        type: 'PUT',
        data: JSON.stringify(data),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function(data) {
            toastr.options.closeButton = true;
            toastr.success("Inventory updated");
            location.reload(); 
        },
        error: function(data) {
            showAlertMessage('internaleServerError', data, 'danger', 'fa-warning fa-lg');
            return false;
        }
    });
});



$(document).on('show.bs.modal','#assignProModal', function () {
  var data = null;
  var productId = $('#pId').val();
    data = {
            productId: productId
        };
    $('#productId').val(productId); 
  populateEmployees(buildUrl($('#apiUrl').val(),'employees', $('#token').val(), '30'),false, data.empid);
  $("#employeeId").select2({
      placeholder: "Select an employee",
      width: "100%"
  });

});

$(document).on('show.bs.modal','#assignStockModal', function () {
  var data = null;
  var productId = $('#productId').val();
    data = {
            productId: productId
        };
    $('#prdId').val(productId); 
  
});
    