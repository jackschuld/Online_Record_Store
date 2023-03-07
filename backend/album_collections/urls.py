from django.urls import path, include
from album_collections import views

# <<<<<<<<<<<<<<<<< EXAMPLE FOR STARTER CODE USE <<<<<<<<<<<<<<<<<

urlpatterns = [
    path('<int:user_id>/', views.user_collections),
    # path('collections/', views.get_albums),
]