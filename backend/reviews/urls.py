from django.urls import path, include
from reviews import views

# <<<<<<<<<<<<<<<<< EXAMPLE FOR STARTER CODE USE <<<<<<<<<<<<<<<<<

urlpatterns = [
    path('', views.album_reviews),
    path('<int:id>/', views.edit_review),
]