$().ready(function() {
    var quotationsAddForm = $('#quotation_add_form');
    var quotationsAddFormErrors = $('.alert-danger', quotationsAddForm);
    var quotationsAddFormSuccess = $('.alert-success', quotationsAddForm);

    var dUrl = $('#url').val();
    $.ajax({
        url: dUrl,
        type: 'GET',
        success: function(data) {
            if (data){
                //$("#logo1").attr("src",$('#logo').attr('src'));
                $('#from1').val(data.quotation.from);
                $('#to1').val(data.quotation.to);
                $('#qoteno1').html(data.quotation.quotationNo);
                $('#pan1').html(data.quotation.panNo);
                $('#gst1').html(data.quotation.gstNo);
                $('#date1').html(data.quotation.date != undefined ? moment(data.quotation.date).format("DD-MM-YYYY"):'');
                $('#tax1').html(data.quotation.tax);
                $('#dis1').html(data.quotation.discount);
                $('#notes1').val(data.quotation.notes);
                $('#terms1').val(data.quotation.terms);
                $('#st1').html(data.quotation.subTotal);
                $('#total1').html(data.quotation.total);
                $('#lid').html(data.quotation.leadId);
                $(".pdf").attr("href", data.quotation.pdf);
                
                if(data.quotation.services && data.quotation.services.length >0){
                    for (i = 0; i < data.quotation.services.length; i++) {
                        var row = data.quotation.services[i];
                        $('#tableData').append(
                            //'<tr class="gradeX' + (i % 2 == 0 ? 'even' : 'odd') + ' role="row">' +
                            '<tr>'+
                                '<td> ' + (row.item != undefined ? row.item: '') + ' </td>' +
                                '<td> ' + (row.price != undefined ? row.price: '') + ' </td>' +
                                '<td> ' + (row.quantity != undefined ? row.quantity: '') + ' </td>' +
                                '<td> ' + (row.amount != undefined ? row.amount: '') + ' </td>' +
                                // '<td> ' + (row.description != undefined ? row.description: '') + ' </td>' +
                            '</tr>'
                        );
                    }
                }

            }
            //showAlertMessage('successMessage','New Quotation added successfuly. You can view the Quotation details in <a href="/quotations"><i class="fa fa-file-text-o"></i> Quotations</a>.','success','fa-check fa-lg');
            //window.location.replace("/sales-ledger");
        },
        error: function(data) {
            showAlertMessage('internaleServerError', data, 'danger', 'fa-warning fa-lg');
        }
    });
})
