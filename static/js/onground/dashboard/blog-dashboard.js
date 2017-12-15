var filterOrderDashboardData = function(url, fromDate, toDate){
    //delete the table
    $("#posts").html('0');

    if(fromDate != null){
        url = url + '&fromDate=' + fromDate;
    }
    if(toDate != null){
        url = url + '&toDate=' + toDate;
    }

    getBlogDashboardData(url);
};

var getBlogDashboardData = function(url){
    App.blockUI({
        target: '#blogs_dashboard_portlet',
        animate: true
    });

    window.setTimeout(function() {
        App.unblockUI('#blogs_dashboard_portlet');
    }, 500);
    $.ajax({
        url: url,
        type: 'GET',
        success: function(data) {
            if (data && data.status == 'ok') {
                $("#posts").html(data.blogs);
                $("#approved").html(data.approved);
                $("#pending").html(data.blogs-data.approved);
            }else{
                alert("error");
                $("#posts").html('0');
            }
           // initialize the table
           App.unblockUI('#blogs_dashboard_portlet');
        },
        error: function(data) {
            showAlertMessage('internaleServerError', data, 'danger', 'fa-warning fa-lg');
        }
    });
};

/*getLeadDashboardData(buildUrl($('#url').val(),'dashboard/leads', $('#token').val(), 200));
initDateRange(buildUrl($('#url').val(),'dashboard/leads', $('#token').val(), 200));*/

getBlogDashboardData(buildUrl($('#url').val(),'dashboard/blogs', $('#token').val(), 200));

initDateRange(buildUrl($('#url').val(),'dashboard/blogs', $('#token').val(), 200));