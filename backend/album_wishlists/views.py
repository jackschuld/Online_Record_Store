from django.shortcuts import render, get_object_or_404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from .models import Album_Wishlist
from .serializers import Album_Wishlist_Serializer


@api_view(['GET'])
@permission_classes([AllowAny])
def get_wishlist(request, user_id):
    albums = Album_Wishlist.objects.filter(user_id=user_id)
    serializer = Album_Wishlist_Serializer(albums, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_album_to_wishlist(request, album_id):
    serializer = Album_Wishlist_Serializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    serializer.save(user=request.user, album_id=album_id)
    return Response(serializer.data, status=status.HTTP_201_CREATED)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def remove_from_wishlist(request, wishlist_id):
    album = get_object_or_404(Album_Wishlist, user=request.user, id=wishlist_id)
    album.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)