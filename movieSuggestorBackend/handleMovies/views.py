from django.shortcuts import render, redirect
from django.http import HttpResponse;
import json
from django.core import serializers
from .models import moviesList
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
import requests
from django.core.management import call_command
from django.contrib.admin.views.decorators import staff_member_required
import os
import shutil
import datetime
from django.conf import settings

# Create your views here.
def index(request):
    movies_list = moviesList.objects.all()
    movies_list_array = serializers.serialize('json', movies_list)
    return HttpResponse(movies_list_array, content_type='application/json')


@csrf_exempt
def add_movie(request):
    if request.method == 'POST':
        data = request.body.decode('utf-8')
        my_data = json.loads(data)
        title = my_data['movieTitle']
        desc = my_data['movieDesc']
        genre = "not-available"
        posterUrl = 'https://skydomepictures.com/wp-content/uploads/2018/08/movie-poster-coming-soon-2.png'
        response = requests.get(f'http://www.omdbapi.com/?t=${title}&apikey=6cdbd6b2')
        if response.status_code == 200:
            posterUrl = response.json().get('Poster') or posterUrl
            genre = response.json().get('Genre') or genre
            desc = response.json().get('Plot') or desc
            title = response.json().get('Title') or title
        new_movie = moviesList(movie_title=title, poster_url=posterUrl, movie_description=desc, movie_genre=genre)
        new_movie.save()
        return HttpResponse("working")
    else:
        return HttpResponse("error")
    
@csrf_exempt
def delete_movie(request, movie_id):
    # retrieve the movie object if it exists or return 404 error
    movie_to_delete = get_object_or_404(moviesList, pk=movie_id) 

    # delete the retrieved movie object
    movie_to_delete.delete()
    
    #Send success response back to frontend
    return HttpResponse("Movie Deleted Successfully")

@csrf_exempt
def update_desc(request):
    if request.method == 'PUT':
        data = request.body.decode('utf-8')
        my_data = json.loads(data)
        desc = my_data['desc']
        pk = my_data['pk']
        movie = get_object_or_404(moviesList, pk=pk)
        movie.movie_description = desc
        movie.save()
        return HttpResponse("working")
    else:
        return HttpResponse("error")

@csrf_exempt
def backup_database(request):
    # Get the current datetime as string
    current_datetime = datetime.datetime.now().strftime('%Y-%m-%d_%H-%M-%S')
    
    # Define the path to the source database file
    database_path = os.path.join(settings.BASE_DIR, 'db.sqlite3')
    
    # Define the path to the backup file (use 'backup-' prefix plus timestamp)
    backup_filename = f"backup-{current_datetime}.sqlite3"
    backup_path = os.path.join(settings.BASE_DIR,"backups", backup_filename)
    
    # Copy the database file to the backup file
    shutil.copy2(database_path, backup_path)
    
    # Open the backup file and write its contents into an HTTP response
    with open(backup_path, 'rb') as backup_file:
        response = HttpResponse(backup_file.read(), content_type='application/x-sqlite3')
        response['Content-Disposition'] = f'attachment; filename={backup_filename}'
        return response

