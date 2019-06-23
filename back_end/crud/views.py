from . import post_responses
from . import delete_responses


def users(request):

    if request.method == 'POST':
        return post_responses.process_create(request.POST)


def get_users(request, user_id):

    if request.method == 'POST':
        return post_responses.process_update(user_id, request.POST)

    elif request.method == 'DELETE':
        return delete_responses.process_delete(user_id)


def register_users(request):

    if request.method == 'POST':
        return post_responses.process_register_user(request.POST, 'register')


def login_users(request):

    if request.method == 'POST':
        return post_responses.process_register_user(request.POST, 'login')
