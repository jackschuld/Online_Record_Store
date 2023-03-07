from rest_framework import serializers
from .models import Album_Collection

# <<<<<<<<<<<<<<<<< EXAMPLE FOR STARTER CODE USE <<<<<<<<<<<<<<<<<


class Album_Collection_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Album_Collection
        fields = ['id', 'user', 'album_id']
        depth = 1
