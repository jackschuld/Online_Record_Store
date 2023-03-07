from django.urls import path, include
from reviews import views

# <<<<<<<<<<<<<<<<< EXAMPLE FOR STARTER CODE USE <<<<<<<<<<<<<<<<<

urlpatterns = [
    path('', views.post_review),
    path('reviews/', views.album_reviews),
    path('<int:review_id>/', views.edit_review),
]