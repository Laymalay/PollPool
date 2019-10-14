from django.db import models
from polls.models import Poll

class Question(models.Model):
    title = models.TextField()
    poll = models.ForeignKey(
        Poll, related_name='questions', on_delete=models.CASCADE)

    def __str__(self):
        """A string representation of the model."""
        return self.title


class Choice(models.Model):
    title = models.TextField()
    question = models.ForeignKey(
        Question, related_name='choices', on_delete=models.CASCADE)

    def __str__(self):
        """A string representation of the model."""
        return self.title
