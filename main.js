var todo_array = [];
var user_object = {};

//creates the user object to log in to the server
function user_object_create() { //
    user_object.username = $('#username').val();
    user_object.password = $('#password').val();
    console.log('user_object is ', user_object);
}

//function to create user object from server reponse
function user_login_server(user_object) {
    $.ajax({
        url: 'http://s-apis.learningfuze.com/todo/login',
        dataType: 'json',
        cache: false,
        method: 'POST',
        crossDomain: true,
        data: {
            username: user_object.username,
            password: user_object.password
        },
        success: function(response) {
            console.log("response is", response);
            user_object.firstName = response.firstName;
            user_object.lastName = response.lastName;
            user_object.id = response.id;
        }
    });
}

//function that loads the page after login to the todo
function load_page() {
    $.ajax({
        url: 'pages/login.html',
        dataType: 'html',
        cache: false,
        success: function(response) {
            $('.main_body').html('');
            $('.main_body').append(response);
            $('#login_btn').click(function() {
                user_object_create();
                user_login_server(user_object);
                $('.main_body').html('');
                $.ajax({
                    url: 'pages/todo.html',
                    dataType: 'html',
                    method: 'GET',
                    cache: false,
                    success: function(response){
                        console.log('response is', response)
                        $('.main_body').html('');
                        $('.main_body').append(response);
                    }
                });
            });
        }
    });
}

//function to log out user
function logout() {

    $.ajax({
        url: 'http://s-apis.learningfuze.com/todo/logout',
        dataType: 'json',
        cache: false,
        crossDomain: true,
        method: 'POST',
        data: {
            username: user_object.username,
        },
        success: function(response) {
            console.log("response ", response);
            user_object = {};
        },
        error: function(response) {
            console.log("response ", response);
        }
    });
}

//creates list from todo_array
function create_list(array) {
    for (var i = 0; i < array.length; i++) {
        var title = $('<ul>').text(array[i].title);
        var details = $('<li>').text(array[i].details);
        var timestamp = $('<li>').text(array[i].timeStamp);
        // var id = array[i].id;
        // var user_id = array[i].user_id;
        title.append(details, timestamp);
        $('.list_items').append(title);
    }
}

//function that queries the server for the todo list info
function server_call() {
    $.ajax({
        url: 'http://s-apis.learningfuze.com/todo/get',
        dataType:'JSON',
        data: {
            userId:user_object.id
        },
        cache: false,
        crossDomain: true,
        method:'POST',
        success:function(response){
            console.log('response is ', response);
            todo_array.push(response.data[0]);
            console.log('todo_array is ', todo_array)
            create_list(todo_array);

        }
    });
}

//creates new todo item and sends it to the server
function add_user_input() {
    date = $('#year').val() + '/' + $('#month').val() + '/' + $('#day').val() + ' ' + $('#hour').val() + ':' + $('#minute').val(); + $('#daylight').val();
    $('.todo').html('');
    var new_list_item = {};
    new_list_item.title = $('#title_info').val();
    new_list_item.details = $('#details_info').val();
    new_list_item.timeStamp = date;
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
//creates date and time for modal
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
    $('.modal-body').append(month_label, month, day_label, day, year_label, year, hour_label, hour, minute_label, minute, daylight);
}
$(document).ready(function() {
    load_page();
    date_maker();
    // server_call();
    $('#logout_btn').click(function() {
        logout();
    });
    $('#add_item_btn').click(function() {
        console.log('plus button clicked');
        $('#add_item_modal').modal('show');
    });

    $('#submit_info').click(function() {
        add_user_input();
        server_call();
    });
});
