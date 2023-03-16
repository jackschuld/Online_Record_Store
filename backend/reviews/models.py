from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
from authentication.models import User

# Create your models here.
class Review(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    album_id = models.CharField(max_length=225, blank=False)
    star_review = models.FloatField(default=1, validators=[
            MaxValueValidator(5),
            MinValueValidator(0)
        ]
    )
    written_review = models.CharField(max_length=225, blank=False)