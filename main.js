var todo_array = [];
var user_object = {};
var user_account = {};
// TU - I want to create a logged in default condition//
var logged_in = false;
// user account creation functionality //
function account_object_create() {
        user_account.username = $('#username').val();
        user_account.password = $('#password').val();
        user_account.password_confirmation = $('#password_confirmation').val();
        user_account.firstname = $('#account_firstname').val();
        user_account.lastname = $('#account_lastname').val();
        user_account.email = $('#account_email').val();
        //----------------------*NOTE* ---------------------//
        //we need more conditionals but we are just getting this up and running for now.// 
        //we still need conditionals for the username use, first & last name minimum charachters//
        //email validation//
        //password must be valid//
        //password confirmation conditional//
        if (user_account.password_confirmation === user_account.password) {
            console.log('passwords match!');
        } else if (user_account.password_confirmation != user_account.password) {
            console.log('the passwords do not match!');
            user_account = {};
            $('#password').val('');
            $('#password_confirmation').val('');
            $('#password_confirmation_modal').modal('show');
        }
        $.ajax({
            url: 'http://s-apis.learningfuze.com/todo/newAccount',
            dataType: 'JSON',
            cache: false,
            crossDomain: true,
            method: 'POST',
            data: {
                username: user_account.username,
                password: user_account.password,
                password2: user_account.password_confirmation,
                email: user_account.email,
                firstName: user_account.firstname,
                lastName: user_account.lastname
            },
            success: function(response) {
                console.log('response is ', response);
                console.log('user_account is ', user_account);
            }
        })
    }
    //creates the user object to log in to the server
function user_object_create() { //
    user_object.username = $('#username').val();
    user_object.password = $('#password').val();
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
            if (response.success == false) {
                console.log('login check returned', response);
                load_page();
                alert('wrong username or password... Please try again');
            }
            console.log('response is', response);
            logged_in = true;
            user_object.firstName = response.firstName;
            user_object.lastName = response.lastName;
            user_object.id = response.id;
            user_object.sid = response.session_id;
            server_call();
        }
    });
}

//function that loads the page after login to the todo
//TU - we should probably rename this function to a more specific page name//
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
                        success: function(response) {
                            console.log('response is', response)
                            $('.main_body').html('');
                            $('.main_body').append(response);
                        }
                    });
                });
                $('#account_create_initiator').click(function() {
                    console.log('create account clicked');
                    load_account_create_page();
                });
            }
        });
    }
    //loads the account creation page on click of account_create_initiator button and appends pages/account_creation.html //
    //to '.main_body'
function load_account_create_page() {
        $.ajax({
            url: 'pages/account_creation.html',
            dataType: 'html',
            method: 'GET',
            cache: false,
            success: function(response) {
                $('.main_body').html('');
                $('.main_body').append(response);
                //account creation click function//
                $('#submit_account_btn').click(function() {
                    account_object_create();
                    $('.main_body').html('');
                    console.log('user_account is ', user_account);
                });
            }
        });
    }
    //function to log out user
function logout() {
    console.log('in the logout function');
    console.log(user_object);
    $.ajax({
        url: 'http://s-apis.learningfuze.com/todo/logout',
        dataType: 'json',
        cache: false,
        crossDomain: true,
        method: 'POST',
        data: {
            username: user_object.username,
            sid: user_object.sid,
        },
        success: function(response) {
                console.log('logout response is ', response);
                $.ajax({
                    url: 'pages/login.html',
                    dataType: 'html',
                    method: 'GET',
                    crossDomain: true,
                    cache: false
                });

                user_object = {};
                $('.main_body').html('');
                $('.main_body').append(response);
                load_page();

            }
            // error: function(response) {

        // }
    });
}

//creates list from todo_array
function create_list(array) {
    for (var i = 0; i < array.length; i++) {
        var title = $('<ul>').addClass('titled').text(array[i].title);
        var details = $('<li>').addClass('details').text(array[i].details);
        var timestamp = $('<li>').addClass('timestamp').text(array[i].timeStamp);
        // var user_id = array[i].user_id;
        var deleteBtn = $('<button>', {
            id: array[i].id,
            class: 'btn btn-danger col-md-2 list',
            type: 'button',
            text: 'x',
        });
        deleteBtn.on('click', function(e) {
            deleteButton(this);
        });
        //this space reserved to add the modal

        //this space reserved for the checkbox
        title.append(timestamp, details, deleteBtn);
        $('.list_items').append(title);
    }
}

//function that queries the server for the todo list info
function server_call() {
    $.ajax({
        url: 'http://s-apis.learningfuze.com/todo/get',
        dataType: 'JSON',
        data: {
            userId: user_object.id
        },
        cache: false,
        crossDomain: true,
        method: 'POST',
        success: function(response) {
            console.log('server_call response is', response);
            if (response.success) {
                todo_list = response.data;
                for (var i = 0; i < todo_list.length; i++) {
                    todo_array.push(todo_list[i]);
                }
                create_list(todo_array);
            }
        }
    });
}

//creates new todo item and sends it to the server
function add_user_input() {
    date = $('#year').val() + '/' + $('#month').val() + '/' + $('#day').val() + ' ' +
        $('#hour').val() + ':' + $('#minute').val() + $('#daylight').val();
    $('.list_items').html('');
    console.log('date is', date);
    var new_list_item = {};
    new_list_item.title = $('#title_info').val();
    new_list_item.details = $('#details_info').val();
    new_list_item.timeStamp = date;
    new_list_item.id = user_object.id;
    $.ajax({
        url: 'http://s-apis.learningfuze.com/todo/create',
        method: 'POST',
        dataType: 'json',
        data: {
            title: new_list_item.title,
            dueDate: new_list_item.timeStamp,
            details: new_list_item.details,
            userId: new_list_item.id,
        },

        success: function(response) {
                console.log('success in add_user_input function is', response);
                todo_array = [];
                server_call();
            }
            // error: function(response) {
            //     console.log('error in add_user_input function', response);
            // }
    });
}

//adds delete functionality to delete button
function deleteButton(ele) {
        $.ajax({
            url: 'http://s-apis.learningfuze.com/todo/delete',
            dataType: 'json',
            method: 'POST',
            data: {
                postId: $(ele).attr('id'),
            },
            success: function(response) {
                $('.list_items').html('');
                todo_array = [];
                server_call();
            },
            // error: function(response){
            //     console.log("response is", response);
            //     console.log("error");
            // }
        });
    }
    //creates date and time for modal
function date_maker() {
    var year_label = $('<label>').attr('for', 'year').text('Year');
    var year = $('<select>').addClass("form-control").attr('id', 'year');
    for (var i = 2015; i < 2025; i++) {
        var option = $('<option>').val(i).html(i);
        year.append(option);
    }
    var month_label = $('<label>').attr('for', 'month').text('Month');
    var month = $('<select>').addClass("form-control").attr('id', 'month');
    for (var i = 1; i < 13; i++) {
        if (i < 10) {
            var option = $('<option>').val('0' + i).html('0' + i);
            month.append(option);
        } else {
            var option = $('<option>').val(i).html(i);
            month.append(option);
        }
    }
    var day_label = $('<label>').attr('for', 'day').text('Day');
    var day = $('<select>').addClass("form-control").attr('id', 'day');
    for (var i = 1; i < 32; i++) {
        if (i < 10) {
            var option = $('<option>').val('0' + i).html('0' + i);
            day.append(option);
        } else {
            var option = $('<option>').val(i).html(i);
            day.append(option);
        }
    }
    var hour_label = $('<label>').attr('for', 'hour').text('Hour');
    var hour = $('<select>').addClass("form-control").attr('id', 'hour');
    for (var i = 1; i < 13; i++) {
        if (i < 10) {
            var option = $('<option>').val('0' + i).html('0' + i);
            hour.append(option);
        } else {
            var option = $('<option>').val(i).html(i);
            hour.append(option);
        }
    }
    var minute_label = $('<label>').attr('for', 'minute').text('Minute');
    var minute = $('<select>').addClass("form-control").attr('id', 'minute');
    for (var i = 1; i < 60; i++) {
        if (i < 10) {
            var option = $('<option>').val('0' + i).html('0' + i);
            minute.append(option);
        } else {
            var option = $('<option>').val(i).html(i);
            minute.append(option);
        }
    }
    var daylight = $('<select>').addClass("form-control").attr('id', 'daylight');
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
        console.log('logout clicked');
        logout();
    });

    $('#add_item_btn').click(function() {
        $('#add_item_modal').modal('show');
    });

    $('#submit_info').click(function() {
        add_user_input();
    });
});
