# Generated by Django 5.0.6 on 2024-06-05 20:51

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('server', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='alias',
            old_name='short_descriptioin',
            new_name='short_description',
        ),
    ]
