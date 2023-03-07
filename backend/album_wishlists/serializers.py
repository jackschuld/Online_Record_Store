from rest_framework import serializers
from .models import Album_Wishlist

# <<<<<<<<<<<<<<<<< EXAMPLE FOR STARTER CODE USE <<<<<<<<<<<<<<<<<


class Album_Wishlist_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Album_Wishlist
        fields = ['id', 'user', 'album_id']
        depth = 1
