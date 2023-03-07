from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from .models import Review
from .serializers import Review_Serializer

# <<<<<<<<<<<<<<<<< EXAMPLE FOR STARTER CODE USE <<<<<<<<<<<<<<<<<


@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
def album_reviews(request, album_id):
    if request.method == 'GET':
        reviews = Review.objects.filter(album_id=album_id)
        serializer = Review_Serializer(reviews, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    elif request.method == 'POST':
        serializer = Review_Serializer(data=request.data)
        if serializer.is_valid():
            serializer.save(album_id=album_id)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)