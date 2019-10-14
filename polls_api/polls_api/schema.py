import graphene
import graphql_jwt

import polls.schema
import questions.schema
import users.schema


class Query(polls.schema.Query,
            questions.schema.Query,
            users.schema.Query,
            graphene.ObjectType):
    # This class will inherit from multiple Queries
    # as we begin to add more apps to our project
    pass


class Mutation(polls.schema.Mutation,
               questions.schema.Mutation,
               users.schema.Mutation,
               graphene.ObjectType):

    token_auth = graphql_jwt.ObtainJSONWebToken.Field()
    verify_token = graphql_jwt.Verify.Field()
    refresh_token = graphql_jwt.Refresh.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
