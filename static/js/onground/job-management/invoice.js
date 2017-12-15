$('.pointer').on('click',function(event){
	var clickedID = this.id;
	if(clickedID === 'tper'){
		$('#tper').addClass("greenDiv");
		$('#trs').removeClass("greenDiv");

        $('#tper').removeClass("greyDiv");
        $('#trs').addClass("greyDiv");

		var tamount = parseInt($('#stt').val()) * (parseInt(($('#tax').val() || 0))/100);
		$('#taxamount').val(tamount);
		if($('#discount').val() ==0){
            var subtotal = (parseInt($('#discount').val())+tamount)+ parseInt($('#stt').val());
        }else{
            var subtotal = (tamount-parseInt($('#discount').val()))+ parseInt($('#stt').val());
        }
         $('#total').html('₹'+subtotal);
         $('#totalval').val(subtotal);
	}else if(clickedID === 'trs'){
		$('#tper').removeClass("greenDiv");
		$('#trs').addClass("greenDiv");

        $('#tper').addClass("greyDiv");
        $('#trs').removeClass("greyDiv");

		var tamount = parseInt($('#tax').val() || 0);
		$('#taxamount').val(tamount);
		if($('#discount').val() ==0){
            var subtotal = (parseInt($('#discount').val())+tamount)+ parseInt($('#stt').val());
        }else{
            var subtotal = (tamount-parseInt($('#discount').val()))+ parseInt($('#stt').val());
        }
        $('#total').html('₹'+subtotal);
        $('#totalval').val(subtotal);

	}else if(clickedID === 'dper'){
		$('#drs').removeClass("greenDiv");
		$('#dper').addClass("greenDiv");

        $('#drs').addClass("greyDiv");
        $('#dper').removeClass("greyDiv");

        var damount = parseInt($('#stt').val()) * ((parseInt($('#dis').val() || 0))/100);

        $('#discount').val(damount);

        var subtotal =  (parseInt($('#taxamount').val())-damount) + parseInt($('#stt').val());
        $('#total').html('₹'+subtotal);
        $('#totalval').val(subtotal);
	}else{
		$('#drs').addClass("greenDiv");
		$('#dper').removeClass("greenDiv");

        $('#drs').removeClass("greyDiv");
        $('#dper').addClass("greyDiv");

		var damount =parseInt($('#dis').val() || 0);

        $('#discount').val(damount);
        
        var subtotal =  (parseInt($('#taxamount').val())-damount) + parseInt($('#stt').val());
        $('#total').html('₹'+subtotal);
        $('#totalval').val(subtotal);
	}
})

$('#addInvoice').on('click',function(event){
	var data= {
		from:$('#from').val(),
		to:$('#to').val(),
		invoiceNo: $('#qno').val(),
		panNo: $('#pan').val(),
		gstNo: $('#gst').val(),
		date: $('#qdate').val(),
		notes:$('#notes').val(),
		terms:$('#terms').val(),
		total:$('#total').text(),
		subTotal:$('#st').text(),
		leadId: $('#leadId').val()
	};

	var idArray = [];
    $('.greenDiv').each(function () {
        idArray.push(this.id);

    });
     if(idArray.indexOf('dper')> -1){
        data.discount = ( $('#dis').val() || 0)+'%';
     }else{
        data.discount = '₹'+($('#dis').val() || 0);
     }

     if(idArray.indexOf('tper')> -1){
        data.tax = ($('#tax').val() || 0)+'%';
     }else{
        data.tax = '₹'+($('#tax').val() || 0);
     }

	var checklist = []
    jQuery('.service').each(function(e){
        var obj = {
            item:$(this).find('input[name*="item1"]').val(),
            price:$(this).find('input[name*="rate"]').val(),
            quantity:$(this).find('input[name*="qty"]').val(),
            amount:$(this).find('input[name*="amount"]').val()
        }
        checklist.push(obj);
    });
    data.services = checklist;
	 var url = getAPIUrl()+ '/api/invoice?token='+getToken();
	$.ajax({
        url: url,
        type: 'POST',
        dataType: "json",
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        success: function(data) {
        	window.open(data.result);
          //window.open(data.result,'_blank');
        },
        error: function(data) {
            showAlertMessage('internaleServerError', data, 'danger', 'fa-warning fa-lg');
            return false;
        }
    });
})

$('#sendEmail').on('click',function(event){
	var data= {
		from:$('#from').val(),
		to:$('#to').val(),
		invoiceNo: $('#qno').val(),
		panNo: $('#pan').val(),
		gstNo: $('#gst').val(),
		date: $('#qdate').val(),
		notes:$('#notes').val(),
		terms:$('#terms').val(),
		total:$('#total').text(),
		subTotal:$('#st').text(),
		leadId: $('#leadId').val()
	};

	var idArray = [];
    $('.greenDiv').each(function () {
        idArray.push(this.id);

    });
     if(idArray.indexOf('dper')> -1){
        data.discount = ( $('#dis').val() || 0)+'%';
     }else{
        data.discount = '₹'+($('#dis').val() || 0);
     }

     if(idArray.indexOf('tper')> -1){
        data.tax = ($('#tax').val() || 0)+'%';
     }else{
        data.tax = '₹'+($('#tax').val() || 0);
     }

	var checklist = []
    jQuery('.service').each(function(e){
        var obj = {
            item:$(this).find('input[name*="item1"]').val(),
            price:$(this).find('input[name*="rate"]').val(),
            quantity:$(this).find('input[name*="qty"]').val(),
            amount:$(this).find('input[name*="amount"]').val()
        }
        checklist.push(obj);
    });
    data.services = checklist;
	 var url = getAPIUrl()+ '/api/invoice/sendemail?token='+getToken();
	$.ajax({
        url: url,
        type: 'POST',
        dataType: "json",
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        success: function(data) {
        	//window.open(data.result);
          //window.open(data.result,'_blank');
          toastr.options.closeButton = true;
           toastr.success("Your email send successfully.");
           window.location = '/leads';
        },
        error: function(data) {
            showAlertMessage('internaleServerError', data, 'danger', 'fa-warning fa-lg');
            return false;
        }
    });
})

$().ready(function() {
	$(document).on('show.bs.modal','#invoice-preview', function () {
		$("#logo1").attr("src",$('#logo').attr('src'));

		$('#from1').html($('#from').val());
		$('#to1').html($('#to').val());
		$('#qoteno1').html($('#qno').val());
		$('#pan1').html($('#pan').val());
		$('#gst1').html($('#gst').val());
		$('#date1').html($('#qdate').val());
		$('#notes1').html($('#notes').val());
		$('#terms1').html($('#terms').val());
		$('#st1').html($("#st").text());
		$('#total1').html($('#total').text());

		$("#letter").attr("src",$('#lth').val());
		var idArray = [];
	    $('.greenDiv').each(function () {
	        idArray.push(this.id);

	    });
	     if(idArray.indexOf('dper')> -1){
	        $('#dis1').html(( $('#dis').val() || 0)+'%');
	     }else{
	        $('#dis1').html('₹'+($('#dis').val() || 0));
	     }
	     if(idArray.indexOf('tper')> -1){
	        $('#tax1').html(($('#tax').val() || 0)+'%');
	     }else{
	        $('#tax1').html('₹'+($('#tax').val() || 0));
	     }


		var checklist = []
        jQuery('.service').each(function(e){
            var obj = {
                item:$(this).find('input[name*="item1"]').val(),
                price:$(this).find('input[name*="rate"]').val(),
                quantity:$(this).find('input[name*="qty"]').val(),
                amount:$(this).find('input[name*="amount"]').val()
            }
            checklist.push(obj);
        });
        /*var data = {
            services: checklist
        }*/
        if(checklist.length >0){
        	for (i = 0; i < checklist.length; i++) {
	            var row = checklist[i];
	            $('#tableData').append(
	                //'<tr class="gradeX' + (i % 2 == 0 ? 'even' : 'odd') + ' role="row">' +
	                '<div class="row item">'+
	                  '<div class="col-xs-6 desc">'+(row.item != undefined ? row.item: '')+'</div>'+
	                  '<div class="col-xs-2 qty">'+(row.price != undefined ? row.price: 0)+'</div>'+
	                  '<div class="col-xs-2 qty">'+(row.quantity != undefined ? row.quantity: 0)+'</div>'+
	                  '<div class="col-xs-2 amount text-right">'+(row.amount != undefined ? row.amount: 0)+'</div>'+
	                '</div>'
	                /*'<tr>'+
	                    '<td> ' + (row.item != undefined ? row.item: '') + ' </td>' +
	                    '<td> ' + (row.price != undefined ? row.price: '') + ' </td>' +
	                    '<td> ' + (row.quantity != undefined ? row.quantity: '') + ' </td>' +
	                    '<td> ' + (row.amount != undefined ? row.amount: '') + ' </td>' +
	                    // '<td> ' + (row.description != undefined ? row.description: '') + ' </td>' +
	                '</tr>'*/
	            );
	        }
        }

	});
	$('#total').html('₹'+0);
	$('#totalval').val(0);
	$('#discount').val(0);
	$('#taxamount').val(0);
	$('#stt').val(0);
	$('#st').html('₹'+0);
})
