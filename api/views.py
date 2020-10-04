from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.contrib.auth.models import User
from api.models import Profile
from api.serializers import UserSerializer, RegisterSerializer
from django.core.paginator import Paginator
import time


# Create your views here.
@csrf_exempt
def user_list(request):
    if request.method == 'GET':
        page_size = 6
        page_number = 1  
    
        if 'page' in request.GET:
            page_number = request.GET['page']

        if 'delay' in request.GET:
            delay = request.GET['delay']
            time.sleep(int(delay))

        users = User.objects.all()
        paginator = Paginator(users, page_size)

        if int(page_number) > paginator.num_pages:
            return HttpResponse(status=404)

        paginated_users = paginator.page(page_number).object_list

        serializer = UserSerializer(paginated_users, many=True)
        Response = {
            "page": page_number,
            "per_page": page_size,
            "total": users.count(),
            "total_pages": paginator.num_pages,
            "data": serializer.data
        }
        return JsonResponse(Response, safe=False)


@csrf_exempt
def user_detail(request, pk):
    try:
        user = User.objects.get(pk=pk)
    except User.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == 'GET':
        serializer = UserSerializer(user)
        return JsonResponse(serializer.data)
    elif request.method == 'PUT' or request.method == 'PATCH':
        data = JSONParser().parse(request)
        if 'avatar' in data:
            avatar = data.pop('avatar')            
            try:
                profile = Profile.objects.get(user=pk)
                profile.avatar = avatar
                profile.save()
            except Profile.DoesNotExist:
                Profile.objects.create(user=user, avatar=avatar)
        elif 'token' in data:
            token = data.pop('token')            
            try:
                profile = Profile.objects.get(user=pk)
                profile.token = token
                profile.save()
            except Profile.DoesNotExist:
                Profile.objects.create(user=user, avatar=avatar)
            
        serializer = UserSerializer(user, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)

    elif request.method == 'DELETE':
        user.delete()
        return HttpResponse(status=204)


@csrf_exempt
def register(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        username = data['email'].split('@')[0]
        data['username'] = username

        serializer = RegisterSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            Response = {
                "id": serializer.data['id'],
                "token": serializer.data['token']
            }
            return JsonResponse(Response)
        return HttpResponse(status=404)


@csrf_exempt
def login(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)

        try:
            user = User.objects.get(email=data['email'], password=data['password'])
            profile = Profile.objects.get(user=user)
            Response = {
                "token": profile.token
            }
            return JsonResponse(Response)
        except:
            return HttpResponse(status=404)