var userList;

$( document ).ready(function() {
    $.ajax({
        type: "GET",
        url: "api/get_user",
        async: false,
        success: function(response) {
            userList = JSON.parse(response)
            fillUsers(userList);      
        }
    });
});

$(document).on('click', '.btn-delete', function(){
    $('.delete-confirm').attr('userid', $(this).attr('userid'));
    showModal('deleteModal');
});


$(document).on('click', '.delete-confirm', function(){
    var userId = $(this).attr('userid');
    
    $.ajax({
        type: "POST",
        url: "api/delete_user",
        data: {userid : userId},
        success: function(response) {
            console.log('deleted');
            var index = userList.data.findIndex(function(user, i){
                return user.id == userId;
            });
            if(index > -1) {
                userList.data.splice(index, 1);
                fillUsers(userList);

                hideModal('deleteModal');
                showModal('successDeleteModal');
            }   
        }
    });

});

function fillUsers(userList) {
    var userPage = $(".users");
    var userTemplateRow = $(".user-row-template").clone();
    
    userPage.empty();
    
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

    if(userTemplateRow.find('.user-template').length != 2) {
        userTemplateRow.removeClass("user-row-template invisible");
        userPage.append(userTemplateRow);
    }
    
}

function showModal(modalId) {
    var modal = document.getElementById(modalId);
    var bsModal = new bootstrap.Modal(modal);
    bsModal.show();
};

function hideModal(modalId) {
    var modal = document.getElementById(modalId)
    var bsModal = bootstrap.Modal.getInstance(modal)
    console.log(bsModal);
    bsModal.hide();
};