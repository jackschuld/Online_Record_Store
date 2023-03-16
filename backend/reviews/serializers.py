from rest_framework import serializers
from .models import Review

# <<<<<<<<<<<<<<<<< EXAMPLE FOR STARTER CODE USE <<<<<<<<<<<<<<<<<


class Review_Serializer(serializers.ModelSerializer):
    username = serializers.SerializerMethodField()
    def get_username(self, comment):
        return comment.user.username
    class Meta:
        model = Review
        fields = ['id', 'username', 'star_review', 'written_review', 'user_id']
        depth = 1
