//Add ability to set individual items to complete or incomplete

function completedItems(){




	$.ajax({
		url: 'http://s-apis.learningfuze.com/todo/updateCompleteStatus', 
		method: 'POST',
		dataType: 'json',
		success: function(response) {
			console.log("response is ", response);


		}
		error: function(response) {
			console.log("response is ", response);
			console.log("error");
		}
	});
}

//creates list from todo_array
function create_list(array) {
    for (var i = 0; i < array.length; i++) {
        var title = $('<ul>').text(array[i].title);
        var details = $('<li>').text(array[i].details);
        var timestamp = $('<li>').text(array[i].timeStamp);
        // var user_id = array[i].user_id;
        var deleteBtn = $('<button>', {
            id: array[i].id,
            class: 'btn btn-danger col-md-2 list',
            type: 'button',
            text: 'Delete',
        });
        deleteBtn.on('click', function(e){
            deleteButton(this);
        });

        var checkbox = $('<input>', {
        	id: 'checkbox'+array[i].id,
        	class: 'checkbox',
        	type: 'checkbox',

        });
        checkbox.on('click', function(e){
        	completedItems(this);
        });

        title.append(details, timestamp, deleteBtn);
        $('.list_items').append(checkbox, title);
    }
}