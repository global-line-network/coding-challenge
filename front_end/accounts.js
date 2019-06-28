$(document).ready(function(){

    $('#listUsers').click(function(){
        var page = $('#usersPage').val();
        if (!page) {
            page = 1;
        }
        $.ajax({
            type:'GET',
            url:'https://reqres.in/api/users',
            data: 'page=' + page,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            success: function(result, stataus, xhr){
                $('#tempResults').text(JSON.stringify(result));
            }
        }).done(function (data) {
        });
    });

    $('#getUser').click(function(){
        var userId = $('#userId').val();
        if (!userId) {
            userId = 1;
        }
        $.ajax({
            type:'GET',
            url:'https://reqres.in/api/users/' + userId,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            success: function(result, stataus, xhr){
                if (xhr.status == 404) {
                    $('#tempResults').text('{}');
                } else {
                    $('#tempResults').text(JSON.stringify(result));
                }
            }
        }).done(function (data) {
        });
    });

    $('#listResource').click(function(){
        var resourcePage = $('#resourcePage').val();
        if (!resourcePage) {
            resourcePage = 1;
        }
        $.ajax({
            type:'GET',
            url:'https://reqres.in/api/unknown',
            data: 'page=' + resourcePage,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            success: function(result, stataus, xhr){
                $('#tempResults').text(JSON.stringify(result));
            }
        }).done(function (data) {
        });
    });

    $('#getResource').click(function(){
        var resourceId = $('#resourceId').val();
        if (!resourceId) {
            resourceId = 1;
        }
        $.ajax({
            type:'GET',
            url:'https://reqres.in/api/users/' + resourceId,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            success: function(result, stataus, xhr){
                $('#tempResults').text(JSON.stringify(result));
            }
        }).done(function (data) {
        });
    });

    $.fn.get_create_update_payload = function(name, job) {
        var payload = {};
        if (name) {
            $.extend(payload, {"name": name});
        }
        if (job) {
            $.extend(payload, {"job": job});
        }
        return JSON.stringify(payload);
   };

    $('#createUser').click(function(){
        var payload = $.fn.get_create_update_payload($('#createName').val(), $('#createJob').val());
        $.ajax({
            type:'POST',
            url:'https://reqres.in/api/users',
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: payload,
            success: function(result, stataus, xhr){
                $('#tempResults').text(JSON.stringify(result));
            }
        }).done(function (data) {
        });
    });

    $('#updateUser').click(function(){
        var payload = $.fn.get_create_update_payload($('#updateName').val(), $('#updateJob').val());
        var userId = $('#updateUserId').val();
        $.ajax({
            type:'PUT',
            url:'https://reqres.in/api/users/' + userId,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: payload,
            success: function(result, stataus, xhr){
                $('#tempResults').text(JSON.stringify(result));
            }
        }).done(function (data) {
        });
    });

    $('#updatePatchUser').click(function(){
        var payload = $.fn.get_create_update_payload($('#updatePatchName').val(), $('#updatePatchJob').val());
        var userId = $('#updatePatchUserId').val();
        $.ajax({
            type:'PATCH',
            url:'https://reqres.in/api/users/' + userId,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: payload,
            success: function(result, stataus, xhr){
                $('#tempResults').text(JSON.stringify(result));
            }
        }).done(function (data) {
        });
    });

    $('#deleteUser').click(function(){
        var userId = $('#deleteUserId').val();
        $.ajax({
            type:'DELETE',
            url:'https://reqres.in/api/users/' + userId,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            success: function(result, stataus, xhr){
                if (xhr.status == 204) {
                    $('#tempResults').text('{}');
                }
            }
        }).done(function (data) {
        });
    });
});