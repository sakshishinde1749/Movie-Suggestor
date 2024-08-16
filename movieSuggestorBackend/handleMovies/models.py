from django.db import models

class moviesList(models.Model):
    movie_title = models.CharField(max_length=200)
    movie_description = models.CharField(max_length=500)
    movie_genre = models.CharField(max_length=100, default="Action")
    poster_url = models.CharField(max_length=1000, default='https://skydomepictures.com/wp-content/uploads/2018/08/movie-poster-coming-soon-2.png')
    is_fixed = models.BooleanField(default=False)
    def __str__(self):
        return self.movie_title
