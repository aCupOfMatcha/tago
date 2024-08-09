from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class MyAdmin(AbstractUser):
    groups = models.ManyToManyField('Groups', blank=True)
    id = models.AutoField(primary_key=True)
    last_login = models.DateTimeField(auto_now=True)
    is_superuser = models.BooleanField(default=False)
    password = models.CharField(max_length=100)
    permissions = models.ManyToManyField('Permissions', blank=True)
    username = models.CharField(max_length=100, unique=True)


class Groups(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    permissions = models.ManyToManyField('Permissions', blank=True)


class Permissions(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    
