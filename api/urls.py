from django.urls import path
from api import views

urlpatterns = [
    path('register', views.register, name='register'),
    path('register/', views.register, name='register'),
    path('login', views.login, name='login'),
    path('login/', views.login, name='login'),
    path('users', views.user_list, name='user_list'),
    path('users/', views.user_list, name='user_list'),
    path('users/<int:pk>', views.user_detail, name='user_detail'),
    path('users/<int:pk>/', views.user_detail, name='user_detail'),
]
