$().ready(function() {
    var eventsAddForm = $('#events_add_form');
    var eventsAddFormErrors = $('.alert-danger', eventsAddForm);
    var eventsAddFormSuccess = $('.alert-success', eventsAddForm);

    $.ajax({
        url: $('#url').val(),
        type: 'GET',
        success: function(data) {
            // showAlertMessage('successMessage','Event added successfuly. You can view the events details in <a href="/wa/events"><i class="fa fa-cubes"></i> events</a>.','success','fa-check fa-lg');
            // window.location.replace("/wa/events/"+ data.result.id + "/upload-photos");
            if (data) {
                $('#displayName').html(data.name);
                $('#hEventName').html(data.name);
                $('#hEventName1').html(data.name);
                $('#displayDate').html(data.eDate);
                $('#hEventDate').html(data.eDate);
                $('#displayVenue').html(data.venue);
                $('#displayAddress').html(data.address);
                $('#displayDescription').html(data.description);

                if(data.photos){
                    console.log('phtos--> '+ data.photos);
                     for (i = 0; i < data.photos.length; i++) {
                        var row = data.photos[i];
                        $('#images').append(
                            '<div class="col-lg-3 col-md-3 col-sm-6 col-xs-12" style="min-height:200px;">'+
                                
                                    
                                '<div class="mt-element-overlay">'+
                                    '<div class="row">'+
                                        '<div class="col-md-12">'+
                                            '<div class="mt-overlay-6">'+
                                                '<img src="https://s3.ap-south-1.amazonaws.com/dev.onground.in/media/'+ getIdPath(row.id) +'/' +row.name +'" />'+
                                                '<div class="mt-overlay">'+
                                                    '<h2>'+ row.name +'</h2>'+
                                                    '<p>'+
                                                        '<a class="mt-info uppercase btn red default btn-outline" href="#">Delete</a>'+
                                                    '</p>'+
                                                '</div>'+
                                            '</div>'+
                                        '</div>'+
                                    '</div>'+
                                '</div>'+
                            '</div>'


                           
                        );
                    }
                }
            }
        },
        error: function(data) {
            showAlertMessage('internaleServerError', data, 'danger', 'fa-warning fa-lg');
        }
    });
});