# Generated by Django 4.1.7 on 2023-03-20 02:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("handleMovies", "0003_movieslist_is_fixed_alter_movieslist_poster_url"),
    ]

    operations = [
        migrations.AddField(
            model_name="movieslist",
            name="movie_genre",
            field=models.CharField(default="Action", max_length=100),
        ),
    ]
