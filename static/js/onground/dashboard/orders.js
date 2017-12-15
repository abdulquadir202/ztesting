var filterOrderDashboardData = function(url, fromDate, toDate){
    //delete the table
    $("#sales").html('0');
    $("#orders").html('0');
    $("#average").html('0');

    if(fromDate != null){
        url = url + '&fromDate=' + fromDate;
    }
    if(toDate != null){
        url = url + '&toDate=' + toDate;
    }

    getOrderDashboardData(url);
};

var getOrderDashboardData = function(url){
    App.blockUI({
        target: '#orders_dashboard_portlet',
        animate: true
    });

    window.setTimeout(function() {
        App.unblockUI('#orders_dashboard_portlet');
    }, 500);
    $.ajax({
        url: url,
        type: 'GET',
        success: function(data) {
            if (data && data.status == 'ok') {
                $("#sales").html(data.sales);
                $("#orders").html(data.orders);
                $("#average").html(data.average);
            }else{
                $("#sales").html('0');
                $("#orders").html('0');
                $("#average").html('0');
            }
           // initialize the table
           App.unblockUI('#orders_dashboard_portlet');
        },
        error: function(data) {
            showAlertMessage('internaleServerError', data, 'danger', 'fa-warning fa-lg');
        }
    });
};

getOrderDashboardData(buildUrl(getAPIUrl(),'dashboard/orders', getToken(), 3000));
initDateRange(buildUrl(getAPIUrl(),'dashboard/orders', getToken(), 3000));


var AppCalendar1 = function() {
    var evnt;
    return {
        //main function to initiate the module
        init: function(eData) {
            this.initCalendar1(eData);
        },

        initCalendar1: function(eventsData) {

            this.evnt = eventsData;
            //alert(JSON.stringify(eventsData));

            if (!jQuery().fullCalendar) {
                return;
            }

            var date = new Date();
            var d = date.getDate();
            var m = date.getMonth();
            var y = date.getFullYear();

            var h = {};

            if (App.isRTL()) {
                if ($('#calendar1').parents(".portlet").width() <= 720) {
                    $('#calendar1').addClass("mobile");
                    h = {
                        right: 'title, prev, next',
                        center: '',
                        left: 'agendaDay, agendaWeek, month, today'
                    };
                } else {
                    $('#calendar1').removeClass("mobile");
                    h = {
                        right: 'title',
                        center: '',
                        left: 'agendaDay, agendaWeek, month, today, prev,next'
                    };
                }
            } else {
                if ($('#calendar1').parents(".portlet").width() <= 720) {
                    $('#calendar1').addClass("mobile");
                    h = {
                        left: 'title, prev, next',
                        center: '',
                        right: 'today,month,agendaWeek,agendaDay'
                    };
                } else {
                    $('#calendar1').removeClass("mobile");
                    h = {
                        left: 'title',
                        center: '',
                        right: 'prev,next,today,month,agendaWeek,agendaDay'
                    };
                }
            }

            var initDrag = function(el) {
                // create an Event Object (http://arshaw.com/fullcalendar/docs/event_data/Event_Object/)
                // it doesn't need to have a start or end
                var eventObject = {
                    title: $.trim(el.text()) // use the element's text as the event title
                };
                // store the Event Object in the DOM element so we can get to it later
                el.data('eventObject', eventObject);
                // make the event draggable using jQuery UI
                el.draggable({
                    zIndex: 999,
                    revert: true, // will cause the event to go back to its
                    revertDuration: 0 //  original position after the drag
                });
            };

            var addEvent = function(title) {
                title = title.length === 0 ? "Untitled Event" : title;
                var html = $('<div class="external-event label label-default">' + title + '</div>');
                jQuery('#event_box').append(html);
                initDrag(html);
            };

            $('#external-events div.external-event').each(function() {
                initDrag($(this));
            });

            $('#event_add').unbind('click').click(function() {
                var title = $('#event_title').val();
                addEvent(title);
            });

            //predefined events
            $('#event_box').html("");
            // addEvent("My Event 1");
            // addEvent("My Event 2");
            // addEvent("My Event 3");
            // addEvent("My Event 4");
            // addEvent("My Event 5");
            // addEvent("My Event 6");

            $('#calendar1').fullCalendar('rerenderEvents');

            $('#calendar1').fullCalendar('destroy'); // destroy the calendar
            $('#calendar1').fullCalendar({ //re-initialize the calendar
                header: h,
                defaultView: 'month', // change default view with available options from http://arshaw.com/fullcalendar/docs/views/Available_Views/ 
                slotMinutes: 15,
                editable: false,
                droppable: false, // this allows things to be dropped onto the calendar !!!
                drop: function(date, allDay) { // this function is called when something is dropped

                    // retrieve the dropped element's stored Event Object
                    var originalEventObject = $(this).data('eventObject');
                    // we need to copy it, so that multiple events don't have a reference to the same object
                    var copiedEventObject = $.extend({}, originalEventObject);

                    // assign it the date that was reported
                    copiedEventObject.start = date;
                    copiedEventObject.allDay = allDay;
                    copiedEventObject.className = $(this).attr("data-class");

                    // render the event on the calendar
                    // the last `true` argument determines if the event "sticks" (http://arshaw.com/fullcalendar/docs/event_rendering/renderEvent/)
                    $('#calendar1').fullCalendar('renderEvent', copiedEventObject, true);

                    // is the "remove after drop" checkbox checked?
                    if ($('#drop-remove').is(':checked')) {
                        // if so, remove the element from the "Draggable Events" list
                        $(this).remove();
                    }
                },
                events: this.evnt
            });

        }

    };

}();

jQuery(document).ready(function() {
    var leadsData = [];
    var tstatus =  $('#setStatus').val();
    var url = getAPIUrl()+ '/api/tasks?tStatus='+tstatus+'&token='+ getToken();
    $.ajax({
        url: url,
        type: 'GET',
        success: function(data) {
            if (data.data) {
                for (var i = 0; i < data.data.length; i++) {
                    var lead = data.data[i];

                    var dateObj = new Date(lead.startDate);
                    var month = dateObj.getUTCMonth(); //months from 1-12
                    var day = dateObj.getUTCDate();
                    var year = dateObj.getUTCFullYear();

                    var bgcolor = '';
                    if(lead.tStatus != undefined && lead.tStatus != null){
                        if(lead.tStatus === 'To-do'){
                            bgcolor = 'red';
                        }else if(lead.tStatus === 'Completed'){
                            bgcolor = 'green';
                        }else if(lead.tStatus === 'In-Progress'){
                            bgcolor = 'yellow';
                        }else if(lead.tStatus === 'Cancelled'){
                            bgcolor = 'grey';
                        }
                    }
                    leadsData.push({
                        title: lead.name,
                        start: new Date(lead.startDate),
                        url: lead.url,
                        backgroundColor: App.getBrandColor(bgcolor)
                    })
                }
                AppCalendar1.init(leadsData);
            }
        },
        error: function(data) {
            showAlertMessage('internaleServerError', data, 'danger', 'fa-warning fa-lg');
        }
    });
   AppCalendar1.init(leadsData);
});


jQuery(document).ready(function() {
    var tstatus =  $('#setStatus').val();
    var url = getAPIUrl()+ '/api/tasks/today?tStatus='+tstatus+'&token='+ getToken();
    $.ajax({
        url: url,
        type: 'GET',
        success: function(data) {
            if (data.data) {
                $('#tTotal').html(data.ttotal);
                $('#cTotal').html(data.ctotal);
                $('#total').html(data.total);
                $('#pTotal').html(data.ptotal);
                for (i = 0; i < data.data.length; i++) {
                    var row = data.data[i];
                    $('#taskData').append(
                        '<li>'+
                        '<div class="task-checkbox">'+
                            '<label class="mt-checkbox mt-checkbox-single mt-checkbox-outline">'+
                                '<input type="checkbox" value="1" class="checkboxes" data-id="'+row.id+'">'+
                                '<span></span>'+
                            '</label>'+
                        '</div>'+
                        '<div class="task-title">'+
                            '<a href="/tasks/'+row.id+'"><span class="task-title-sp">'+row.name+'( '+moment(row.startDate).format("LT")+' )' +'</span></a>'+
                            '<span>'+formatTaskStatus(row.tStatus)+'</span>'+
                        '</div>'+
                        '</li>'
                    );
                }
            }
        },
        error: function(data) {
            showAlertMessage('internaleServerError', data, 'danger', 'fa-warning fa-lg');
        }
    });
});

$('.tStatus').on('click',function(event){
    var data = {
        tStatus:$(this).attr('data-id')
    };
    var i=0, count = $('.checkboxes:checked').length;
    $('.checkboxes:checked').each(function(){
        var url = getAPIUrl()+ '/api/task/'+$(this).attr('data-id')+'?token='+ getToken();
        $.ajax({
            url: url,
            type: 'PUT',
            dataType: "json",
            data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
            success: function(data) {
                i++;
                if(i == count){
                    window.location.replace("/dashboard");
                }
            },
            error: function(data) {
                showAlertMessage('internaleServerError', data, 'danger', 'fa-warning fa-lg');
            }
        });
    });    
});

$('.status').on('click',function(event){
    var tStatus=$(this).attr('data-id');
    if(tStatus === 'All'){
        var sts = '';
    }else {
        var sts = tStatus;
    }
    window.location.replace('/dashboard?status='+sts);
});


$('#addTask').on('click',function(event){
    event.preventDefault();
    var url = $('#apiUrl').val()+ '/api/task/'+$('#taskId').val()+'?token='+  $('#token').val();
    var url1 = $('#apiUrl').val()+ '/api/task?token='+  $('#token').val();
    var data = {
        description:$('#description').val(),
        tStatus:'Completed'
    };

    var data1 = {
        startDate: getDatetTime($('#tDate').val()),
        dueDate: getDatetTime($('#tDate').val()),
        description:$('#description').val(),
        tStatus:'To-do'
    };

    $.ajax({
        url: url,
        type: 'PUT',
        data: JSON.stringify(data),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function(data) {
            data1.url = data.result.url;
            data1.name =  data.result.name;
            $.ajax({
                url: url1,
                type: 'POST',
                data: JSON.stringify(data1),
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                success: function(data) {
                    toastr.options.closeButton = true;
                    toastr.success("Task updated successfully.");
                    window.location = '/dashboard';

                },
                error: function(data) {
                    showAlertMessage('internaleServerError', data, 'danger', 'fa-warning fa-lg');
                    return false;
                }
            });

        },
        error: function(data) {
            showAlertMessage('internaleServerError', data, 'danger', 'fa-warning fa-lg');
            return false;
        }
    });
});