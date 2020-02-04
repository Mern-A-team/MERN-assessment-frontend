import React, { useState } from "react";
import CategoryFilters from "./categoryFilters.component";
import "../../styles/components/forms/categoryFilters.style.scss";

export default function SearchFilters(props) {
   // eslint-disable-next-line
  const [formcat, setformcat] = useState();

  const GetCategories = array => {
    setformcat(array);
  };

  const FindPhotos = event => {
    event.preventDefault()
    let resultsArray = []
    if (event.target.searchInput.value.length >= 1) {
      let inputTerms = event.target.searchInput.value.toLowerCase().split(" ")
      console.log(inputTerms)
      console.log(`These are the form categories: ${formcat}`)
        inputTerms.forEach(term => {
          console.log(`Now searching for ${term}`)
          props.allPhotos.forEach(photo => {
            console.log(`Now searching in ${photo.name}`)
            if (photo.description.toLowerCase().includes(term)) {
              resultsArray.push(photo)
              console.log(`${term} is included in ${photo.description}`)
            }
          });
        })
    } else {
      console.log("There are no input terms.")
    }
    if (formcat.length >= 1) {
      formcat.forEach(category => {
        console.log(`Iterating through category: ${category}`)
        if (resultsArray.length >= 1) {
          resultsArray.forEach(result => {
            console.log(`Searching in: ${result.name}`)
            if (!result.category.includes(category)) {
              console.log(`${result} categories does not contain ${category}`)
              let index = resultsArray.indexOf(result)
              console.log(`This is the index of ${result.name} in resultsArray`)
              resultsArray.splice(index, 1)
              console.log("Removed.")
            }
          })
        }
        else {
          console.log("Searching through all photos instead.")
          props.allPhotos.forEach(photo => {
            if (photo.category.includes(category)) {
              console.log(`${photo} includes ${category}`)
              resultsArray.push(photo)
            }
          })
        }
      })
      console.log("There are categories being passed through.")
    } else {
      console.log("There are no categories being passed in.")
    }
    console.log(`Final Description Match Array: ${resultsArray}`)
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
        <button type="submit">Search</button>
      </div>
      <p id="filterTitle">Category Filters:</p>
      <CategoryFilters GetCategories={GetCategories} />
    </form>
  );
}
