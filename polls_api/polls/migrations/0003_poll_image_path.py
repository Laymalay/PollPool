# Generated by Django 2.2.6 on 2019-10-17 13:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('polls', '0002_auto_20191011_1203'),
    ]

    operations = [
        migrations.AddField(
            model_name='poll',
            name='image_path',
            field=models.TextField(max_length=300, null=True),
        ),
    ]