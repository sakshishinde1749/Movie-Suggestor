from django.urls import path

from . import views

urlpatterns = [
    path('backup_database/', views.backup_database, name='backup'),
    path('update_desc/', views.update_desc, name='update_desc'),
    path('delete_movie/<int:movie_id>/', views.delete_movie, name='delete_movie'),
    path('add_movie/', views.add_movie, name='add_movie'),
    path('', views.index, name='index'),
]