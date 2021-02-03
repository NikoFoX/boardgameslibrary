from django.contrib.auth.models import AbstractUser
from django.db import models

# Create your models here.
from common.constants import SHORT_STRING


class User(AbstractUser):
    name = models.CharField(blank=True, max_length=SHORT_STRING)
