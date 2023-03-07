from django.shortcuts import render, get_object_or_404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from .models import Review
from .serializers import Review_Serializer


@api_view(['GET'])
@permission_classes([AllowAny])
def album_reviews(request, album_id):
    reviews = Review.objects.filter(album_id=album_id)
    serializer = Review_Serializer(reviews, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def post_review(request, album_id):
        serializer = Review_Serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(user=request.user, album_id=album_id)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

@api_view(['PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def edit_review(request, album_id, review_id):
    review = get_object_or_404(Review, id=review_id)
    if request.method == 'PUT':
        serializer = Review_Serializer(review, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    elif request.method == 'DELETE':
        review.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

