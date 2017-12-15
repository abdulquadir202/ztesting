var filterWaDashboardData = function(url, fromDate, toDate){
    //delete the table
    $("#center").html('0');
    $("#member").html('0');
    $("#events").html('0');
    $("#product").html('0');
    $("#activity").html('0');
    $("#magazine").html('0');

    if(fromDate != null){
        url = url + '&fromDate=' + fromDate;
    }
    if(toDate != null){
        url = url + '&toDate=' + toDate;
    }

    getWaDashboardData(url);
};

var getWaDashboardData = function(url){
    App.blockUI({
        target: '#wa_dashboard_portlet',
        animate: true
    });

    window.setTimeout(function() {
        App.unblockUI('#wa_dashboard_portlet');
    }, 500);
    $.ajax({
        url: url,
        type: 'GET',
        success: function(data) {
            if (data && data.status == 'ok') {
                $("#center").html(data.center);
                $("#member").html(data.member);
                $("#events").html(data.events);
                $("#product").html(data.product);
                $("#activity").html(data.activity);
                $("#magazine").html(data.magazine);
            }else{
                $("#center").html('0'); 
                $("#member").html('0');
                $("#events").html('0');
                $("#product").html('0');
                $("#activity").html('0');
                $("#magazine").html('0');
            }
           // initialize the table
           App.unblockUI('#wa_dashboard_portlet');
        },
        error: function(data) {
            //showAlertMessage('internaleServerError', data, 'danger', 'fa-warning fa-lg');
        }
    });
};

getWaDashboardData(buildUrl(getAPIUrl(),'dashboard/orders', getToken(), 3000));
initDateRange(buildUrl(getAPIUrl(),'dashboard/orders', getToken(), 3000));