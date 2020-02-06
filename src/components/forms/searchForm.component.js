import React, { useState } from "react";
import CategoryFilters from "./categoryFilters.component";
import "../../styles/components/forms/categoryFilters.style.scss";

export default function SearchFilters(props) {
   // eslint-disable-next-line
  const [formcat, setformcat] = useState();

  const GetCategories = array => {
    setformcat(array);
  };

  // SEARCH LOGIC

  const FindPhotos = event => {
    event.preventDefault()
    // empty the results array.
    let resultsArray = []
    // if search terms have been added to the input..
    if (event.target.searchInput.value.length >= 1) {
      // set inputTerms as an array of each of the terms split and lowercase.
      let inputTerms = event.target.searchInput.value.toLowerCase().split(" ")
        // for each term, for each photo, if the description includes the term, push it to the results array.
        inputTerms.forEach(term => {
          props.allPhotos.forEach(photo => {
            if (photo.description.toLowerCase().includes(term)) {
              resultsArray.push(photo)
            }
          });
        })
    } else {
      console.log("There are no input terms.")
    }
    // if there are form category filters applied..
    if (formcat.length >= 1) {
      // for each category...
      formcat.forEach(category => {
        // if there are already results, check through each to see if the category is included in it's categories.
        // if it is, add it to the results array, if it isn't, remove it from the array.
        if (resultsArray.length >= 1) {
          resultsArray.forEach(result => {
            if (!result.category.includes(category)) {
              let index = resultsArray.indexOf(result)
              resultsArray.splice(index, 1)
            }
          })
        }
        else {
          // if there are no results, for each category, search through all photos instead.
          props.allPhotos.forEach(photo => {
            if (photo.category.includes(category)) {
              resultsArray.push(photo)
            }
          })
        }
      })
    } else {
      console.log("There are no categories being passed in.")
    }
        // set the results as the results array.
        props.setResults(resultsArray)
  }

  return (
    <form onSubmit={FindPhotos}>
      <div id="searchContainer">
        <input
          id="searchInput"
          type="text"
          placeholder="Search descriptions here..."
        />
      </div>
      <p id="filterTitle">Category Filters:</p>
      <CategoryFilters GetCategories={GetCategories} />
      <button type="submit">Search</button>
    </form>
  );
}
