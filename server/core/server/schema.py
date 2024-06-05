import graphene

from graphene_django import DjangoObjectType
from .models import Account, Alias

class AccountType(DjangoObjectType):
    class Meta:
        model = Account
        fields = "__all__"

class AliasType(DjangoObjectType):
    class Meta:
        model = Alias
        fields = "__all__"

class CreateAccount(graphene.Mutation):    
    class Arguments:
        username = graphene.String(required=True)
        password = graphene.String(required=True)
        email = graphene.String(required=True)
        created_at = graphene.DateTime(required=True)    

    account = graphene.Field(AccountType)
    def mutate(self, info, username, password, email, created_at, last_login):
        account = Account(username=username, password=password, email=email, created_at=created_at)
        account.save()
        return CreateAccount(account=account)

class UpdateAccount(graphene.Mutation):
    class Arguments:
        user_id = graphene.ID(required=True)
        username = graphene.String()
        password = graphene.String()
        email = graphene.String()

    account = graphene.Field(AccountType)

    def mutate(self, info, user_id, username=None, password=None, email=None):
        try:
            account = Account.objects.get(pk=user_id)
        except Account.DoesNotExist:
            raise Exception(f"{UpdateAccount}: Account not found")

        if username is not None:
            account.username = username
        
        if password is not None:
            account.password = password

        if email is not None:
            account.email = email

        account.save()
        return UpdateAccount(account=account)

class DeleteAccount(graphene.Mutation):
    class Arguments:
        user_id = graphene.ID(required=True)

    success = graphene.Boolean()

    def mutate(self, info, user_id):
        try:
            account = Account.objects.get(pk=user_id)
        except Account.DoesNotExist:
            raise Exception(f"{DeleteAccount}: Account not found")

        account.delete()
        return DeleteAccount(success=True)

class CreateAlias(graphene.Mutation):
    queryAlias = graphene.Field(AliasType)
    class Arguments:
        alias = graphene.String(required=True)
        query = graphene.String(required=True)
        shortDescription = graphene.String(required=True)

    def mutate(self, info, alias, query, shortDescription):
        aliasRecord = Alias(alias=alias, query=query, shortDescription=shortDescription)
        aliasRecord.save()
        return CreateAlias(queryAlias=aliasRecord)

class Query(graphene.ObjectType):
    all_aliases = graphene.List(AliasType)

    def resolve_all_aliases(self, info, **kwargs):
        return Alias.objects.all()

class Mutation(graphene.ObjectType):
    create_alias = CreateAlias.Field()

schema = graphene.Schema(query=Query, mutation=Mutation)