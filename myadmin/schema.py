import graphene
from graphene_django import DjangoObjectType

from .models import MyAdmin, Groups, Permissions

class MyAdminType(DjangoObjectType):
    class Meta:
        model = MyAdmin
        fields = ('id', 'username', 'password', 'is_superuser', 'groups', 'permissions')


class Query(graphene.ObjectType):
    myAdmins = graphene.List(MyAdminType)
    admin_by_name = graphene.Field(MyAdminType, name=graphene.String(required=True))
    def resolve_myAdmins(self, info):
        return MyAdmin.objects.all()
    
    def resolve_admin_by_name(self, info, name):
        return MyAdmin.objects.get(name=name)