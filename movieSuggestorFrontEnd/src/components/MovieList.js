import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Link } from "react-router-dom";

export default function MovieList(props) {
  const [moviesList, setmoviesList] = useState([]);
  const [description, setDescription] = useState("");

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/handleMovies/")
      .then((response) => {
        setmoviesList(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const deleteMovie = async (pk) => {
    try {
      await axios.delete(
        `http://localhost:8000/handleMovies/delete_movie/${pk}/`
      );
      setmoviesList(moviesList.filter((movie) => movie["pk"] !== pk));
      console.log("Movie deleted successfully!");
    } catch (error) {
      console.error(error);
    }
  };

  const filteredMovies = moviesList.filter((movie) => {
    return movie["fields"]["movie_genre"]
      .toLowerCase()
      .includes(props.searchValue.toLowerCase());
  });

  var test = "col-3";

  if (filteredMovies.length < 4) {
    test = "col";
  }

  const handleDescChange = (e) => {
    setDescription(e.target.value);
  };

  const handleAddDesc = async (pk) => {
    const data = {
      desc: description,
      pk: pk,
    };
    axios
      .put("http://127.0.0.1:8000/handleMovies/update_desc/", data)
      .then((response) => {
        console.log(response.data);
        let updatedMovie = moviesList.find((movie) => movie.pk === pk);
        updatedMovie["fields"]["movie_description"] = description;
        // update movies list state
        let newMovieList = [...moviesList];
        setmoviesList(newMovieList);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDeleteDesc = (pk) => {
    setDescription("");
    handleAddDesc(pk);
  };

  return (
    <>
      <div className="container d-flex flex-column justify-content-center align-items-center m-5">
        <div className="row">
          {filteredMovies.length === 0 ? (
            <h1>No Movies Found</h1>
          ) : (
            filteredMovies.map((movie) => (
              <>
                <div className={test + " mb-5"} key={movie["pk"]}>
                  <div
                    className="card"
                    style={{ width: "18rem", height: "33rem" }}
                  >
                    <img
                      src={movie["fields"]["poster_url"]}
                      className="card-img-top"
                      alt="..."
                      style={{ height: "60%" }}
                    />
                    <div className="card-body">
                      <h5 className="card-title text-primary">
                        {movie["fields"]["movie_title"]}
                      </h5>
                      <p
                        className="m-0 mb-1 text-secondary"
                        style={{ fontSize: "12px" }}
                      >
                        Genre: {movie["fields"]["movie_genre"]}
                      </p>
                      {movie["fields"]["movie_description"] === "" ? (
                        <>
                          <div style={{ height: "100%" }}>
                            <label
                              htmlFor="description"
                              style={{ fontSize: "10px" }}
                            >
                              Write the description
                            </label>
                            <textarea
                              style={{ height: "25%" }}
                              value={description}
                              className="form-control"
                              id="description"
                              rows={3}
                              onChange={handleDescChange}
                            />
                            <button
                              onClick={() => handleAddDesc(movie["pk"])}
                              className="btn btn-primary mb-3 ml-3 position-absolute bottom-0"
                              style={{

                              }}
                            >
                              Add
                            </button>
                          </div>
                        </>
                      ) : (
                        <p
                          className="card-text"
                          style={{ height: "37%", overflowY: "scroll" }}
                        >
                          {movie["fields"]["movie_description"]}
                        </p>
                      )}
                      {movie["fields"]["is_fixed"] ? (
                        <>
                          <p
                            className="position-absolute bottom-0 end-0 mb-3 me-3"
                            style={{ color: "red", fontSize: "10px" }}
                          >
                            This movie is not updatable or deletable
                          </p>
                        </>
                      ) : (
                        <>
                          <button
                            type="Delete"
                            className="btn btn-danger position-absolute bottom-0 end-0 mb-3 me-3"
                            onClick={() => deleteMovie(movie["pk"])}
                          >
                            Delete
                          </button>
                          {movie["fields"]["movie_description"] === "" ? (
                            <></>
                          ) : (
                            <button
                              type="Update"
                              className="btn btn-primary position-absolute bottom-0 mb-3 p-0"
                              style={{
                                width: "45%",
                                height: "7%",
                                fontSize: "80%",
                              }}
                              onClick={() => handleDeleteDesc(movie["pk"])}
                            >
                              Update Description
                            </button>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </>
            ))
          )}
        </div>
        {filteredMovies.length === 0 ? (
          <></>
        ) : (
          <div className="row">
            <Link to="/add-movie">
              <button
                className="btn btn-dark p-3 mb-5"
                style={{ fontSize: "30px" }}
              >
                Add a movie
              </button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
