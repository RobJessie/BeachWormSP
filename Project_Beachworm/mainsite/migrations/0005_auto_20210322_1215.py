# Generated by Django 3.0.3 on 2021-03-22 16:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mainsite', '0004_song_img_640'),
    ]

    operations = [
        migrations.AlterField(
            model_name='playlist',
            name='id',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='playlist',
            name='songs',
            field=models.ManyToManyField(blank=True, to='mainsite.Song'),
        ),
        migrations.AlterField(
            model_name='profile',
            name='disliked_songs',
            field=models.ManyToManyField(blank=True, related_name='profile_disliked', to='mainsite.Song'),
        ),
        migrations.AlterField(
            model_name='profile',
            name='favorite_playlists',
            field=models.ManyToManyField(blank=True, related_name='profile_favorite_playlists', to='mainsite.Playlist'),
        ),
        migrations.AlterField(
            model_name='profile',
            name='following',
            field=models.ManyToManyField(blank=True, related_name='profile_following', to='mainsite.Profile'),
        ),
        migrations.AlterField(
            model_name='profile',
            name='liked_songs',
            field=models.ManyToManyField(blank=True, related_name='profile_liked', to='mainsite.Song'),
        ),
    ]