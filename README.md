# Movie Suggestor Web App
This web app contains the list of the movies suggested by the people to watch. you can also add some of you favourite movies so people can enjoy watching those.

### Clone this repo to your local machine and in the movieSuggestorFrontEnd folder, run the command:
`npm install`

which will install the required dependecies.

### In the settings.py file in backend folder write the port on which your frontend is running on your local machine 
`CORS_ORIGIN_WHITELIST = [
    'http://localhost:3000', # Add the origin here
]`

#### Now write `npm start` in the frontend folder, which will start the front-end 
#### and write `python manage.py runserver` in the backend folder , which will run the backend server.



## About the app:
In this app, User can check various movies of interest and he/she can also add there favourite movies to the list. Each card of the movies have "movie title", "movie plot" and "movie genre". One can add the movie by clicking the add movie button at the bottom or by clicking add movie at the navbar. The add movie form just have one required field movie_title, then the omdb api get the poster and other details related to movies using its title. one can update the description of any movie. he/she can delete a movie from the list except some fixed movie which cannot be modified or deleted

