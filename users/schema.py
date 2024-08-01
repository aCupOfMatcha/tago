import graphene
from graphene_django import DjangoObjectType
from django.shortcuts import render

from users.models import Person, Avatar


class AvatarType(DjangoObjectType):
    class Meta:
        model = Avatar
        fields = ('avatar_url', 'md5')


class UsersType(DjangoObjectType):
    class Meta:
        model = Person
        avatar = graphene.Field(AvatarType)
        fields = ('id', 'avatar', 'name', 'gender', 'email')


class CreateUser(graphene.Mutation):
    class Arguments:
        name = graphene.String(required=True)
        avatar = graphene.ID()
        gender = graphene.String(required=True)
        email = graphene.String()
    
    ok = graphene.Boolean()
    user = graphene.Field(lambda: UsersType) # 1. 跟graphen有关的用schema的type
    def mutate(root, info, name, avatar, gender, email=None):
        user = Person(name=name, gender=gender, email=email) # 2. 因为是创建model所以用Person
        try:
            user.avatar = Avatar.objects.get(pk=avatar)
        except Avatar.DoesNotExist:
            user.avatar = avatar
        user.save()
        ok = True
        return CreateUser(user=user, ok=ok) # 3. 同上
    

class UpdateUser(graphene.Mutation):
    class Arguments:
        id = graphene.ID(required=True)
        avatar = graphene.ID()
        name = graphene.String(required=True)
        gender = graphene.String(required=True)
        email = graphene.String(required=True)
    
    ok = graphene.Boolean()
    user = graphene.Field(lambda: UsersType)
    def mutate(root, info, id, name, gender, email, avatar = None):
        user = Person.objects.get(pk=id)
        try:
            user.avatar = Avatar.objects.get(pk=avatar)
        except Avatar.DoesNotExist:
            user.avatar = avatar
        user.name = name
        user.gender = gender
        user.email = email
        user.save()
        ok = True
        return UpdateUser(user=user, ok=ok)


class DeleteUser(graphene.Mutation):
    class Arguments:
        id = graphene.ID(required=True)
    
    ok = graphene.Boolean()
    def mutate(root, info, id):
        user = Person.objects.get(pk=id)
        user.delete()
        ok = True
        return DeleteUser(ok=ok)
    

class Mutation(graphene.ObjectType):
    create_user = CreateUser.Field()
    update_user = UpdateUser.Field()
    delete_user = DeleteUser.Field()


class Query(graphene.ObjectType):
    all_users = graphene.List(UsersType)
    # 这块field类型要跟下面的def返回值类型对应
    users_by_name = graphene.Field(lambda: graphene.List(UsersType), name=graphene.String(required=True))
    users_by_id = graphene.Field(lambda: graphene.List(UsersType), id=graphene.ID(required=True))
    def resolve_all_users(root, info):
        return Person.objects.all()
    def resolve_users_by_name(root, info, name):
        try:
            return Person.objects.filter(name__icontains=name)
        except Person.DoesNotExist:
            return None
        
    def resolve_users_by_id(root, info, id):
        try:
            return Person.objects.filter(id=id)
        except Person.DoesNotExist:
            return None
        
schema = graphene.Schema(query=Query, mutation=Mutation)
