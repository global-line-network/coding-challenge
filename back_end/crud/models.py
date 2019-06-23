from django.db import models


class Users(models.Model):
    email = models.CharField(max_length=200, null=True)
    password = models.CharField(max_length=200, null=True)
    first_name = models.CharField(max_length=200, null=True)
    last_name = models.CharField(max_length=200, null=True)
    name = models.CharField(max_length=200, null=True)
    avatar = models.CharField(max_length=1000, null=True)
    token = models.CharField(max_length=200, null=True)
    page = models.IntegerField(null=True)
    job = models.CharField(max_length=200, null=True)
    created_at = models.DateTimeField(auto_now_add=True)


class Resource(models.Model):
    name = models.CharField(max_length=200, null=True)
    year = models.IntegerField(null=True)
    color = models.CharField(max_length=200, null=True)
    pantone_value = models.CharField(max_length=200, null=True)
    page = models.IntegerField(null=True)
