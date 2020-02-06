import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SearchForm from "../components/forms/searchForm.component";
import AuthPrompt from '../components/prompts/authorization.prompt.component'
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
      .then(res => setAllPhotos(res.data.reverse()))
      .catch(err => console.log(err));
  };

  return (
    <>
      <SideNav />
      <div id="main">
        {/* Confirm save prompt and passing in the set message functions. */}
        <AuthPrompt setPromptMessage={props.setPromptMessage} promptMessage={props.promptMessage}/>
        <SearchForm results={results} setResults={setResults} allPhotos={allPhotos}/>
        <div id="resultsContainer">
          {results &&
            allPhotos &&
            results.map(photo => (
              <div key={photo.name} className="card">
                <img src={`${photo.fileRef}`} alt="" />
                <Link key={photo.id} to={{ pathname: `/photo/${photo._id}` }}>
                  {photo.name}
                </Link>
                <img src="" alt="" />
                <p><span>Categories:</span> {photo.category.join(", ")}</p>
                <p>Description: { photo.description.substring(0, 25)}...
                </p>
              </div>
            ))}

          {!results &&
            allPhotos &&
            allPhotos.map(photo => (
              <div key={photo.name} className="card">
                <img src={`${photo.fileRef}`} alt="" />
                <Link key={photo.id} to={{ pathname: `/photo/${photo._id}` }}>
                  {photo.name}
                </Link>
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
