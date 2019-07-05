$(function(){
    
    $("a.edit").on('click', function() {
        $(this).parent().find(".action").hide();
        $(this).parent().find(".confirm").fadeIn(600);        
        $(this).parent().find(".txt-edit").fadeIn(600);        
    })

    $(".user-info .confirm").on('click', function() {
        $(this).parent().find(".confirm").hide();
        $(this).parent().find(".action").fadeIn(600); 
        $(this).parent().find(".txt-edit").hide(); 
    })

})