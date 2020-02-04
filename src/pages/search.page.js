import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SearchForm from "../components/forms/searchForm.component";

import SideNav from "../components/navigation/navbar.component";
import "../styles/pages/search.page.scss";

import API from "../axios.config";

export default function Search(props) {
  const [results, setResults] = useState();
  const [allPhotos, setAllPhotos] = useState();

  useEffect(() => {
    PhotoIndex();
  }, []);

  const PhotoIndex = () => {
    API.get("/photos/", {})
      .then(res => setAllPhotos(res.data))
      .catch(err => console.log(err));
  };

  return (
    <>
      <SideNav />
      <div id="main">
        <SearchForm results={results} setResults={setResults} allPhotos={allPhotos}/>
        <div id="resultsContainer">
          {results &&
            allPhotos &&
            results.map(photo => (
              <div key={photo.name} className="card">
                <Link key={photo.id} to={{ pathname: `/photo/${photo._id}` }}>
                  {photo.name}
                </Link>
                <img src="" alt="" />
                <p id="categories">Categories: {photo.category.join(", ")}</p>
                <p id="description">
                  Description:{photo.description.substring(0, 25)}...
                </p>
              </div>
            ))}

          {!results &&
            allPhotos &&
            allPhotos.map(photo => (
              <div key={photo.name} className="card">
                <Link key={photo.id} to={{ pathname: `/photo/${photo._id}` }}>
                  {photo.name}
                </Link>
                <img src="" alt="" />
                <p id="categories">Categories: {photo.category.join(", ")}</p>
                <p id="description">
                  Description:{photo.description.substring(0, 25)}...
                </p>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
