$( document ).ready(function() {
    $.ajax({
        type: "GET",
        url: "get_user",
        success: function(response) {
            var userList = JSON.parse(response)
            fillUsers(userList);
        }
    });
});


function fillUsers(userList) {
    $(".users").empty();

    var userPage = $(".users");
    var userTemplateRow = $(".user-row-template").clone();

    $.each(userList.data, function(k,v) {
        
        var userTemplate = userTemplateRow.find('.user-template').first();
       
        userTemplate.find('.user-image').attr('src', v.avatar);
        userTemplate.find('.user-name').text(v.first_name + " " +v.last_name);
        userTemplate.find('.user-mail').text(v.email);
        userTemplate.find('.btn-edit').attr('userid', v.id);
        userTemplate.find('.btn-delete').attr('userid', v.id);

        userTemplate.removeClass('user-template invisible');

        if(userTemplateRow.find('.user-template').length == 0) {
            userTemplateRow.removeClass("user-row-template invisible");
            userPage.append(userTemplateRow);
            userTemplateRow = $(".user-row-template").clone();
        }
    });
}