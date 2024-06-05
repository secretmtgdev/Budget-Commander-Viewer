import graphene

from graphene_django import DjangoObjectType
from .models import Account

class AccountType(DjangoObjectType):
    class Meta:
        model = Account
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

class Query(graphene.ObjectType):
    accounts = graphene.List(AccountType)
    users = graphene.List(UserType)

    def resolve_accounts(self, info):
        return Account.objects.all()

class Mutation(graphene.ObjectType):
    create_account = CreateAccount.Field()
    update_account = UpdateAccount.Field()
    delete_account = DeleteAccount.Field()

schema = graphene.Schema(query=Query, mutation=Mutation)