function add_user_input() {
    $('.todo').html('');
    var new_list_item = {};
    new_list_item.title = $('#title_info').val();
    new_list_item.details = $('#details_info').val();
    new_list_item.timeStamp = $('#due_date').val();
    new_list_item.id = user_object.id;
    $.ajax({
    	url:'http://s-apis.learningfuze.com/todo/create',
    	method: 'POST',
    	dataType: 'json',
    	data: {
    		title: new_list_item.title,
    		dueDate: new_list_item.timeStamp,
    		details: new_list_item.details,
    		userId: new_list_item.id,
    	},
    	success:function(response){
    		console.log('response is', response);
    	}
    });
}

//function to create date
function date_maker() {
    var year_label = $('<label>').attr('for', 'year').text('Year');
    var year = $('<select>').attr('id', 'year');
    for (var i = 2015; i < 2025; i++) {
        var option = $('<option>').val(i).html(i);
        year.append(option);
    }
    var month_label = $('<label>').attr('for', 'month').text('Month');
    var month = $('<select>').attr('id', 'month');
    for (var i = 1; i < 13; i++) {
        var option = $('<option>').val(i).html(i);
        month.append(option);
    }
    var day_label = $('<label>').attr('for', 'day').text('Day');
    var day = $('<select>').attr('id', 'day');
    for (var i = 1; i < 32; i++) {
        var option = $('<option>').val(i).html(i);
        day.append(option);
    }
    var hour_label = $('<label>').attr('for', 'hour').text('Hour');
    var hour = $('<select>').attr('id', 'hour');
    for (var i = 1; i < 13; i++) {
        var option = $('<option>').val(i).html(i);
        hour.append(option);
    }
    var minute_label = $('<label>').attr('for', 'minute').text('Minute');
    var minute = $('<select>').attr('id', 'minute');
    for (var i = 1; i < 60; i++) {
        var option = $('<option>').val(i).html(i);
        minute.append(option);
    }
    var daylight = $('<select>').attr('id', 'daylight');
    var am = $('<option>').val('AM').html('AM');
    var pm = $('<option>').val('PM').html('PM');
    daylight.append(am, pm)
    $('.modal-body').append(month_label, month, year_label, year, day_label, day, hour_label, hour_label, hour, minute_label, minute, daylight);
}

//converts date_maker info to input

