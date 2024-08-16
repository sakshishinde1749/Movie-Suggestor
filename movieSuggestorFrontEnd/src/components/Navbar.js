import React, {useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Navbar(props) {

  const [searchValue, setSearchValue] = useState("");


  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
    console.log(searchValue, "navbar")
    // call the callback function with the search value entered
    props.parentCallback(event.target.value);
  };

  const handleSearchButton = (e) =>{
    e.preventDefault();
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary navbar-dark bg-dark">
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/add-movie">
                  Add Movie
                </a>
              </li>

            </ul>
            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search based on genre"
                aria-label="Search"
                value={searchValue}
                onChange={handleInputChange}
              />
              <button className="btn btn-outline-success" onClick={handleSearchButton}>
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
