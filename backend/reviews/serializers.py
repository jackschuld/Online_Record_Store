from rest_framework import serializers
from .models import Review

# <<<<<<<<<<<<<<<<< EXAMPLE FOR STARTER CODE USE <<<<<<<<<<<<<<<<<


class Review_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ['id', 'user', 'album_id', 'star_review', 'written_review']
        depth = 1
