import graphene
import server.schema

# use server query
class Query(server.schema.Query, graphene.ObjectType):
    pass

# user server mutation
class Mutation(server.schema.Mutation, graphene.ObjectType):
    pass

schema = graphene.Schema(query=Query, mutation=Mutation)