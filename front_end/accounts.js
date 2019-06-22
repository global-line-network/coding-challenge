$(document).ready(function(){

    $.fn.display_users_in_page = function(data) {
    }

    $.fn.show_all_users = function(page_number) {
        $.ajax({
            type:'GET',
            url:'https://reqres.in/api/users',
            data: 'page=' + page_number,
            dataType: 'json',
            success: function(result, stataus, xhr){
                $.fn.display_users_in_page(result['data']);
                var next_page = page_number + 1;
                if ( next_page <= result['total_pages'] ) {
                    $.fn.show_all_users(next_page);
                }
            }
        }).done(function (data) {
        });
    }

    $.fn.show_all_users()

    $.fn.search_user_in_response = function(user_name, response_data) {
        for (var i = 0; i < response_data.length; i++) {
            first = response_data[i]['first_name'].toLowerCase();
            last = response_data[i]['last_name'].toLowerCase();

            if (user_name.toLowerCase() == first) {
                return response_data[i]['id'];
            } else if (user_name.toLowerCase() == last) {
                return response_data[i]['id'];
            } else if (user_name.toLowerCase() == first + ' ' + last) {
                return response_data[i]['id'];
            } else if (user_name.toLowerCase() == last + ' ' + first) {
                return response_data[i]['id'];
            }
        }
        return false;
    }

    $.fn.search_user = function(user_name, page_number) {
        $.ajax({
            type:'GET',
            url:'https://reqres.in/api/users',
            data: 'page=' + page_number,
            dataType: 'json',
            success: function(result, stataus, xhr){
                var user_id = $.fn.search_user_in_response(user_name, result['data'])
                var next_page = page_number + 1
                if (user_id) {
                    alert("User ID: " + user_id);
                }
                if ( next_page <= result['total_pages'] ) {
                    $.fn.search_user(user_name, next_page);
                } else {
                    alert('Search Finished');
                }
            }
        }).done(function (data) {
        });
    }

    $('#search-btn').click(function(){
        var name = $('#user-name-search').val();
        $.fn.search_user(name, 1);
    });
});