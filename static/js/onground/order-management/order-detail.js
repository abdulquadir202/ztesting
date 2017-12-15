$().ready(function() {
    var orderData = null;

    //{"address":"jp nagar","country":"India","email":"ashutosh@zinetgo.com","landmark":"govt high school","mobile":"9886681566","name":"Ashu","pinCode":"560078"}

    var updateDetails = function(){

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
        $('#displayOrderNo').html(orderData.orderId);
        $('#oId').html(orderData.orderId);
        $('#oDate').html(new Date(orderData.orderDate).toISOString().slice(0, 10));
        $('#displayDate').html(new Date(orderData.orderDate).toISOString().slice(0, 10));
        $('#displayCustomer').html(orderData.customer.name);
        $('#displayCustomerEmail').html(orderData.customer.email);
        $('#displayCustomerMobile').html(orderData.customer.mobile);
        $('#displayGrossTotal').html(orderData.grossTotal);
        $('#paid').html(orderData.amountPaid);
        $('#due').html(orderData.grossTotal-orderData.amountPaid);
        $('#paid1').html(orderData.amountPaid);
        $('#due1').html(orderData.grossTotal-orderData.amountPaid);
        $('#displayStatus').html(orderData.orderStatus);
        $('#displayAddress').html(orderData.deliveryAddress);
        $('#displayMobile').html(orderData.mobile);

        $('#netTotal').html(orderData.netTotal);
        $('#deliveryCharge').html(orderData.deliveryCharge);
        $('#grossTotal').html(orderData.grossTotal);
        $('#netTotal1').html(orderData.netTotal);
        $('#deliveryCharge1').html(orderData.deliveryCharge);
        $('#grossTotal1').html(orderData.grossTotal);
        $('#billName').html(orderData.billingAddress.name);
        $('#billaddress').html(orderData.billingAddress.address);
        $('#billCountry').html(orderData.billingAddress.country);
        $('#billEmail').html(orderData.billingAddress.email);
        $('#billLandmark').html(orderData.billingAddress.landmark);
        $('#billMobile').html(orderData.billingAddress.mobile);
        $('#billPin').html(orderData.billingAddress.pinCode);

        $('#shipName').html(orderData.shippingAddress.name);
        $('#shipaddress').html(orderData.shippingAddress.address);
        $('#shipCountry').html(orderData.shippingAddress.country);
        $('#shipEmail').html(orderData.shippingAddress.email);
        $('#shipLandmark').html(orderData.shippingAddress.landmark);
        $('#shipMobile').html(orderData.shippingAddress.mobile);
        $('#shipPin').html(orderData.shippingAddress.pinCode);

        $('.billName').html(orderData.billingAddress.name);
        $('.billaddress').html(orderData.billingAddress.address);
        $('.billCountry').html(orderData.billingAddress.country);
        $('.billEmail').html(orderData.billingAddress.email);
        $('.billLandmark').html(orderData.billingAddress.landmark);
        $('.billMobile').html(orderData.billingAddress.mobile);
        $('.billPin').html(orderData.billingAddress.pinCode);

        $('.shipName').html(orderData.shippingAddress.name);
        $('.shipaddress').html(orderData.shippingAddress.address);
        $('.shipCountry').html(orderData.shippingAddress.country);
        $('.shipEmail').html(orderData.shippingAddress.email);
        $('.shipLandmark').html(orderData.shippingAddress.landmark);
        $('.shipMobile').html(orderData.shippingAddress.mobile);
        $('.shipPin').html(orderData.shippingAddress.pinCode);

        
        $('#paymentType').html(orderData.paymentMode ? orderData.paymentMode : '');
        

        Object.keys(orderData.cart.items).forEach(function(key, index) {
            // key: the name of the object key
            // index: the ordinal position of the key within the object
            var product = orderData.cart.items[key];
            $('#cData').append(
                '<tr>'+
                    '<td>'+
                        '<a href="javascript:;">'+ product.item.name+'</a>'+
                    '</td>'+
                    '<td>'+
                        '<span class="label label-sm label-success"> Available </td>'+
                    '<td>'+ product.item.price+ '</td>'+
                    '<td>'+product.item.discountedPrice+'</td>'+
                    '<td>'+product.qty +'</td>'+
                    '<td>0</td>'+
                    '<td>0</td>'+
                    '<td>0</td>'+
                    '<td>'+product.price+'</td>'+
                '</tr>'
             );
            $('.cData').append(
                '<tr>'+
                    '<td>'+
                         (index+1)+
                    '</td>'+
                    '<td>'+
                        '<a href="javascript:;">'+ product.item.name+'</a>'+
                    '</td>'+
                    '<td>'+product.item.discountedPrice+'</td>'+
                    '<td>'+product.qty +'</td>'+
                    '<td>'+product.price+'</td>'+
                '</tr>'
             );
        }); 
        if(orderData.paymentMode && orderData.paymentMode ==='COD')  {
            $('#paid').html('0');
            $('#due').html(orderData.grossTotal);

        }else{
            $('#paid').html(orderData.grossTotal);
            $('#due').html('0');
        }
    };
    
    $.ajax({
        url: $('#url').val(),
        type: 'GET',
        success: function(data) {
            if (data) {
                orderData = data;
                updateDetails();
            }
        },
        error: function(data) {
            showAlertMessage('internaleServerError', data, 'danger', 'fa-warning fa-lg');
        }
    });

    $("#showEdit").on('click',function(event){
         //populate edit form data
        $('#orderDate').val(new Date(orderData.orderDate).toISOString().slice(0, 10));
        $('#customerId').val(orderData.customerId);
        $('#itemId').val(orderData.itemId);
        $('#grossTotal').val(orderData.grossTotal);
        $('#amountPaid').val(orderData.amountPaid);
        $('#deliveryAddress').val(orderData.deliveryAddress);
        $('#orderStatus').val(orderData.orderStatus);

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

        swal({
            title: "Are you sure to delete this?",
            text: "You will not be able to recover this item once deleted!",
            type: "info",
            showCancelButton: true,
            closeOnConfirm: false,
            showLoaderOnConfirm: true
        }, function () {
            var url = $('#url').val();
            $.ajax({
                url: url,
                type: 'DELETE',
                success: function(data) {
                    if (data && data.status) {
                        swal("Deleted!", "Item has been deleted successfully.", "success");
                        window.location = '/orders';
                    }
                },
                error: function(data) {
                    showAlertMessage('internaleServerError', data, 'danger', 'fa-warning fa-lg');
                    return false;
                }
            });
        });
    });


    var orderAddForm = $('#order_edit_form');
    var orderAddFormErrors = $('.alert-danger', orderAddForm);
    var orderAddFormSuccess = $('.alert-success', orderAddForm);

    //IMPORTANT: update CKEDITOR textarea with actual content before submit
    orderAddForm.on('submit', function() {
        // for(var instanceName in CKEDITOR.instances) {
        //     CKEDITOR.instances[instanceName].updateElement();
        // }
    })

    orderAddForm.validate({
        errorElement: 'span', //default input error message container
        errorClass: 'help-block help-block-error', // default input error message class
        focusInvalid: false, // do not focus the last invalid input
        ignore: "", // validate all fields including form hidden input
        rules: {
            orderDate:{
                required: true
            },
            customerId: {
                required: true
            },
            grossTotal: {
                required: true
            },
            amountPaid: {
                required: true
            },
            orderStatus: {
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
            var url = orderAddForm.attr('action');

            // var data = new FormData();
            // jQuery.each(jQuery('#profilePic')[0].files, function(i, file) {
            //     data.append('file-'+i, file);
            // });

            var data = {
                id: $('#orderId').val(),
                orderDate: getDate($('#orderDate').val()),
                customerId: $('#customerId').val(),
                itemId: $('#itemId').val(),
                grossTotal: parseFloat($('#grossTotal').val()),
                amountPaid: parseFloat($('#amountPaid').val()),
                deliveryAddress: $('#deliveryAddress').val(),
                orderStatus: $('#orderStatus').val()
            };
            // data.append('mobile', $('#mobile').val());
            // data.append('name', $('#name').val());
            // data.append('email', $('#email').val());
            // data.append('address', $('#address').val());
            //data.append('profilePic', $('#profilePic').val());

            // var data = new FormData();
            // jQuery.each(jQuery('#profilePic')[0].files, function(i, file) {
            //     data.append('file-'+i, file);
            // });
            $.ajax({
                // url: url,
                // type: 'POST',
                // //dataType: "json"
                // cache: false,
                // contentType: false,
                // processData: false,
                // //type: 'POST',
                // data: data,//JSON.stringify(data),
                // //contentType: false,//"application/json; charset=utf-8",
                url: url,
                type: 'PUT',
                dataType: "json",
                data: JSON.stringify(data),
                contentType: "application/json; charset=utf-8",
                success: function(data1) {
                    showAlertMessage('successMessage','Order updated successfuly.','success','fa-check fa-lg');
                    window.location.replace("/orders");
                    orderData = data1.result;

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
    $('.select2me', orderAddForm).change(function () {
        orderAddForm.validate().element($(this)); //revalidate the chosen dropdown value and show error or success message for the input
    });

    //initialize datepicker
    $('.date-picker').datepicker({
        rtl: App.isRTL(),
        autoclose: true
    });
    $('.date-picker .form-control').change(function() {
        orderAddForm.validate().element($(this)); //revalidate the chosen dropdown value and show error or success message for the input 
    });

    populateCustomers(buildUrl(getAPIUrl(),'customers', getToken(), 3000),false);
    populateItems(buildUrl(getAPIUrl(),'items', getToken(), 3000),false);
    addItem(buildUrl(getAPIUrl(),'item', getToken(), null), buildUrl(getAPIUrl(),'items', getToken(), 3000));
    addCustomer(buildUrl(getAPIUrl(),'customer', getToken(), null),buildUrl(getAPIUrl(),'customers', getToken(), 3000));

    $('#orderDate').val(moment().format('DD-MM-YYYY'));

    $("#grossTotal").bind("change paste keyup", function() {
        if($.isNumeric($("#grossTotal").val()) && $.isNumeric($('#amountPaid').val())){
            $('#amountPaid').val($("#grossTotal").val());
            $('#amountDueDiv').removeClass("hide");
            $('#amountDue').html(parseFloat($('#grossTotal').val()) - parseFloat($('#amountPaid').val()));
        }
    });
    $("#amountPaid").bind("change paste keyup", function() {
        if($.isNumeric($("#grossTotal").val()) && $.isNumeric($('#amountPaid').val())){
            $('#amountDueDiv').removeClass("hide");
            $('#amountDue').html(parseFloat($('#grossTotal').val()) - parseFloat($('#amountPaid').val()));
        }
    });
    var cItems = $("#cartItem").val();

    $(document).on('show.bs.modal','#invoice', function (event) {
        
        $("#download-me").click(function(){
            var printContents = document.getElementById('pdf').innerHTML;
            printContents = '<html><head><link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet"><link href="https://www.zinetgo.com/dist/css/zinetgo.min.css" rel="stylesheet"></head><body>'+ printContents;
            printContents = printContents + '</body></html>';
            window.open().document.write(printContents);
        });
    });

});