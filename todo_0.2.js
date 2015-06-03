var todo_item = [];

function get_todo(){
	console.log('success');
$.ajax({
	dataType: 'json',
	method: 'GET',
	url:'list.json', 
	crossDomain: true,
	cache: false,
	success: function(response){
		console.log('response :', response);
		window.response = response.data;
		todo_item = todo_item.concat(response);
	}
});console.log('it works');
}get_todo();
 //end of function

$(document).ready(function(){
	

$('#todo_item').focus(function() {
  $(this).val('');
})

$('.add').click(function(){
	var input = $('#todo_item').val();
	console.log("input ", input);

	if(input.length > 0){
		$('#list').append('<li class=' + 'remove' + '>' + input + '</li>');
		  } else {
    console.log("append ", append);
  }
	
	$('#todo_item').val(''); //resets to no text in input
});


// var todo_obj = JSON.parse(todo_items);


//remove list
$('#list').on('click', '.remove', function(){
$(this).hide('2000', function(){
	$(this).remove();
});
});

});//don't touch

