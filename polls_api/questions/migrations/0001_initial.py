# Generated by Django 2.2.6 on 2019-10-11 12:03

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('polls', '0002_auto_20191011_1203'),
    ]

    operations = [
        migrations.CreateModel(
            name='Question',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.TextField()),
                ('poll', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='questions', to='polls.Poll')),
            ],
        ),
        migrations.CreateModel(
            name='Choice',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.TextField()),
                ('question', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='choices', to='questions.Question')),
            ],
        ),
    ]