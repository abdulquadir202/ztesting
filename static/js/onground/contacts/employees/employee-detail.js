$().ready(function() {
    var employeeAddForm = $('#employee_add_form');
    var employeeAddFormErrors = $('.alert-danger', employeeAddForm);
    var employeeAddFormSuccess = $('.alert-success', employeeAddForm);

    $.ajax({
        url: $('#url').val(),
        type: 'GET',
        success: function(data) {
            //alert(JSON.stringify(data));
            // showAlertMessage('successMessage','Event added successfuly. You can view the employee details in <a href="/wa/employee"><i class="fa fa-cubes"></i> employee</a>.','success','fa-check fa-lg');
            // window.location.replace("/wa/employee/"+ data.result.id + "/upload-photos");
            if (data) {
                $('#empId').html(data.empId);
                $('#joingingDate').html(moment(new Date(data.joingingDate)).format("DD-MMM-YYYY"));
                $('#name').html(data.name);
                $('#mobile').html(data.mobile);
                $('#employementType').html(data.employmentType);
                $('.lid').html(data.empId);
                if(data.designation && data.designation.length>0){
                    $('#designation').html(data.designation.name);
                }else{
                    $('#designation').html('');
                }
                if(data.department && data.department.length>0){
                   $('#department').html(data.department.name);
                }else{
                    $('#department').html('');
                }
                if(data.productInventory && data.productInventory.length>0){
                    for(var i=0; i< data.productInventory.length; i++){
                        $('#cData').append(
                            '<tr>'+
                                '<td>'+
                                    '<a href="javascript:;">'+ data.productInventory[i].productObj.name+'</a>'+
                                '</td>'+
                                '<td>'+ data.productInventory[i].productObj.price+ '</td>'+
                                '<td>'+data.productInventory[i].quantity+'</td>'+
                            '</tr>'
                        );
                    }
                }
                if(data.inventorylog && data.inventorylog.length >0){
                    for(var i=0; i < data.inventorylog.length; i++){
                        $('#iData').append(
                            '<tr>'+
                                '<td>'+moment(new Date(data.inventorylog[i].createdOn)).format("MMMM Do YYYY,h:mm:ss a")+'</td>'+
                                '<td class="text-center">'+ data.inventorylog[i].productName+ '</td>'+
                                '<td class="text-center">'+ data.inventorylog[i].quantity+ '</td>'+
                                '<td class="text-center">'+ data.inventorylog[i].comment+ '</td>'+
                                '<td class="text-center">'+data.inventorylog[i].before+'</td>'+
                                '<td class="text-center">'+data.inventorylog[i].after+'</td>'+
                            '</tr>'
                        );
                    }
                }
            }
        },
        
        error: function(data) {
            showAlertMessage('internaleServerError', data, 'danger', 'fa-warning fa-lg');
        }
    });


    $('.btn-delete').on('click',function(event) {
        var url = $('#apiUrl').val() + '/api/employee/' + $('#employeeId').val() + '?token=' + $('#token').val();
        $.ajax({
            url: url,
            type: 'DELETE',
            success: function (data) {
                if (data && data.status) {
                    //showAlertMessage('successMessage','Customer deleted successfuly.','success','fa-check fa-lg');
                    window.location = '/employee';
                }
            },
            error: function (data) {
                showAlertMessage('internaleServerError', data, 'danger', 'fa-warning fa-lg');
                return false;
            }
        });
    });
   
});
$('.btn-assign').on('click',function(event){
    var employeeId = $('#employeeId').val();
        data = {
            id: $(this).data('empId'),
            employeeId: employeeId
        };
    $('#mEmpId').val(employeeId);
    populateProducts(buildUrl($('#apiUrl').val(),'products', $('#token').val(), '30'),false, data.productId);
      $("#productId").select2({
          placeholder: "Select an product",
          width: "250%"
      });
    $('.btn-assign').on('show.bs.modal','#assignToModal', function () {
    });
});    

$('#assignInvent').on('click',function(event){
    event.preventDefault();
    var url = $('#apiUrl').val()+ '/api/product/'+ $('#productId').val()+'/inventory?token='+  $('#token').val();
    var data = {
        productId: $('#productId').val(),
        quantity: parseInt($('#mQuantity').val()),
        employeeId: $('#mEmpId').val()
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
            window.location = '/employee';

        },
        error: function(data) {
            showAlertMessage('internaleServerError', data, 'danger', 'fa-warning fa-lg');
            return false;
        }
    });
});