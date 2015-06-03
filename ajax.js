function user_login() {
    $.ajax({
        url: 'http://s-apis.learningfuze.com/todo/login',
        dataType: 'json',
        cache: false,
        method: 'POST',
        crossDomain: true,
        data: {
            username: , 
            password: 
        }
        success: function(response) {
            console.log("response ", response);
        }

    });

}

function logout(){

	$.ajax({
		url:'http://s-apis.learningfuze.com/todo/logout',
		dataType: 'json',
		cache: false,
		crossDomain: true,
		success: function(response){
			console.log("response ", response);
			user_object = {};
		}
		error: function(response){
			console.log("response ", response);

		}
	});
}