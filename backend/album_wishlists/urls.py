from django.urls import path, include
from album_wishlists import views

# <<<<<<<<<<<<<<<<< EXAMPLE FOR STARTER CODE USE <<<<<<<<<<<<<<<<<

urlpatterns = [
    path('<str:user_id>/', views.user_wishlist),
]