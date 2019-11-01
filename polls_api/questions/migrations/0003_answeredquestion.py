# Generated by Django 2.2.6 on 2019-10-31 11:27

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('polls', '0004_passedpoll'),
        ('questions', '0002_question_answer'),
    ]

    operations = [
        migrations.CreateModel(
            name='AnsweredQuestion',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('correct', models.BooleanField()),
                ('choice', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='selected_choices', to='questions.Choice')),
                ('poll', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='answers', to='polls.PassedPoll')),
                ('question', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='answered_questions', to='questions.Question')),
            ],
        ),
    ]