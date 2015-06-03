var todo_array = [];
var user_object = {};

function login() {
    user_object.username = $('#username').val();
    user_object.password = $('#password').val();
    console.log('user_object is ', user_object);
}

function create_list(array) {
    for (var i = 0; i < array.length; i++) {
        var title = $('<ul>').text(array[i].title);
        var details = $('<li>').text(array[i].details);
        var timestamp = $('<li>').text(array[i].timeStamp);
        // var id = array[i].id;
        // var user_id = array[i].user_id;
        title.append(details, timestamp);
        $('.todo').append(title);
    }
}

function server_call() {
    $.ajax({
        dataType: 'json',
        url: 'get_todo_items.json',
        method: 'GET',
        cache: false,
        crossDomain: true,
        success: function(response) {
            for (var i = 0; i < response.length; i++) {
                todo_array.push(response[i]);
            }
            create_list(todo_array);
        }
    });
}

function add_user_input() {
    $('.todo').html('');
    var new_list_item = {};
    new_list_item.title = $('#title_info').val();
    new_list_item.details = $('#details_info').val();
    new_list_item.timeStamp = $('#due_date').val();
    todo_array.push(new_list_item);
}
$(document).ready(function() {
    server_call();

    $('#logout_btn').click(function(){
        logout();
    })

    $('#login_btn').click(function() {
        login();
    });

    $('#add_item_btn').click(function() {
        $('#add_item_modal').modal('show');
    });

    $('#submit_info').click(function() {
        add_user_input();
        create_list(todo_array);
    });
});
