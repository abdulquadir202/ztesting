
$().ready(function() {
    var sData = null;

    var populateReportData = function(){
        // var tdate = moment(salesLedgerReport.tDate.toString()).subtract(1, 'day');
        //$('#displayTDate').html(tdate.format('DD-MM-YYYY'));
       

        $('#orgName').html(sData.portfolio.name);
        $('#portfolioAddress').html(sData.portfolio.address);
        $('#portfolioMobile').html(sData.portfolio.mobile);
        $('#portfolioEmail').html(sData.portfolio.email);
        $('#salesEntryRef').html(sData.refNo);
        $('#salesEntryDate').html(sData.tDate);
        $('#custName').html(sData.customer.name);
        $('#custAddress').html(sData.customer.address);
        $('#paymentMode').html(sData.bankType);
        $('#total').html(sData.total);
        $('#total1').html(sData.total);
        $('#total2').html(sData.inWords);
        $('#serviceTax').html(sData.tax);
        $('#advance').html(sData.amount);

        window.print();
    };  
    
    $.ajax({
        url: $('#url').val(),
        type: 'GET',
        success: function(data) {
            if (data) {
                sData = data;
                console.log(data);
                var taDate= new Date(sData.tDate).toISOString().slice(0, 10);
                sData.tDate = taDate;
                populateReportData();
            }
        },
        error: function(data) {
            showAlertMessage('internaleServerError', data, 'danger', 'fa-warning fa-lg');
        }
    });
   
});