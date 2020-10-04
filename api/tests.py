from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from django.contrib.auth.models import User
from api.models import Profile

# Create your tests here.
class UserTests(APITestCase):
    def test_register_success(self):
        url = reverse('register')
        data = {
            "email": "admin@mail.co",
            "password": "admin"
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(User.objects.count(), 1)
        self.assertEqual(User.objects.get().username, 'admin')

    def test_register_failed(self):
        url = reverse('register')
        data = {
            "email": "admin@mail.co"
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_login_success(self):
        self.user = User.objects.create(username='admin', email='admin@mail.co', password='admin')
        self.profile = Profile.objects.create(user=self.user)
        url = reverse('login')
        data = {
            "email": "admin@mail.co",
            "password": "admin"
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_login_failed(self):
        self.user = User.objects.create(username='admin', email='admin@mail.co', password='admin')
        self.profile = Profile.objects.create(user=self.user)
        url = reverse('login')
        data = {
            "email": "admin@mail.co"
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)


    def test_user_list(self):
        self.user = User.objects.create(username='admin', email='admin@mail.co', password='admin')
        self.profile = Profile.objects.create(user=self.user)
        url = reverse('user_list')
        
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_user_detail(self):
        self.user = User.objects.create(username='admin', email='admin@mail.co', password='admin')
        self.profile = Profile.objects.create(user=self.user)
        
        url = reverse('user_detail', args=[1])
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        url_2 = reverse('user_detail', args=[2])
        response = self.client.get(url_2, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)