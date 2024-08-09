from django.shortcuts import render
from django.http import JsonResponse
from .models import Files

# Create your views here.

def file_upload(request):
    files = request.FILES.getlist('file')
    for f in files:
        Files.objects.create(name=f, size=f.size)
    data = {
        'msg': '上传成功！',
        'code': '200'
    }
    return JsonResponse(data=data)