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