$().ready(function() {
    var shoppeAddForm = $('#shoppe_add_form');
    var shoppeAddFormErrors = $('.alert-danger', shoppeAddForm);
    var shoppeAddFormSuccess = $('.alert-success', shoppeAddForm);

    $.ajax({
        url: $('#url').val(),
        type: 'GET',
        success: function(data) {
            // showAlertMessage('successMessage','Event added successfuly. You can view the shoppe details in <a href="/wa/shoppe"><i class="fa fa-cubes"></i> shoppe</a>.','success','fa-check fa-lg');
            // window.location.replace("/wa/shoppe/"+ data.result.id + "/upload-photos");
            if (data) {
                $('#displayProductName').html(data.product.name);
                $('#displaySku').html(data.product.sku);
                $('#displayBrandName').html(data.product.brandName);
                $('#displayCategory').html(data.product.category.name);
                $('#displayColor').html(data.product.color);
                $('#displayPrice').html(data.product.price);
                $('#displaySalesPackage').html(data.product.salesPackage);
                $('#displayDescription').html(data.product.description);
            }
        },
        error: function(data) {
            showAlertMessage('internaleServerError', data, 'danger', 'fa-warning fa-lg');
        }
    });

    
            // var data = {
            //     description: $('#eventDescription').val(),
            //     name: $('#eventName').val(),
            //     address: $('#eventAddress').val(),
            //     eDate: getDate($('#eventDate').val()),
            //     venue: $('#eventVenue').val(),
            //     eventTypeId: $('#eventTypeId').val()
            // };
   
});