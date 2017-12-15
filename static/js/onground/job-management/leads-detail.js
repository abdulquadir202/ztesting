$().ready(function() {
    var leadsAddForm = $('#leads_add_form');
    var leadsAddFormErrors = $('.alert-danger', leadsAddForm);
    var leadsAddFormSuccess = $('.alert-success', leadsAddForm);

    $.ajax({
        url: $('#url').val(),
        type: 'GET',
        success: function(data) {
            //alert(JSON.stringify(data));
            // showAlertMessage('successMessage','Event added successfuly. You can view the leads details in <a href="/wa/leads"><i class="fa fa-cubes"></i> leads</a>.','success','fa-check fa-lg');
            // window.location.replace("/wa/leads/"+ data.result.id + "/upload-photos");
            if (data) {
                $('#dueDate').html(data.dueDate != undefined ? moment(data.dueDate).format("DD MMMM YYYY - HH:mm"):'');
                $('#bookingdate').html(data.dueDate != undefined ? moment(data.dueDate).format("DD MMMM YYYY - HH:mm"):'');
                $('#bill').html(data.leadId);
                if(data.customer){
                    $('#customer').html(data.customer.name);
                    $('#mobile').html(data.customer.mobile);
                    $('#cEmail').html(data.customer.email);
                }
                if(data.item){
                $('#item').html(data.item.name);
                }
                if(data.employee){
                $('#employeeName').html(data.employee.name);
                $('#employeeMob').html(data.employee.mobile);
                $('#employeeEmail').html(data.employee.email || '');
                }
                if(data.proLead && data.proLead.length >0){
                    for(var j=0; j < data.proLead.length; j++){
                        $('#vData').append(
                            '<tr>'+
                                '<td>'+
                                    '<a href="javascript:;">'+ (data.proLead[j].vendorName != undefined ? data.proLead[j].vendorName: '')+'</a>'+
                                '</td>'+
                                '<td>'+ (data.proLead[j].vendorMobile != undefined ? data.proLead[j].vendorMobile: '')+ '</td>'+
                                '<td>'+(data.proLead[j].vendorEmail != undefined ? data.proLead[j].vendorEmail: '')+'</td>'+
                                '<td>'+data.proLead[j].leadStatus+'</td>'+
                            '</tr>'
                        );
                    }
                }
                $('#remarks').html(data.description? data.description: '');
                $('#address').html(data.address);
                $('#price').html(data.price? data.price: 0);
                $('#pGst').html(data.spareGst? data.spareGst: 0);
                $('#sGst').html(data.serviceGst? data.serviceGst: 0);
                $('#sCharge').html(data.serviceCharge? data.serviceCharge: 0);
                $('#paid').html(data.paid? data.paid: (data.price? data.price: 0));
                $('#dueAmount').html(data.dueAmount? data.dueAmount: 0);
                $('#leadStatus').html(data.leadStatus);
                $('.lid').html(data.leadId);
                if(data.leadInventory && data.leadInventory.length >0){
                    for(var i=0; i < data.leadInventory.length; i++){
                        var price = parseFloat(data.leadInventory[i].price || data.leadInventory[i].productObj.price);
                        $('#cData').append(
                            '<tr>'+
                                '<td>'+
                                    '<a href="javascript:;">'+ data.leadInventory[i].productObj.name+'</a>'+
                                '</td>'+
                                '<td>'+ price+ '</td>'+
                                '<td>'+data.leadInventory[i].quantity+'</td>'+
                                '<td>'+price*data.leadInventory[i].quantity+'</td>'+
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
        var url = $('#apiUrl').val() + '/api/lead/' + $('#leadId').val() + '?token=' + $('#token').val();
        $.ajax({
            url: url,
            type: 'DELETE',
            success: function (data) {
                if (data && data.status) {
                    //showAlertMessage('successMessage','Customer deleted successfuly.','success','fa-check fa-lg');
                    window.location = '/leads';
                }
            },
            error: function (data) {
                showAlertMessage('internaleServerError', data, 'danger', 'fa-warning fa-lg');
                return false;
            }
        });
    });
   
});