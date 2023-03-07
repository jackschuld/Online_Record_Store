from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from .models import Album_Wishlist
from .serializers import Album_Wishlist_Serializer

# <<<<<<<<<<<<<<<<< EXAMPLE FOR STARTER CODE USE <<<<<<<<<<<<<<<<<


@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
def user_wishlist(request, user_id):
    if request.method == 'GET':
        albums = Album_Wishlist.objects.filter(user_id=user_id)
        serializer = Album_Wishlist_Serializer(albums, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    elif request.method == 'POST':
        serializer = Album_Wishlist_Serializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user_id=user_id)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)