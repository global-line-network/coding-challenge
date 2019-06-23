from . import models
from django.http import HttpResponse


def process_delete(user_id):
    # models.Users.objects.get(id=user_id).delete()
    return HttpResponse(status=204)
