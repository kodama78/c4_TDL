function create_list(array) {
    for (var i = 0; i < array.length; i++) {
        var title = $('<ul>').text(array[i].title);
        var details = $('<li>').text(array[i].details);
        var timestamp = $('<li>').text(array[i].timeStamp);
        // var id = array[i].id;
        // var user_id = array[i].user_id;
        var deleteBtn = $('<button>', {
        	id: array[i].id,
        	class: 'btn btn-danger col-md-2 list',
        	type: 'button',
        });
        deleteBtn.on('click', function(){
        	deleteButton();
        }

        title.append(deleteBtn);
        title.append(details, timestamp);
        $('.list_items').append(title);
    }
}

function deleteButton(){
	$.ajax({
	url: 'http://s-apis.learningfuze.com/todo/delete',
	dataType: 'json',
	method: 'POST',
	data: {
	postID: $(this).id,
	}	
	success: function(response){
		conosole.log("response is", response);
		console.log("success");
	}
	error: function(response){
		console.log("response is", response);
		console.log("error");
	}
	});
}

// function create_list(array) {
//     for (var i = 0; i < array.length; i++) {
//         var title = $('<ul>').addClass("list").attr('id', 'list').text(array[i].title);//jk
//         var details = $('<li>').addClass("remove list").text(array[i].details);
//         var timestamp = $('<li>').addClass("remove list").text(array[i].timeStamp);
//         // var id = array[i].id;
//         // var user_id = array[i].user_id;
//         $('<button>').addClass('list').attr(array[i].id);
//         title.append('<button>');
//         title.append(details, timestamp);
//         $('.list_items').append(title);
//     }
// }