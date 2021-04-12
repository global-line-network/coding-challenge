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

$(document).on('click', '.btn-new', function(){
    $('.delete-confirm').attr('userid', $(this).attr('userid'));
    hideAlert('newModalAlert');
    showModal('newModal');
});

$(document).on('click', '.btn-new-save', function(){

    var userFirstName = $("#new-user-name").val().split(' ').slice(0, -1).join(' ');
    var userLastName = $("#new-user-name").val().split(' ').slice(-1).join(' ');
    var userEmail = $("#new-user-email").val();

    if(!(validateEmail(userEmail))) {
        showAlert('newModalAlert', "Sorry, something seems to be wrong with the email!");
        return;
    }

    $.ajax({
        type: "POST",
        url: "api/create_user",
        data: {first_name: userFirstName, last_name: userLastName, email: userEmail},
        success: function(response) {
            responseJson = JSON.parse(response);
            if(responseJson.hasOwnProperty('id')) {
                userList.data.push({id: parseInt(responseJson.id), email: userEmail, first_name: userFirstName, last_name: userLastName, avatar:"https://st.depositphotos.com/1779253/5140/v/950/depositphotos_51405259-stock-illustration-male-avatar-profile-picture-use.jpg"});
                fillUsers(userList);
                hideModal('newModal');
                showModal('successNewModal');
            } else {
                showAlert('newModalAlert', "Sorry something went wrong!");
            }
        }
    });
});

$(document).on('click', '.btn-edit', function(){
    var userId = $(this).attr('userid');
    $('.btn-edit-save').attr('userid', userId);
    var index = getUserIndex(userId);
    var userName = `${userList.data[index].first_name} ${userList.data[index].last_name}`;
    var userEmail = userList.data[index].email

    $('#editModalLabel').text(`Editing ${userName}`);
    $('#user-name').val(userName);
    $('#user-email').val(userEmail);

    showModal('editModal');
});


$(document).on('click', '.delete-confirm', function(){
    var userId = $(this).attr('userid');
    
    $.ajax({
        type: "POST",
        url: "api/delete_user",
        data: {userid : userId},
        success: function(response) {
            console.log('deleted');
            var index = getUserIndex(userId);
            if(index > -1) {
                userList.data.splice(index, 1);
                fillUsers(userList);
                hideModal('deleteModal');
                showModal('successDeleteModal');
            }   
        }
    });

});


$(document).on('click', '.btn-edit-save', function(){
    var userId = $(this).attr('userid');
    var userFirstName = $("#user-name").val().split(' ').slice(0, -1).join(' ');
    var userLastName = $("#user-name").val().split(' ').slice(-1).join(' ');
    var userEmail = $("#user-email").val();

    if(!(validateEmail(userEmail))){
        showAlert('editModalAlert', "Sorry, something seems to be wrong with the email!");
        return;
    }

    $.ajax({
        type: "POST",
        url: "api/update_user",
        data: {user_id : userId, first_name: userFirstName, last_name: userLastName, email: userEmail},
        success: function(response) {
            console.log('Updated');
            var index = getUserIndex(userId);
            if(index > -1) {
                userList.data[index].first_name = userFirstName;
                userList.data[index].last_name = userLastName;
                userList.data[index].email = userEmail;
                fillUsers(userList);
                hideModal('editModal');
                showModal('successEditModal');
            }   
        }
    });
});


function getUserIndex(userId){
    var index = userList.data.findIndex(function(user, i){
        return user.id == userId;
    });

    return index;
}

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

function showAlert(alertId, message) {
    $('#'+alertId).text(message);
    $('#'+alertId).attr('style', '');
};

function hideAlert(alertId) {
    $('#'+alertId).text("");
    $('#'+alertId).attr('style', 'display: none');
};

function validateEmail(email) 
{
 if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
    return true;
  } else {
      return false;
  }
};