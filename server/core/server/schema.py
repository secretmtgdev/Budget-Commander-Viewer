import graphene

from graphene_django import DjangoObjectType
from .models import Account, User

class AccountType(DjangoObjectType):
    class Meta:
        model = Account
        fields = "__all__"

class UserType(DjangoObjectType):
    class Meta:
        model = User
        fields = "__all__"

class CreateAccount(graphene.Mutation):
    class Arguments:
        username = graphene.String(required=True)
        password = graphene.String(required=True)
        user_id = graphene.ID(required=True)
    
    account = graphene.Field(AccountType)

    def mutate(self, info, username, password, user_id):
        user = User.objects.get(pk=user_id)
        account = Account(username=username, password=password)
        account.save()
        return CreateAccount(account=account)

class UpdateAccount(graphene.Mutation):
    class Arguments:
        user_id = graphene.ID(required=True)
        username = graphene.String()
        password = graphene.String()

    account = graphene.Field(AccountType)

    def mutate(self, info, user_id, username=None, password=None):
        try:
            account = Account.objects.get(pk=user_id)
        except Account.DoesNotExist:
            raise Exception(f"{UpdateAccount}: Account not found")

        if username is not None:
            account.username = username
        
        if password is not None:
            account.password = password

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

    def resolve_users(self, info):
        return User.objects.all()

class Mutation(graphene.ObjectType):
    create_account = CreateAccount.Field()
    update_account = UpdateAccount.Field()
    delete_account = DeleteAccount.Field()

schema = graphene.Schema(query=Query, mutation=Mutation)