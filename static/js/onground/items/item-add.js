$().ready(function() {
    $('#save').on('click',function(event){
        var tab = $(this).attr("data-id");
        var tab1 = $(this).attr("data-prev");
        var li = $(this).attr("tab-id");
        var li1 = $(this).attr("tab-prev");
        var data = new FormData();
        jQuery.each(jQuery('#fileToUpload')[0].files, function(i, file) {
            data.append('fileToUpload', file);
        });
        var video={
            credit:$('#vCredit').val(),
            title:$('#vTitle').val(),
            youtubeId: $('#vId').val(),
            youtubeThumbnailUrl: $('#vthumb').val() ,
            youtubeUrl:$('#vurl').val()
        }
        if($('#mpServiceId').val() || $('#mpServiceId').val() !=null){
            data.append('mpServiceId',$('#mpServiceId').val());
            data.append('mpId','0e0234a9-ade2-4b07-95be-464371450bd4');
        }
        data.append('name',$('#name').val());
        data.append('categoryId',$('#itemCategoryId').val());
        data.append('price',$('#price').val());
        data.append('lprice',parseInt($('#lprice').val()));
        data.append('type',$('#itemType').val());
        data.append('description',$('#description').val());
        data.append('shortDescription',$('#sdescription').val());
        data.append('video',JSON.stringify(video));
        var url = $('#apiUrl').val()+ '/api/item?token='+$('#token').val();
        $.ajax({
            url: url,
            type: 'POST',
            data: data,
            enctype: 'multipart/form-data',
            processData: false,  // tell jQuery not to process the data
            contentType: false,   // tell jQuery not to set contentType
            success: function(data) {
                $('#itemId').val(data.result.id);
                $('#'+tab1).removeClass('active');
                $('#'+tab).addClass('active');
                $('#'+li1).removeClass('active');
                $('#'+li1).addClass('disabled');
                $('#'+li).addClass('active');
                
            },
            error: function(data) {
                showAlertMessage('internaleServerError', data, 'danger', 'fa-warning fa-lg');
            }
        });
    });


    $('#addCheck').on('click',function(event){
        var tab = $(this).attr("data-id");
        var tab1 = $(this).attr("data-prev");
        var li = $(this).attr("tab-id");
        var li1 = $(this).attr("tab-prev");
        var checklist = []
        jQuery('.checklist').each(function(e){
            var obj = {
                seq:$(this).find('input[name*="cseq"]').val(),
                title:$(this).find('input[name*="ctitle"]').val(),
                description:$(this).find('input[name*="cdesc"]').val(),
                stepsVideoUrl:$(this).find('input[name*="cvurl"]').val()
            }
            checklist.push(obj);
        });
        var data = {
            checklist: checklist
        }
        var url = $('#apiUrl').val()+ '/api/item/'+$('#itemId').val()+'?token='+$('#token').val();
        $.ajax({
            url: url,
            type: 'PUT',
            dataType: "json",
            data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
            success: function(data) {
                $('#'+tab1).removeClass('active');
                $('#'+tab).addClass('active');
                $('#'+li1).removeClass('active');
                $('#'+li).addClass('active');
                
            },
            error: function(data) {
                showAlertMessage('internaleServerError', data, 'danger', 'fa-warning fa-lg');
            }
        });
    });

    /*$('#process').on('click',function(event){
        var tab = $(this).attr("data-id");
        var tab1 = $(this).attr("data-prev");
        var li = $(this).attr("tab-id");
        var li1 = $(this).attr("tab-prev");
        
        var checklist = [];
        jQuery('.process').each(function(e){
            var data = new FormData();
            alert($(this).find('input[name*="pcimage"]')[0].files[0]);
            data.append('image', $(this).find('input[name*="pcimage"]')[0].files[0]); 
            alert(data);
            alert(JSON.stringify(data));
            var video ={
                title:$(this).find('input[name*="pvtitle"]').val(),
                credit:$(this).find('input[name*="pvcredit"]').val(),
                youtubeUrl:$(this).find('input[name*="pvurl"]').val(),
                youtubeId:$(this).find('input[name*="pvid"]').val(),
                youtubeThumbnailUrl:$(this).find('input[name*="pvthumb"]').val()
            }
            data.append('seq',$(this).find('input[name*="pseq"]').val());
            data.append('title',$(this).find('input[name*="ptitle"]').val());
            data.append('description',$(this).find('input[name*="pdesc"]').val());

            data.append('video',JSON.stringify(video));
            checklist.push(data);
        });
        var data1 = {
            process: checklist
        }
        alert(JSON.stringify(data1));
        var url = $('#apiUrl').val()+ '/api/item/'+$('#itemId').val()+'?token='+$('#token').val();
        $.ajax({
            url: url,
            type: 'PUT',
            data: data1,
            enctype: 'multipart/form-data',
            processData: false,  // tell jQuery not to process the data
            contentType: false,   // tell jQuery not to set contentType
            success: function(data) {
                $('#'+tab1).removeClass('active');
                $('#'+tab).addClass('active');
                $('#'+li1).removeClass('active');
                $('#'+li1).addClass('disabled');
                $('#'+li).addClass('active');
            },
            error: function(data) {
                showAlertMessage('internaleServerError', data, 'danger', 'fa-warning fa-lg');
            }
        });
    });*/

    $('#seo').on('click',function(event){
        var data = new FormData();
        jQuery.each(jQuery('#oimage')[0].files, function(i, file) {
            data.append('oimage', file);
        });
        var seo={
            ogType:$('#otype').val(),
            ogTitle:$('#otitle').val(),
            ogDescription: $('#odesc').val(),
            ogUrl: $('#ourl').val() 
        }
        data.append('seo',JSON.stringify(seo));
        var url = $('#apiUrl').val()+ '/api/item/'+$('#itemId').val()+'?token='+$('#token').val();
        $.ajax({
            url: url,
            type: 'PUT',
            data: data,
            enctype: 'multipart/form-data',
            processData: false,  // tell jQuery not to process the data
            contentType: false,   // tell jQuery not to set contentType
            success: function(data) {
                window.location.replace("/items");
            },
            error: function(data) {
                showAlertMessage('internaleServerError', data, 'danger', 'fa-warning fa-lg');
            }
        });
    });

    $('.next').on('click',function(event){
        var tab = $(this).attr("data-id");
        var tab1 = $(this).attr("data-prev");
        var li = $(this).attr("tab-id");
        var li1 = $(this).attr("tab-prev");
        $('#'+tab1).removeClass('active');
        $('#'+tab).addClass('active');
        $('#'+li1).removeClass('active');
        $('#'+li1).addClass('disabled');
        $('#'+li).addClass('active');
    });

    populateItemCategory(buildUrl(getAPIUrl(),'categories', getToken(), 3000));
    addItemCategory(buildUrl(getAPIUrl(),'category', getToken(), null),buildUrl(getAPIUrl(),'categories', getToken(), 3000));

    $('#addToTruneto').change(function() {
        if($("#addToTruneto").is(':checked')){
            $('#tser').removeClass('hidden');
            populateTrunetoItem(buildUrl(getAPIUrl(),'items-truneto', getToken(), 3000));
        }else{
            $('#tser').addClass('hidden');
        }       
    });
});