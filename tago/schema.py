from files import schema as filesSchema
from myadmin import schema as myadminSchema
from users import schema as usersSchema
import graphene

class Query(filesSchema.Query, myadminSchema.Query, usersSchema.Query):
    pass

class Mutation(filesSchema.Mutation, usersSchema.Mutation):
    pass

main_schema = graphene.Schema(query=Query, mutation=Mutation)
