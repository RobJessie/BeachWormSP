# Generated by Django 3.0.3 on 2021-03-14 20:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mainsite', '0003_auto_20210313_2228'),
    ]

    operations = [
        migrations.AddField(
            model_name='song',
            name='img_640',
            field=models.TextField(default='https://imgur.com/a/RMIhpXF'),
        ),
    ]
