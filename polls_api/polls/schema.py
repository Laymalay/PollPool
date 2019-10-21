import graphene

from graphene_django.types import DjangoObjectType

from polls.models import Poll
from questions.schema import QuestionType
from users.schema import UserType


class PollType(DjangoObjectType):
    class Meta:
        model = Poll


class Query(object):
    all_polls = graphene.List(PollType, creator=graphene.Int(),)
    poll = graphene.Field(PollType,
                          id=graphene.Int(),
                          title=graphene.String())

    def resolve_all_polls(self, info, **kwargs):
        creator = kwargs.get('creator')
        if creator:
            return Poll.objects.filter(creator=creator)
        return Poll.objects.all()

    def resolve_poll(self, info, **kwargs):
        id = kwargs.get('id')
        title = kwargs.get('title')

        if id is not None:
            return Poll.objects.get(pk=id)

        if title is not None:
            return Poll.objects.get(title=title)

        return None


class UpdatePoll(graphene.Mutation):
    questions = graphene.List(QuestionType)
    creator = graphene.Field(UserType)
    title = graphene.String(required=True)
    description = graphene.String()
    id = graphene.ID()

    class Arguments:
        title = graphene.String(required=True)
        id = graphene.ID()

    poll = graphene.Field(PollType)

    def mutate(self, info, title, id):
        poll = Poll.objects.get(pk=id)
        poll.title = title
        poll.save()
        return UpdatePoll(creator=poll.creator,
                          id=poll.id,
                          description=poll.description,
                          title=poll.title)


class CreatePoll(graphene.Mutation):
    creator = graphene.Field(UserType)
    title = graphene.String(required=True)
    description = graphene.String()

    class Arguments:
        title = graphene.String(required=True)
        description = graphene.String()

    poll = graphene.Field(PollType)

    def mutate(self, info, title, description):
        poll = Poll(title=title, creator=info.context.user,
                    description=description)
        poll.save()
        return CreatePoll(creator=poll.creator,
                          description=poll.description,
                          title=poll.title)


class Mutation(graphene.ObjectType):
    update_poll = UpdatePoll.Field()
    create_poll = CreatePoll.Field()
