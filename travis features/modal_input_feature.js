function pull_user_todo(){
    $.ajax({
        url: 'http://s-apis.learningfuze.com/todo/get',
        dataType:'JSON',
        cache: false,
        crossDomain: false,
        method:'POST',
        success:function(response){
        	console.log('response is ', response);
        	userId:  
        }
    })
}