from django.http import JsonResponse
import graphene
from graphene_django.types import DjangoObjectType
from users.models import Person, Avatar
from django.core.exceptions import ObjectDoesNotExist
import hashlib

def home_view(request):
    data = {
        'message': 'Hello from Django!',
        'status': 'uccess'
    }
    return JsonResponse(data)

def get_file_md5(file_content):
        md5_hash = hashlib.md5()
        md5_hash.update(file_content)
        return md5_hash.hexdigest()
def avatar_view(request):
    id = request.POST.get('id')
    avatar = request.FILES.get('avatar')
    md5 = get_file_md5(bytes(str(avatar), 'utf-8'))
    try:
        avatar_obj = Avatar.objects.get(md5=md5)
    except Avatar.DoesNotExist:
        avatar_obj = Avatar.objects.create(avatar_url=avatar, md5=md5)

    # 拼接图片的路径
    avatar_addr = avatar_obj.get_avatar_url()
    data = {
        'avatar': {
             'url': avatar_addr,
             'id': avatar_obj.id,
        },
        'status': 'uccess'
    }
    return JsonResponse(data=data)

class Query(graphene.ObjectType):
    hello = graphene.String(default_value="Hello World!")