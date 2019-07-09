$(function(){
    
    // On Window.Load
    var url = "http://localhost:8080/users-crud/api/users";
    $.ajax({
       dataType: 'json',
       url: url,
       success: success
    });
    
    function success(e){
        var result = "";
        var row = 0;
        $.each(e,function(index,value){
            //console.log("I: " + index + ", V: " + value.name);
            if(row % 2 === 0)
                result += "<div class=\"row\">";
            
            result += "<div class=\"col-6\">";
            result += "    <div class=\"user-info mt-4\">";
            result += "        <img src=\"images/" + value.image + "\">";

            result += "        <h2 class=\"user-name\">" + value.name + "</h2>";
            result += "        <input type=\"text\" name=\"txt_name\" value=\"" + value.name + "\" class=\"form-control txt-edit txt-name\">";
            result += "        <h4 class=\"user-date\">" + value.date + "</h4>";
            result += "        <input type=\"text\" name=\"txt_date\" value=\"" + value.date + "\" class=\"form-control txt-edit txt-date\">";                   
         
            result += "        <a href=\"#\" class=\"btn btn-outline-secondary action edit\"><i class=\"fa fa-pencil-alt\"></i></a>";  
            result += "        <a href=\"#\" class=\"btn btn-outline-secondary action delete\"><i class=\"fa fa-trash-alt\"></i></a>";                    
                    
            result += "        <a href=\"#\" class=\"btn btn-success text-white confirm send\"><i class=\"fa fa-check\"></i></a>";  
            result += "        <a href=\"#\" class=\"btn btn-danger text-white confirm cancel\"><i class=\"fa fa-times\"></i></a>";  
            result += "    </div>";
            result += "</div>";
            
            if((row + 1) % 2 === 0)
                result += "</div>";
            
            row++;
        });
        $("#users").html(result);
    }
    
    function validateFields(userName, userDate, userImage){
        if(userName.length > 0){
            if(userDate.length > 0){
                return true;
            }else alert("user's date is required!!!");
        }else alert("user's name is required!!!");
    }
    
    $('#users').on('click', '.edit', function(e) {
        e.preventDefault();
        $(this).parent().find(".action").hide();
        $(this).parent().find(".confirm").fadeIn(600);        
        $(this).parent().find(".txt-edit").fadeIn(600);        
    });

    $('#users').on('click', '.confirm', function(e) {
        e.preventDefault();
        $(this).parent().find(".confirm").hide();
        $(this).parent().find(".action").fadeIn(600); 
        $(this).parent().find(".txt-edit").hide(); 
    });
    
    function bs_input_file() {
        $(".input-file").before(
            function() {
                if ( ! $(this).prev().hasClass('input-ghost') ) {
                    var element = $("<input type='file' class='input-ghost' style='visibility:hidden; height:0'>");
                    element.attr("name",$(this).attr("name"));
                    element.change(function(){
                        element.next(element).find('input').val((element.val()).split('\\').pop());
                    });
                    $(this).find("button.btn-choose").click(function(){
                        element.click();
                    });
                    $(this).find("button.btn-reset").click(function(){
                        element.val(null);
                        $(this).parents(".input-file").find('input').val('');
                    });
                    $(this).find('input').css("cursor","pointer");
                    $(this).find('input').mousedown(function() {
                        $(this).parents('.input-file').prev().click();
                        return false;
                    });
                    return element;
                }
            }
        );
    }
         
    bs_input_file();

    $("#uploadBtn").on("click", function() {
        var url = "/users-crud/create-user";
        var form = $("#userForm")[0];
        var data = new FormData(form);
        var userName = $("#txt_user_name").val();
        var userDate = $("#txt_user_date").val();
        data.append("username", userName);
        data.append("userdate", userDate);
        if(validateFields(userName, userDate)){
            $.ajax({
                type : "POST",
                encType : "multipart/form-data",
                url : url,
                cache : false,
                processData : false,
                contentType : false,
                data : data,
                success : function(msg) {
                    var response = JSON.parse(msg);
                    console.log(response);
                    window.location.reload();
                },
                error : function() {
                    alert("Error: Please try later...");
                }
            });                
        }
    });
});
