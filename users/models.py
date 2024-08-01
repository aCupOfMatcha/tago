from django.db import models


# 服务器IP
MEDIA_ADDR = 'http://localhost:8000/media/'
# Create your models here.


class Avatar(models.Model):
    '''头像'''
    id = models.AutoField(primary_key=True)
    md5 = models.CharField(max_length=32, unique=True)
    avatar_url = models.ImageField(upload_to='avatar', default='', verbose_name='头像') # upload_to 上传目录

    def get_avatar_url(self):
        '''返回头像的url'''
        return MEDIA_ADDR + str(self.avatar_url)


class Person(models.Model):
    
    GENDER_CHOICES = (
        ('male', '男'), 
        ('female', '女'), 
    )

    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    gender = models.CharField(max_length=6, choices=GENDER_CHOICES, default='male')
    email = models.EmailField(blank=True, null=True) # blank允许为空，空默认存储为false，null则存储为NULL
    avatar = models.ForeignKey(Avatar, on_delete=models.SET_NULL, blank=True, null=True)
