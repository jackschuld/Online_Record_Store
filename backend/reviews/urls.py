from django.urls import path, include
from reviews import views

# <<<<<<<<<<<<<<<<< EXAMPLE FOR STARTER CODE USE <<<<<<<<<<<<<<<<<

urlpatterns = [
    path('<int:album_id>/', views.album_reviews),
]