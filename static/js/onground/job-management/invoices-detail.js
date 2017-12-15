$().ready(function() {
    var invoicesAddForm = $('#invoice_add_form');
    var invoicesAddFormErrors = $('.alert-danger', invoicesAddForm);
    var invoicesAddFormSuccess = $('.alert-success', invoicesAddForm);

    var dUrl = $('#url').val();
    $.ajax({
        url: dUrl,
        type: 'GET',
        success: function(data) {
            if (data){
                //$("#logo1").attr("src",$('#logo').attr('src'));
                $('#from1').val(data.invoice.from);
                $('#to1').val(data.invoice.to);
                $('#qoteno1').html(data.invoice.invoiceNo);
                $('#pan1').html(data.invoice.panNo);
                $('#gst1').html(data.invoice.gstNo);
                $('#date1').html(data.invoice.date != undefined ? moment(data.invoice.date).format("DD-MM-YYYY"):'');
                $('#tax1').html(data.invoice.tax);
                $('#dis1').html(data.invoice.discount);
                $('#notes1').val(data.invoice.notes);
                $('#terms1').val(data.invoice.terms);
                $('#st1').html(data.invoice.subTotal);
                $('#total1').html(data.invoice.total);
                $('#lid').html(data.invoice.leadId);
                $(".pdf").attr("href", data.invoice.pdf);
                
                if(data.invoice.services && data.invoice.services.length >0){
                    for (i = 0; i < data.invoice.services.length; i++) {
                        var row = data.invoice.services[i];
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
            //showAlertMessage('successMessage','New Quotation added successfuly. You can view the Quotation details in <a href="/invoices"><i class="fa fa-file-text-o"></i> Quotations</a>.','success','fa-check fa-lg');
            //window.location.replace("/sales-ledger");
        },
        error: function(data) {
            showAlertMessage('internaleServerError', data, 'danger', 'fa-warning fa-lg');
        }
    });
})
