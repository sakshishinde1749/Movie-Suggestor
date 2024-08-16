import "./App.css";
import React, {useState} from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css";
import MovieList from './components/MovieList';
import AddMovieForm from './components/AddMovieForm';
import Navbar from "./components/Navbar";
import axios from "axios";

const App = () =>{


  function fetchData() {
    axios.post('http://localhost:8000/handleMovies/backup_database/')
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }

  setInterval(fetchData, 86400000)




  const [searchValue, setSearchValue] = useState("");

  const handleCallback = (searchedValue) => {
    setSearchValue(searchedValue);
    console.log(searchValue, "app")
  }

    return (      
      <div className="bg-secondary main">
        <Navbar parentCallback={handleCallback}/>
        <div className="container text-center">
          <h1 className="display-4">The movie suggestor web app</h1>
          <p>In this app, User can check various movies of interest and he/she can also add there favourite movies to the list. Each card of the movies have "movie title", "movie plot" and "movie genre". One can add the movie by clicking the add movie button at the bottom or by clicking add movie at the navbar. The add movie form just have one required field movie_title, then the omdb api get the poster and other details related to movies using its title. one can update the description of any movie. he/she can delete a movie from the list except some fixed movie which cannot be modified or deleted</p>
        </div>
        <Router>
          <Routes>
            <Route exact path="/" element={<MovieList searchValue={searchValue}/>}></Route>
            <Route exact path="/add-movie" element={<AddMovieForm />}></Route>
          </Routes>
        </Router>
      </div>
    );
}

export default App;
