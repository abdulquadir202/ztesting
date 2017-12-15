
$().ready(function() {
    var maintenanceData = null;

    var updateDetails = function(){ 
        //alert(JSON.stringify(maintenanceData));
        var date = moment(new Date(maintenanceData.dueDate)).format("DD-MMM-YYYY");
        $('#displayType').html(maintenanceData.type);
        $('#displayAsset').html(maintenanceData.asset.assetId);
        $('#displayDate').html(date);
        $('#displayService').html(maintenanceData.item.name);
        $('#displayServiceUnit').html(maintenanceData.item.unit);
        $('#displayServicePrice').html(maintenanceData.item.price);
        $('#displayEngineer').html(maintenanceData.employee.name);
        $('#displayEngineerMobile').html(maintenanceData.employee.mobile);
        $('#displayEngineerEmail').html(maintenanceData.employee.email);
        $('#displayStatus').html(maintenanceData.mstatus);
        $('#displayDescription').html(maintenanceData.description);
    };  
    
    $.ajax({
        url: $('#url').val(),
        type: 'GET',
        success: function(data) {
            if (data) {
                maintenanceData = data;
                updateDetails();
            }
        },
        error: function(data) {
            showAlertMessage('internaleServerError', data, 'danger', 'fa-warning fa-lg');
        }
    });

    $("#showEdit").on('click',function(event){
        //populate edit form data
        var date = moment(new Date(maintenanceData.dueDate)).format("DD-MMM-YYYY");
        $('#type').val(maintenanceData.type);
        $('#assetId').val(maintenanceData.asset.assetId);
        $('#dueDate').val(date);
        $('#itemId').val(maintenanceData.itemId);
        $('#employeeId').val(maintenanceData.employeeId);
        $('#status').val(maintenanceData.status);
        $('#description').val(maintenanceData.description);

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
                    window.location = '/maintenance';
                }
            },
            error: function(data) {
                showAlertMessage('internaleServerError', data, 'danger', 'fa-warning fa-lg');
            }
        });
    });

    // $("#updateCustomer").on('click',function(event){

    // });

    var maintenanceEditForm = $('#maintenance_edit_form');
    var maintenanceEditFormErrors = $('.alert-danger', maintenanceEditForm);
    var maintenanceEditFormSuccess = $('.alert-success', maintenanceEditForm);

    //IMPORTANT: update CKEDITOR textarea with actual content before submit
    maintenanceEditForm.on('submit', function() {
        // for(var instanceName in CKEDITOR.instances) {
        //     CKEDITOR.instances[instanceName].updateElement();
        // }
    })

    maintenanceEditForm.validate({
        errorElement: 'span', //default input error message container
        errorClass: 'help-block help-block-error', // default input error message class
        focusInvalid: false, // do not focus the last invalid input
        ignore: "", // validate all fields including form hidden input
        rules: {
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
           // alert(authorsEditForm.attr('action'));
            //var url = maintenanceEditForm.attr('action');
            var url = $('#url').val();
            // var data = new FormData();
            // jQuery.each(jQuery('#profilePic')[0].files, function(i, file) {
            //     data.append('file-'+i, file);
            // });

            var data = {
                id:$('#maintenanceId').val(),
                type: $('#type').val(),
                assetId: $('#assetId').val(),
                dueDate: $('#dueDate').val(),
                itemId: $('#itemId').val(),
                employeeId: $('#employeeId').val(),
                mstatus: $('#status').val(),
                description: $('#description').val()
            };
            $.ajax({
                url: url,
                type: 'PUT',
                dataType: "json",
                data: JSON.stringify(data),
                contentType: "application/json; charset=utf-8",
                success: function(data1) {
                    showAlertMessage('successMessage','Authors updated successfuly.','success','fa-check fa-lg');
                    window.location.replace("/maintenance");
                    maintenanceData = data1.result;

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
    $('.select2me', maintenanceEditForm).change(function () {
        maintenanceEditForm.validate().element($(this)); //revalidate the chosen dropdown value and show error or success message for the input
    });

    //initialize datepicker
    $('.date-picker').datepicker({
        rtl: App.isRTL(),
        autoclose: true
    });
    $('.date-picker .form-control').change(function() {
        maintenanceEditForm.validate().element($(this)); //revalidate the chosen dropdown value and show error or success message for the input 
    });

    populateEmployees(buildUrl(getAPIUrl(),'employees', getToken(), 3000),false);
    addEmployee(buildUrl(getAPIUrl(),'employee', getToken(), null),buildUrl(getAPIUrl(),'employees', getToken(), 3000));

    populateItems(buildUrl(getAPIUrl(),'items', getToken(), 3000),false);
    

    addItem(buildUrl(getAPIUrl(),'item', getToken(), null),buildUrl(getAPIUrl(),'items', getToken(), 3000));

    $('#dueDate').val(moment().format('DD-MM-YYYY'));
});