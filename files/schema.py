import graphene
from graphene_django import DjangoObjectType

from .models import Files

class FilesType(DjangoObjectType):
    class Meta:
        model = Files
        fields = ('id', 'name', 'description', 'size', 'tags', 'upload_to', 'created_at')


class Query(graphene.ObjectType):
    all_files = graphene.List(FilesType)

    def resolve_all_files(root, info):
        return Files.objects.all()
    

class CreateFile(graphene.Mutation):
    file = graphene.Field(FilesType)

    class Arguments:
        name = graphene.String(required=True)
        description = graphene.String(required=True)
        size = graphene.Int(required=True)
        tags = graphene.String(required=True)
        upload_to = graphene.String(required=True)

    def mutate(root, info,name, description, size, tags):
        file = Files(name=name, description=description, size=size, tags=tags, upload_to=upload_to)
        file.save()
        return CreateFile(file=file)


class Mutation(graphene.ObjectType):
    create_file = CreateFile.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)