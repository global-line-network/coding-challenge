import json
from . import models
from . import utils
from django.http import HttpResponse
from django.utils import timezone


def process_and_save_user(usr, post_data, new_created_at=False):
    response_data = {}
    if post_data.get('name'):
        usr.name = post_data.get('name')
        response_data['name'] = usr.name
    if post_data.get('job'):
        usr.job = post_data.get('job')
        response_data['job'] = usr.job
    if post_data.get('email'):
        usr.email = post_data.get('email')
        response_data['email'] = usr.email
    if post_data.get('first_name'):
        usr.first_name = post_data.get('first_name')
        response_data['first_name'] = usr.first_name
    if post_data.get('last_name'):
        usr.last_name = post_data.get('last_name')
        response_data['last_name'] = usr.last_name
    if post_data.get('avatar'):
        usr.avatar = post_data.get('avatar')
        response_data['avatar'] = usr.avatar
    if post_data.get('avatar'):
        usr.avatar = post_data.get('avatar')
        response_data['avatar'] = usr.avatar
    if new_created_at:
        usr.created_at = timezone.now()
    if post_data.get('password'):
        usr.password = post_data.get('password')
        usr.token = utils.generate_random_token()
        response_data['token'] = usr.token
    usr.save()
    return response_data


def process_and_save_resource(resource, post_data):
    response_data = {}
    if post_data.get('name'):
        resource.name = post_data.get('name')
        response_data['name'] = resource.name
    if post_data.get('year'):
        resource.year = post_data.get('year')
        response_data['year'] = resource.year
    if post_data.get('color'):
        resource.email = post_data.get('color')
        response_data['color'] = resource.color
    if post_data.get('pantone_value'):
        resource.pantone_value = post_data.get('pantone_value')
        response_data['pantone_value'] = resource.pantone_value
    resource.save()
    return response_data


def process_create(post_data):
    usr = models.Users()
    response_data = process_and_save_user(usr, post_data)
    response_data['createdAt'] = usr.created_at.strftime("%Y-%m-%dT%H:%M:%S.%f")
    return HttpResponse(json.dumps(response_data), content_type="application/json", status=201)


def process_create_resource(post_data):
    resource = models.Resource()
    response_data = process_and_save_resource(resource, post_data)
    return HttpResponse(json.dumps(response_data), content_type="application/json", status=201)


def process_update(user_id, post_data):
    try:
        usr = models.Users.objects.get(id=user_id)
        response_data = process_and_save_user(usr, post_data, True)
        response_data['createdAt'] = usr.created_at.strftime("%Y-%m-%dT%H:%M:%S.%f")
    except models.Users.DoesNotExist:
        return HttpResponse(json.dumps({}), content_type="application/json", status=404)
    return HttpResponse(json.dumps(response_data), content_type="application/json", status=201)


def process_register_user(post_data, request_url):
    if 'email' not in post_data:
        response_data = {"error": "Missing email"}
        return HttpResponse(json.dumps(response_data), content_type="application/json", status=400)

    if 'password' not in post_data:
        response_data = {"error": "Missing password"}
        return HttpResponse(json.dumps(response_data), content_type="application/json", status=400)

    try:
        usr = models.Users.objects.get(email=post_data.get('email'), password=post_data.get('password'))
        response_data = {
            'token': usr.token
        }
        if request_url == 'register':
            response_data['id'] = usr.id
    except models.Users.DoesNotExist:
        usr = models.Users()
        response_data = process_and_save_user(usr, post_data)
        if request_url == 'register':
            response_data['id'] = usr.id
    return HttpResponse(json.dumps(response_data), content_type="application/json", status=200)
