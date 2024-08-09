import jwt
from django.http import JsonResponse
from django.utils.deprecation import MiddlewareMixin
from django.urls import reverse
from rest_framework_simplejwt.authentication import JWTAuthentication

class TokenAuthenticationMiddleware(MiddlewareMixin):
    def process_request(self, request):
        # 过滤登录和登出，资源文件不校验
        filter_path = [reverse(i) for i in ['login', 'logout','api:token', 'api:token/refresh', 'api:token/verify']]
        if request.path in filter_path or request.path.startswith('/media'):
            return
        # 假设 Token 放在请求头的 'Authorization' 中，格式为 'Bearer <token>'
        auth_header = request.META.get('HTTP_AUTHORIZATION')
        if auth_header:
            auth = JWTAuthentication()
            try:
                # 校验token
                rs = auth.authenticate(request)
                return self.get_response(request)
            except jwt.ExpiredSignatureError:
                return JsonResponse({'message': 'Token has expired'}, status=401)
            except jwt.InvalidTokenError:
                return JsonResponse({'message': 'Invalid token'}, status=401)
        else:
            return JsonResponse({'message': 'Authorization header is required'}, status=401)
        
    def process_response(self, request, response):
        # 允许前端访问 Authorization 头
        response['Access-Control-Expose-Headers'] = 'Authorization'
        return response
    