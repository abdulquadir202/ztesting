
$().ready(function() {
    var subscriptionData = null;
    var updateDetails = function(){
        var date = moment(new Date(subscriptionData.startDate)).format("DD-MMM-YYYY");
        var edate = subscriptionData.endDate != undefined ?moment(new Date(subscriptionData.endDate)).format("DD-MMM-YYYY") :'';
        var ndate = moment(new Date(subscriptionData.dueDate)).format("DD-MMM-YYYY");
        $('#displayCustomer').html(subscriptionData.customer.name);
        $('#displayService').html(subscriptionData.item.name);
        $('#displayStart').html(date);
        $('#displayEnd').html(edate);
        $('#displayNext').html(ndate);
        $('#displayLocation').html(subscriptionData.location);
        $('#displaynoService').html(subscriptionData.noservice);
        $('#displayTamount').html(subscriptionData.tamount); 
        $('#displaySamount').html(subscriptionData.samount);
        $('#displayTax').html(subscriptionData.tax);
        $('#displayFrequency').html(subscriptionData.frequency);
        $('#displayTclass').html(subscriptionData.taxClass);
        $('#displayPayment').html(subscriptionData.payment);
        $('#displayMode').html(subscriptionData.paymentMode);
        $('#displayPayable').html(subscriptionData.payable);
        for(var i=0; i < subscriptionData.Service.length; i++){
            $('#cData').append(
                '<tr>'+
                    '<td>'+ moment(new Date(subscriptionData.Service[i].startDate)).format("DD-MMM-YYYY")+ '</td>'+
                        
                    '<td>'+ subscriptionData.item.name+ '</td>'+
                    '<td>'+subscriptionData.samount+'</td>'+
                    '<td>'+subscriptionData.Service[i].status+'</td>'+
                    '<td><button class="btn btn-sm btn-default btn-paid" paid-id='+subscriptionData.Service[i].id+'>Paid</button></td>'+
                '</tr>'
            );
        }
    };
    $.ajax({
        url: $('#url').val(),
        type: 'GET',
        success: function(data) {
            if (data) {
                subscriptionData = data;
                updateDetails();
            }
        },
        error: function(data) {
            showAlertMessage('internaleServerError', data, 'danger', 'fa-warning fa-lg');
        }
    });



    $('#cData').on('click', '.btn-paid', function(){
        alert('clicked');
        var id = $('.btn-paid').attr('paid-id');
        var sid = $('#subscribeId').val();
        var data = {
            paidId:id
        };
        alert(JSON.stringify(data));
        var u = 'http://localhost:8088/api/paidsubscription/'+sid+'?token='+$('#token').val();
        alert(u);
        $.ajax({
            url: u,
            type: 'PUT',
            dataType: "json",
            data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
            success: function(data) {
                alert(JSON.stringify(data));
            },
            error: function(data) {
               alert(JSON.stringify(data));
            } 
        });
    });
});



