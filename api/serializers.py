from rest_framework import serializers
from django.contrib.auth.models import User
from api.models import Profile
from django.utils.crypto import get_random_string

class UserSerializer(serializers.ModelSerializer):
    avatar = serializers.SerializerMethodField('get_avatar')

    def get_avatar(self, foo):
        try:
            return Profile.objects.get(user=foo.id).avatar
        except Profile.DoesNotExist:
            return None

    class Meta:
        model = User
        fields = ['id', 'email', 'first_name', 'last_name', 'avatar']


class RegisterSerializer(serializers.ModelSerializer):
    token = serializers.SerializerMethodField('get_token')

    def get_token(self, foo):
        try:
            return Profile.objects.get(user=foo.id).token
        except Profile.DoesNotExist:
            return None

    def create(self, validated_data):
        user = User.objects.create(**validated_data)
        Profile.objects.create(user=user, token=get_random_string(length=18))
        return user

    class Meta:
        model = User
        fields = ['id', 'email', 'password', 'username', 'token']
