from django.shortcuts import render, get_object_or_404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from .models import Album_Collection
from .serializers import Album_Collection_Serializer


@api_view(['GET'])
@permission_classes([AllowAny])
def get_collection(request, user_id):
    albums = Album_Collection.objects.filter(user_id=user_id)
    serializer = Album_Collection_Serializer(albums, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_album_to_collection(request, album_id):
    serializer = Album_Collection_Serializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    serializer.save(user=request.user, album_id=album_id)
    return Response(serializer.data, status=status.HTTP_201_CREATED)
    
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def remove_from_collection(request, collection_id):
    album = get_object_or_404(Album_Collection, user_id=request.user, id=collection_id)
    album.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)