from django.urls import path, include
from album_wishlists import views

# <<<<<<<<<<<<<<<<< EXAMPLE FOR STARTER CODE USE <<<<<<<<<<<<<<<<<

urlpatterns = [
    path('<int:user_id>/wishlist/', views.get_wishlist),
    path('<str:album_id>/', views.add_album_to_wishlist),
    path('remove/<int:wishlist_id>/', views.remove_from_wishlist),
]