
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)
from .serializers import CustomTokenObtainPairView
from django.urls import path
from django.views.decorators.csrf import csrf_exempt

app_name = 'api'
 
urlpatterns = [
    path('token/', csrf_exempt(CustomTokenObtainPairView.as_view()), name='token'),
    # path('token/', csrf_exempt(TokenObtainPairView.as_view()), name='token'),   # 用于获取
    path('token/refresh/', csrf_exempt(TokenRefreshView.as_view()), name='token/refresh'),  # 用于更新
    path('token/verify/', csrf_exempt(TokenVerifyView.as_view()), name='token/verify'),     # 验证
]