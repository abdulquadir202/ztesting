var filterWalletsListData = function(url, fromDate, toDate, customerId, type){
    
    //delete the table
    $("#wallets_list").remove();
    $("#wallets_list_wrapper").remove();
    //recreate the table
    $("#tDiv").append(
        '<table class="table table-striped table-bordered table-hover table-checkable order-column" id="wallets_list">'+
            '<thead>'+
                '<tr class="uppercase">'+
                    '<th> Date </th>'+
                    '<th> Deposite </th>'+
                    '<th> Widhrwal </th>'+
                    '<th> Before Balance </th>'+
                    '<th> After Balance </th>'+
                    '<th> Remarks </th>'+
                '</tr>'+
            '</thead>'+
            '<tbody id="tableData"></tbody>'+
        '</table>'
    );

    if(fromDate != null){
        url = url + '&fromDate=' + fromDate;
    }
    if(toDate != null){
        url = url + '&toDate=' + toDate;
    }
    if(customerId != null && customerId != -1){
        url = url + '&customerId=' + customerId;
    }
    
    getWalletsListData(url);
};


var getWalletsListData = function(url){
    App.blockUI({
        target: '#wallets_portlet',
        animate: true
    });
    window.setTimeout(function() {
        App.unblockUI('#wallets_portlet');
    }, 500);
    $.ajax({
        url: url,
        type: 'GET',
        success: function(data) {
            if (data.data) {
                if($('#role').val()>0){
                    $('#wbal').html(data.data[0]? data.data[0].portfolio.trunetoWallet: 0);
                }else{
                    $('#wbal').html(data.data[0]? data.data[0].portfolio.wallet: 0);
                }
                for (i = 0; i < data.data.length; i++) {
                    var row = data.data[i];
                    $('#tableData').append(
                        //'<tr class="gradeX' + (i % 2 == 0 ? 'even' : 'odd') + ' role="row">' +
                        '<tr>'+
                            '<td>' + (row.createdOn != undefined ? moment(new Date(row.createdOn)).format("DD-MMM-YYYY") : '') + ' </td>' +
                            '<td class="text-center">' + (row.deposite != undefined ? row.deposite: 0) + ' </td>' +
                            '<td class="text-center">' + (row.withdrawl != undefined ? row.withdrawl:0) + ' </td>' +
                            '<td class="text-center">' + (row.beforeBal != undefined ? row.beforeBal: 0) + ' </td>' +
                            '<td class="text-center">' + (row.afterBal != undefined ? row.afterBal : 0) + ' </td>' +
                            '<td>' + (row.comments != undefined ? row.comments : '') + ' </td>' +
                        '</tr>'
                    );

                    $("#tableData > tr > td.clickable").hover(function() {
                        $(this).css('cursor','pointer');
                    }, function() {
                        $(this).css('cursor','auto');
                    });
                }
            }
           // initialize the table
           initializeTable();
        },
        error: function(data) {
            showAlertMessage('internaleServerError', data, 'danger', 'fa-warning fa-lg');
        }
    });
};

var initializeTable = function(){
    var table = $('#wallets_list');
    table.dataTable({
        "language": {
            "aria": {
                "sortAscending": ": activate to sort column ascending",
                "sortDescending": ": activate to sort column descending"
            },
            "emptyTable": "No data available in table",
            "info": "Showing _START_ to _END_ of _TOTAL_ records",
            "infoEmpty": "No records found",
            "infoFiltered": "(filtered1 from _MAX_ total records)",
            "lengthMenu": "Show _MENU_",
            "search": "Search:",
            "zeroRecords": "No matching records found",
            "paginate": {
                "previous":"Prev",
                "next": "Next",
                "last": "Last",
                "first": "First"
            }
        },

        // Uncomment below line("dom" parameter) to fix the dropdown overflow issue in the datatable cells. The default datatable layout
        // setup uses scrollable div(table-scrollable) with overflow:auto to enable vertical scroll(see: assets/global/plugins/datatables/plugins/bootstrap/dataTables.bootstrap.js). 
        // So when dropdowns used the scrollable div should be removed. 
        //"dom": "<'row'<'col-md-6 col-sm-12'l><'col-md-6 col-sm-12'f>r>t<'row'<'col-md-5 col-sm-12'i><'col-md-7 col-sm-12'p>>",

        "bStateSave": false, // save datatable state(pagination, sort, etc) in cookie.
        "pagingType": "bootstrap_extended",
        //"destroy": true,
        "lengthMenu": [
            [5, 10, 15, 20, -1],
            [5, 10, 15, 20, "All"] // change per page values here
        ],
        // set the initial value
        "pageLength": 10,
        "columnDefs": [{  // set default column settings
            'orderable': false,
            'targets': [0]
        }, {
            "searchable": false,
            "targets": [0]
        }],
        "order": [
            //[1, "desc"]
        ] // set first column as a default sort by asc
    });

    var tableWrapper = jQuery('#wallets_list_wrapper');

    table.find('.group-checkable').change(function () {
        var set = jQuery(this).attr("data-set");
        var checked = jQuery(this).is(":checked");
        jQuery(set).each(function () {
            if (checked) {
                $(this).prop("checked", true);
            } else {
                $(this).prop("checked", false);
            }
        });
        jQuery.uniform.update(set);
    });
    App.unblockUI('#wallets_portlet');
};

$().ready(function() {
   
    $('.filter-btn').on('click', function(){
        $('.table-filters').toggleClass("hide");
        $("#customerId").select2({allowClear: false});
    });

    getWalletsListData(buildUrl(getAPIUrl(),'wallets/'+$('#uname').val(), getToken(), 2000));

    $('#filter-submit').on('click', function(event){
        var fromDate = toDate = null;
        event.preventDefault();

        filterWalletsListData(
            buildUrl(getAPIUrl(),'wallets/'+$('#uname').val(), getToken(), 2000), 
            fromDate, toDate, 
            $('#customerId').val()
        );

    });

    initDateRange(buildUrl(getAPIUrl(),'wallets/'+$('#uname').val(), getToken(), 2000));
});

$(document).on('show.bs.modal','#addwalletModal', function () {
  //alert('hi');
  populateEmployee(buildUrl($('#apiUrl').val(),'employees', $('#token').val(), '30'),false);
  $("#employeeId").select2({
      placeholder: "Select an employee",
      width: "100%"
  });

});

$(document).on('show.bs.modal','#refundwalletModal', function () {
  //alert('hi');
  populateEmployee(buildUrl($('#apiUrl').val(),'employees', $('#token').val(), '30'),false);
  $("#employeesId").select2({
      placeholder: "Select an employee",
      width: "100%"
  });

});

$(document).on('show.bs.modal','#deductwalletModal', function () {
  //alert('hi');
  populateEmployee(buildUrl($('#apiUrl').val(),'employees', $('#token').val(), '30'),false);
  $("#employeesId").select2({
      placeholder: "Select an employee",
      width: "100%"
  });

});

$('#addMoney').on('click', function(e){
        e.preventDefault();
        var url = $('#apiUrl').val()+'/api/recharge/'+$('#uname').val()+'?token='+$('#token').val();
        if($('#refNo').val() != null && $('#refNo').val() != ''){
            var sc = ' reference no: '+$('#refNo').val()
        }else{
            var sc='';
        }
        var data = {
            amount: $('#amount').val(),
            comments: 'Collected by '+$('#employeeId option:selected').text()+' via '+ $('#type').val()+sc
        };
        $.ajax({
            url: url,
            type: 'PUT',
            data: JSON.stringify(data),
            crossDomain: true,
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            success: function(data) {
                toastr.options.closeButton = true;
                window.location.replace('/admin/vendors/'+$('#uname').val()+'/wallet');
            },
            error: function(data) {
                showAlertMessage('internaleServerError', data, 'danger', 'fa-warning fa-lg');
                return false;
            }
        });
});

$('#refundMoney').on('click', function(e){
        e.preventDefault();
        var url = $('#apiUrl').val()+'/api/refund/'+$('#uname').val()+'?token='+$('#token').val();
        if($('#reason').val() != null && $('#reason').val() != ''){
            var sc = ' for : '+$('#reason').val()
        }else{
            var sc='';
        }
        var data = {
            amount: $('#amount1').val(),
            comments: 'Refunded amount'+ $('#amount').val()+' by '+$('#employeeId option:selected').text()+sc
        };
        $.ajax({
            url: url,
            type: 'PUT',
            data: JSON.stringify(data),
            crossDomain: true,
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            success: function(data) {
                toastr.options.closeButton = true;
                window.location.replace('/admin/vendors/'+$('#uname').val()+'/wallet');
            },
            error: function(data) {
                showAlertMessage('internaleServerError', data, 'danger', 'fa-warning fa-lg');
                return false;
            }
        });
});

$('#deductMoney').on('click', function(e){
        e.preventDefault();
        var url = $('#apiUrl').val()+'/api/deduct/'+$('#uname').val()+'?token='+$('#token').val();
        if($('#reason1').val() != null && $('#reason1').val() != ''){
            var sc = ' for : '+$('#reason1').val()
        }else{
            var sc='';
        }
        var data = {
            amount: $('#amount2').val(),
            comments: 'Deducted amount'+ $('#amount').val()+' by '+$('#employeeId option:selected').text()+sc
        };
        $.ajax({
            url: url,
            type: 'PUT',
            data: JSON.stringify(data),
            crossDomain: true,
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            success: function(data) {
                toastr.options.closeButton = true;
                window.location.replace('/admin/vendors/'+$('#uname').val()+'/wallet');
            },
            error: function(data) {
                showAlertMessage('internaleServerError', data, 'danger', 'fa-warning fa-lg');
                return false;
            }
        });
});