var user_account = {};
function account_object_create(){	
	user_account.username = $('#username').val();
	user_account.password = $('#password').val();
	user_account.password_confirmation = $('#password_confirmation').val();
	user_account.firstname = $('#account_firstname').val();
	user_account.lastname = $('#account_lastname').val();
	user_account.email = $('#account_email').val();
//username conditional//


//password confirmation conditional//
	if (user_account.password_confirmation === user_account.password){
		console.log('passwords match!');
	} else if (user_account.password_confirmation != user_account.password){
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
		success:function(response){
			console.log('response is ', response);
			console.log('user_account is ', user_account);
		}
	})
}


$(document).ready(function(){
	console.log('document is loaded');
$('#submit_account_btn').click(function(){
	account_object_create();
	console.log('user_account is ', user_account);
	});
});