from django.shortcuts import render
from .models import MyAdmin
from django.http import JsonResponse
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
import json

# Create your views here.
def login_view(request):
    data = json.loads(request.body)
    username = data.get('username')
    password = data.get('password')
    try:
        myadmin = MyAdmin.objects.get(username=username)
        if authenticate(username=username, password=password):
            refresh = RefreshToken.for_user(myadmin)
            data = {
                'code': 200,
                'msg': '登录成功',
            }
            headers = {
                'Authorization': f'Bearer {refresh.access_token}'
            }
            return JsonResponse(data, headers=headers)
        else:
            return JsonResponse({'code': 500, 'msg': '密码错误'})
    except Exception as e:
        return JsonResponse({'code': 500, 'msg': '用户名不存在'}) 
    
def logout_view(request):
    del request.session["username"]
    return JsonResponse({'code': 200, 'msg': '退出成功'})
