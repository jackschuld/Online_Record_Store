from django.urls import path, include
from album_collections import views

# <<<<<<<<<<<<<<<<< EXAMPLE FOR STARTER CODE USE <<<<<<<<<<<<<<<<<

urlpatterns = [
    path('', views.user_collections),
    path('<int:collection_id>/', views.remove_from_collection),
]