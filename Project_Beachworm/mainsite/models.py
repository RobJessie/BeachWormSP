from django.db import models

class Song(models.Model):
  song_name = models.CharField(max_length=200)
  artist = models.CharField(max_length=200)
      
  def __str__(self):
    return self.song_name