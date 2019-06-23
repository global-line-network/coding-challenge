from . import post_responses
from . import delete_responses
from . import get_responses


def users(request):

    if request.method == 'POST':
        return post_responses.process_create(request.POST)

    elif request.method == 'GET':
        return get_responses.process_list_data(request.GET.get('page', 1))


def unknown(request):

    if request.method == 'POST':
        return post_responses.process_create_resource(request.POST)

    elif request.method == 'GET':
        return get_responses.process_resource_list_data(request.GET.get('page', 1))


def get_users(request, user_id):

    if request.method == 'POST':
        return post_responses.process_update(user_id, request.POST)

    elif request.method == 'GET':
        return get_responses.process_single_user_data(user_id)

    elif request.method == 'DELETE':
        return delete_responses.process_delete(user_id)


def get_unknown(request, user_id):

    if request.method == 'GET':
        return get_responses.process_single_resource_data(user_id)


def register_users(request):

    if request.method == 'POST':
        return post_responses.process_register_user(request.POST, 'register')


def login_users(request):

    if request.method == 'POST':
        return post_responses.process_register_user(request.POST, 'login')
