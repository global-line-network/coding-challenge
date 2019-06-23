import json
from . import models
from django.http import HttpResponse
from django.core.paginator import Paginator


def process_list_data(get_page):
    per_page = 3
    usr = models.Users.objects.all().order_by('id')
    paginator = Paginator(usr, per_page)
    if not get_page:
        get_page = 1
    usrs = paginator.page(get_page)
    data = []
    for entry in usrs:
        data.append({
            "id": entry.id,
            "email": entry.email,
            "first_name": entry.first_name,
            "last_name": entry.last_name,
            "avatar": entry.avatar
        })
    response_data = {
        "page": int(get_page),
        "per_page": per_page,
        "total": paginator.count,
        "total_pages": paginator.num_pages,
        "data": data
    }
    return HttpResponse(json.dumps(response_data), content_type="application/json", status=200)


def process_resource_list_data(get_page):
    per_page = 3
    resource = models.Resource.objects.all().order_by('id')
    paginator = Paginator(resource, per_page)
    if not get_page:
        get_page = 1
    resources = paginator.page(get_page)
    data = []
    for entry in resources:
        data.append({
            "name": entry.name,
            "year": entry.year,
            "color": entry.color,
            "pantone_value": entry.pantone_value
        })
    response_data = {
        "page": int(get_page),
        "per_page": per_page,
        "total": paginator.count,
        "total_pages": paginator.num_pages,
        "data": data
    }
    return HttpResponse(json.dumps(response_data), content_type="application/json", status=200)


def process_single_user_data(user_id):
    try:
        usr = models.Users.objects.get(id=user_id)
        response_data = {
            "id": usr.id,
            "email": usr.email,
            "first_name": usr.first_name,
            "last_name": usr.last_name,
            "avatar": usr.avatar
        }
        return HttpResponse(json.dumps(response_data), content_type="application/json", status=200)
    except models.Users.DoesNotExist:
        return HttpResponse(json.dumps({}), content_type="application/json", status=404)


def process_single_resource_data(resource_id):
    try:
        resource = models.Resource.objects.get(id=resource_id)
        response_data = {
            "id": resource.id,
            "name": resource.name,
            "year": resource.year,
            "color": resource.color,
            "pantone_value": resource.pantone_value
        }
        return HttpResponse(json.dumps(response_data), content_type="application/json", status=200)
    except models.Users.DoesNotExist:
        return HttpResponse(json.dumps({}), content_type="application/json", status=404)
