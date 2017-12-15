$().ready(function() {
	$('#updateRole').on('click',function(event) {
		var rol = {
			roles:['admin']
		};
		$('input:checkbox.roles').each(function () {
	       if(this.checked){
	       		rol.roles.push($(this).val());
	       }
	  	});
	  	var url1 = $('#apiUrl').val() + '/api/userProfile/'+$('#pId').val()+'?token=' + $('#token').val();
	  	$.ajax({
            url: url1,
            type: 'PUT',
            dataType: "json",
            data: JSON.stringify(rol),
            contentType: "application/json; charset=utf-8",
            success: function(data) {
                //showAlertMessage('successMessage','leads added successfuly. You can view the leads details in <a href="/leadss"><i class="icon-basket-loaded"></i> leadss</a>.','success','fa-check fa-lg');
                window.location.replace("/admin/vendors/"+$('#uname').val()+"/roles");
            },
            error: function(data) {
                showAlertMessage('internaleServerError', data, 'danger', 'fa-warning fa-lg');
            }
        });
	  	//alert(JSON.stringify(roles));
	});
	var url = $('#apiUrl').val() + '/api/portfolio/roles/'+$('#uname').val()+'?token=' + $('#token').val();

	$.ajax({
        url: url,
        type: 'GET',
        success: function(data) {
            if (data && data.roles) {
              var rol = data.roles;
              $('#pId').val(data.id || '');
              if(rol.indexOf('job-mgmt')>-1){
              	$('#lead').prop('checked', true);
              }
              if(rol.indexOf('order-mgmt')>-1){
              	$('#order').prop('checked', true);
              }
              if(rol.indexOf('product')>-1){
              	$('#product').prop('checked', true);
              }
              if(rol.indexOf('support-tickets')>-1){
              	$('#support').prop('checked', true);
              }
              if(rol.indexOf('blog')>-1){
              	$('#blog').prop('checked', true);
              }
              if(rol.indexOf('inventory')>-1){
              	$('#inventory').prop('checked', true);
              }
              if(rol.indexOf('aggregator')>-1){
              	$('#aggregator').prop('checked', true);
              }
              if(rol.indexOf('marketing.coupon')>-1){
              	$('#coupon').prop('checked', true);
              }
              if(rol.indexOf('testimony')>-1){
              	$('#testimony').prop('checked', true);
              }
              if(rol.indexOf('store-mgmt')>-1){
              	$('#store').prop('checked', true);
              }
              if(rol.indexOf('jobs-openings')>-1){
              	$('#careers').prop('checked', true);
              }
            }
        },
        error: function(data) {
            showAlertMessage('internaleServerError', data, 'danger', 'fa-warning fa-lg');
        }
    });
});