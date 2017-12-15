$().ready(function() {
    var blogPostsData = null;

    $("#updateStatus").click(function() {
        var id = $(this).attr("data-id");
        var v = $(this).attr("value");
        var uNm = $(this).attr("data-uname");
        var data = {};
        if(v === 'Pending'){
            data.approvedStatus ='Approved',
            data.id = id;
        }else if(v === 'Approved'){
            data.approvedStatus ='Pending',
            data.id = id;
        }
        
        var url = getAPIUrl()+'/api/blog/'+id+'?token='+ getToken();
        $.ajax({
            url: url,
            type: 'PUT',
            dataType: "json",
            data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
            success: function(data) {
                window.location.replace("/admin/blog/posts/"+id);
            },
            error: function(data) {
            }
        })
    });
    
    $.ajax({
        url: buildUrl(getAPIUrl(),'blogs',getToken(),10),
        type: 'GET',
        success: function(data) {
            if (data) {
                blogPostsData = data;
                updateBlogList();
            }
        },
        error: function(data) {
            showAlertMessage('internaleServerError', data, 'danger', 'fa-warning fa-lg');
        }
    });
});