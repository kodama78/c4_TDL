function pull_user_todo(){
    $.ajax({
        url: 'http://s-apis.learningfuze.com/todo/get',
        dataType:'JSON',
        data: {
        	id:user_object.id
        },
        cache: false,
        crossDomain: true,
        method:'POST',
        success:function(response){
        	console.log('response is ', response);

        }
    });
}