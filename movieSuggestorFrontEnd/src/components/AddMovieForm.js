import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../App.css"

export default function AddMovieForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Call this when form is submitted
  const handleSubmit = (e) => {
    e.preventDefault();
    if(!title){
      alert("plz enter the title")
      return
    }
    const data = {
      movieTitle: title,
      movieDesc: description,
    };
    console.log(data);
    axios
      .post("http://127.0.0.1:8000/handleMovies/add_movie/", data)
      .then((response) => {
        console.log(response.data);
        window.location.href = "/";
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };


  const handleDescChange = (e) => {
    setDescription(e.target.value);
  };

  return (
    <>
      <h1 className="display-4 text-dark text-center mt-5">Add the movie you want to suggest to people</h1>

      <div className="container">
        <form className="mt-5">
          <div className="form-group">
            <label htmlFor="title">Name of the movie<span style={{ color: "red" }}> * </span></label>
            <input
              value={title}
              type="text"
              className="form-control"
              id="title"
              required
              onChange={handleTitleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description(Optional)</label>
            <textarea
              value={description}
              className="form-control"
              id="description"
              rows={3}
              onChange={handleDescChange}
            />
          </div>
          <button
            type="submit"
            className="btn btn-dark mt-3"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </form>
        <div className="d-flex justify-content-end">
          <Link to="/" style={{textDecoration: "none"}}>
            <a href="/" className="float-right text-dark"> &lt;- Go back to the Movies List</a>
          </Link>
        </div>

      </div>
    </>
  );
}
