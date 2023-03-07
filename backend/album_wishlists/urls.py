from django.urls import path, include
from album_wishlists import views

# <<<<<<<<<<<<<<<<< EXAMPLE FOR STARTER CODE USE <<<<<<<<<<<<<<<<<

urlpatterns = [
    path('', views.user_wishlist),
    path('<int:wishlist_id>/', views.remove_from_wishlist),
]