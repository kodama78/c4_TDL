$(document).ready(function() { 
    //remove btn 
$('#list').on('click','.remove', function(){
    $(this).hide('2000', function(){
        $(this).remove();
    }
}

    //changes input box color
$(':text').focus(function() {
    $(this).css({
        backgroundColor: '#B5D0BB',
        opacity: '0.7',
        color: 'white',
        transition: '1s',
    });
});

$(':text').blur(function() {
    $(this).css({
        backgroundColor: '#333333',
        opacity: '0.7',
        color: '#C77D71',
    });
});


});