from django.db import models
from authentication.models import User

# Create your models here.
class Album_Collection(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    album_id = models.CharField(max_length=225, blank=False)
