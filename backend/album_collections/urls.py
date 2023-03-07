from django.urls import path, include
from album_collections import views

# <<<<<<<<<<<<<<<<< EXAMPLE FOR STARTER CODE USE <<<<<<<<<<<<<<<<<

urlpatterns = [
    path('<int:user_id>/collection/', views.get_collection),
    path('<str:album_id>/', views.add_album_to_collection),
    path('remove/<int:collection_id>/', views.remove_from_collection),
]