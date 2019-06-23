from django.urls import path
from . import views

urlpatterns = [
    path('users', views.users, name='users'),
    path('users/<int:user_id>', views.get_users, name='get_users'),
    path('register', views.register_users, name='register_users'),
    path('login', views.login_users, name='login_users'),
    path('unknown', views.unknown, name='unknown'),
    path('unknown/<int:user_id>', views.get_unknown, name='get_unknown'),
]