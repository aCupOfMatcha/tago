from django.db import models

# Create your models here.
class Files(models.Model):
    name = models.CharField(max_length=100)
    size = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    tags = models.CharField(max_length=100)
    description = models.TextField()
    upload_to = models.FileField(upload_to='uploads')
