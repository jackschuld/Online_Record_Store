# Generated by Django 4.1.7 on 2023-03-08 16:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='is_store',
            field=models.BooleanField(default=False, verbose_name='store status'),
        ),
    ]
