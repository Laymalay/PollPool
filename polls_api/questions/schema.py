import graphene

from graphene_django.types import DjangoObjectType

from questions.models import Question, Choice
from polls.models import Poll


class QuestionType(DjangoObjectType):
    class Meta:
        model = Question


class ChoiceType(DjangoObjectType):
    class Meta:
        model = Choice


class Query(object):
    all_questions = graphene.List(QuestionType)
    all_choices = graphene.List(ChoiceType)

    def resolve_all_questions(self, info, **kwargs):
        return Question.objects.all()

    def resolve_all_choices(self, info, **kwargs):
        return Choice.objects.all()


class QuestionCreate(graphene.Mutation):
    class Arguments:
        title = graphene.String(required=True)
        poll_id = graphene.Int()

    question = graphene.Field(QuestionType)

    def mutate(self, info, title, poll_id):
        poll = Poll.objects.get(pk=poll_id)
        question = Question(title=title, poll=poll)
        question.save()
        return QuestionCreate(question=question)


class ChoiceCreate(graphene.Mutation):
    class Arguments:
        title = graphene.String(required=True)
        question_id = graphene.Int()

    choice = graphene.Field(ChoiceType)

    def mutate(self, info, title, question_id):
        question = Question.objects.get(pk=question_id)
        choice = Choice(title=title, question=question)
        choice.save()
        return ChoiceCreate(choice=choice)


class Mutation(graphene.ObjectType):
    create_choice = ChoiceCreate.Field()
    create_question = QuestionCreate.Field()
